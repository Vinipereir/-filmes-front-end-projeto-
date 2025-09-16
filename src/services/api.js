import axios from 'axios';

// Verificar se há uma URL base salva no localStorage (a partir da detecção do ConexaoAlerta)
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const savedUrl = localStorage.getItem('apiBaseUrl');
    if (savedUrl) {
      console.log('Usando URL salva do localStorage:', savedUrl);
      return savedUrl;
    }
  }
  
  // URLs a serem tentadas, em ordem de preferência
  const possibleUrls = [
    'http://localhost:4001',
    'http://localhost:3001',
    'http://localhost:5000',
    'http://localhost:8080',
    'http://localhost:3000'
  ];
  
  // Usar a primeira URL da lista como padrão
  console.log('Usando URL padrão:', possibleUrls[0]);
  return possibleUrls[0];
};

// Função para obter token JWT do localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwtToken');
  }
  return null;
};

console.log('Configurando API para conectar ao back-end...');

// Criando instância do axios com configurações
const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para logs de requisição e autenticação JWT
api.interceptors.request.use(
  config => {
    // Verificar se há uma URL atualizada no localStorage a cada requisição
    if (typeof window !== 'undefined') {
      const savedUrl = localStorage.getItem('apiBaseUrl');
      if (savedUrl && config.baseURL !== savedUrl) {
        console.log(`Atualizando URL base da API para: ${savedUrl}`);
        config.baseURL = savedUrl;
      }
    }
    
    // Ajustando o endpoint - se a requisição estiver indo para /filmes, mudar para /movies
    if (config.url && config.url.startsWith('/filmes')) {
      const newUrl = config.url.replace('/filmes', '/movies');
      console.log(`Ajustando endpoint de ${config.url} para ${newUrl}`);
      config.url = newUrl;
    }
    
    // Adicionar token JWT ao cabeçalho de autorização, se disponível
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token JWT adicionado ao cabeçalho da requisição');
    } else {
      console.log('Nenhum token JWT encontrado, requisição sem autenticação');
    }
    
    console.log(`Fazendo requisição para: ${config.baseURL}${config.url}`);
    return config;
  },
  error => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para logs de resposta
api.interceptors.response.use(
  response => {
    console.log('Resposta recebida com sucesso:', response.status);
    
    // Verificar se há um token JWT na resposta e salvar
    const token = response.data?.token || response.headers?.authorization;
    if (token && typeof window !== 'undefined') {
      // Extrair o token se estiver no formato 'Bearer token'
      const jwtToken = token.startsWith('Bearer ') ? token.substring(7) : token;
      localStorage.setItem('jwtToken', jwtToken);
      console.log('Token JWT recebido e salvo');
    }
    
    return response;
  },
  error => {
    if (error.response) {
      // O servidor respondeu com um status fora do intervalo 2xx
      console.error('Erro de resposta:', error.response.status, error.response.data);
      
      // Se for erro de autenticação (401), limpar o token
      if (error.response.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('jwtToken');
        console.log('Token JWT removido devido a erro de autenticação');
      }
    } else if (error.request) {
      // A requisição foi feita mas não recebeu resposta
      console.error('Erro de requisição (sem resposta):', error.request);
      
      // Fornecer detalhes mais específicos sobre o problema de conexão
      const mensagem = error.message || '';
      if (mensagem.includes('Network Error')) {
        console.error('ERRO DE REDE: Não foi possível conectar ao servidor. Verifique se o back-end está em execução e acessível.');
      } else if (mensagem.includes('timeout')) {
        console.error('TIMEOUT: O servidor demorou muito para responder. Verifique a conexão ou se o servidor está sobrecarregado.');
      } else if (mensagem.includes('ECONNREFUSED')) {
        console.error('CONEXÃO RECUSADA: O servidor não está aceitando conexões. Verifique se o back-end está em execução na porta correta.');
      }
    } else {
      // Algo aconteceu ao configurar a requisição que gerou um erro
      console.error('Erro na configuração da requisição:', error.message);
    }
    return Promise.reject(error);
  }
);

// Função para autenticação com email e senha
api.login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    
    // Se a resposta contiver um token, salve-o
    if (response.data && response.data.token) {
      localStorage.setItem('jwtToken', response.data.token);
      console.log('Login bem-sucedido, token salvo');
    }
    
    return response.data;
  } catch (error) {
    console.error('Erro durante o login:', error);
    throw error;
  }
};

// Função para deslogar (remover o token)
api.logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwtToken');
    console.log('Logout realizado, token removido');
  }
};

// Função para verificar se o usuário está autenticado
api.isAuthenticated = () => {
  return !!getAuthToken();
};

export default api;