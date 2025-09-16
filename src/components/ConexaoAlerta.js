'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

// Componente para alertar o usuário sobre problemas de conexão com o back-end
export default function ConexaoAlerta() {
  const [status, setStatus] = useState('verificando'); // 'verificando', 'conectado', 'erro'
  const [mensagem, setMensagem] = useState('Verificando conexão com o servidor...');
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const verificarConexao = async () => {
      try {
        // URL do back-end
        const urlBackend = 'http://localhost:4001';
        
        console.log(`Testando conexão com: ${urlBackend}`);
        
        // Vamos testar diferentes portas e endpoints
        const portsToTry = [4001, 3001, 5000, 8080, 3000];
        let connected = false;
        
        // Verificar se há um token JWT disponível
        const token = localStorage.getItem('jwtToken');
        const headers = {};
        
        if (token) {
          headers.Authorization = `Bearer ${token}`;
          console.log('Token JWT encontrado, adicionando ao cabeçalho de autorização');
        } else {
          console.log('Nenhum token JWT encontrado, tentando conectar sem autenticação');
        }
        
        for (const port of portsToTry) {
          const testUrl = `http://localhost:${port}`;
          console.log(`Tentando conectar em: ${testUrl}/movies`);
          
          try {
            const response = await axios.get(`${testUrl}/movies`, { 
              timeout: 5000,
              headers
            });
            
            if (response.status >= 200 && response.status < 300) {
              console.log(`Conexão bem-sucedida com o back-end na porta ${port}!`);
              console.log('Dados recebidos:', response.data);
              setStatus('conectado');
              setMensagem(`Conectado ao servidor em ${testUrl}`);
              
              // Atualizar a URL da API em localStorage para usar em toda a aplicação
              localStorage.setItem('apiBaseUrl', testUrl);
              console.log(`URL da API atualizada para: ${testUrl}`);
              
              // Se conectado, esconde a mensagem após 5 segundos
              setTimeout(() => setVisible(false), 5000);
              connected = true;
              break;
            }
          } catch (error) {
            console.warn(`Falha ao conectar com ${testUrl}/movies:`, error.message);
            // Exibir detalhes específicos do erro para ajudar no diagnóstico
            if (error.code === 'ECONNREFUSED') {
              console.log(`Porta ${port} recusou conexão - nenhum serviço rodando nesta porta`);
            } else if (error.code === 'ETIMEDOUT') {
              console.log(`Tempo esgotado ao tentar conectar na porta ${port}`);
            } else {
              console.log(`Erro ao conectar na porta ${port}:`, error.code || error.message);
            }
          }
        }
        
        if (!connected) {
          console.error('Não foi possível conectar a nenhuma das portas testadas.');
          setStatus('erro');
          setMensagem(`Não foi possível conectar ao servidor de filmes. 
        
⚠️ Verifique se:
1. O servidor da API está rodando
2. A URL/porta estão corretas
3. O endpoint /movies está disponível
4. Se for necessário autenticação JWT, clique em "Login JWT" no menu superior

Use o botão de configuração ⚙️ para testar diferentes URLs.`);
        }
      } catch (error) {
        console.error('Erro ao verificar conexão:', error);
        setStatus('erro');
        setMensagem(`Erro ao verificar a conexão com o servidor. 
        
⚠️ Verifique se:
1. O servidor da API está rodando
2. A URL/porta estão corretas
3. O endpoint /movies está disponível
4. Se for necessário autenticação JWT, clique em "Login JWT" no menu superior

Use o botão de configuração ⚙️ para testar diferentes URLs.`);
      }
    };
    
    verificarConexao();
    
    // Verificar a conexão a cada 30 segundos
    const intervalo = setInterval(verificarConexao, 30000);
    
    return () => clearInterval(intervalo);
  }, []);
  
  // Se não estiver visível, não renderiza nada
  if (!visible) {
    return null;
  }
  
  // Estilos baseados no status
  const getEstilos = () => {
    const estilosBase = {
      container: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        maxWidth: '400px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'fadeIn 0.5s ease-in-out'
      },
      icone: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      },
      mensagem: {
        fontSize: '14px'
      },
      botaoFechar: {
        background: 'transparent',
        border: 'none',
        color: 'inherit',
        fontSize: '18px',
        cursor: 'pointer',
        marginLeft: 'auto',
        padding: '0 0 0 10px',
        opacity: '0.7'
      }
    };
    
    // Cores específicas por status
    if (status === 'verificando') {
      return {
        ...estilosBase,
        container: {
          ...estilosBase.container,
          background: '#3b82f6',
          color: 'white'
        },
        icone: {
          ...estilosBase.icone,
          background: 'rgba(255, 255, 255, 0.3)'
        }
      };
    } else if (status === 'conectado') {
      return {
        ...estilosBase,
        container: {
          ...estilosBase.container,
          background: '#10b981',
          color: 'white'
        },
        icone: {
          ...estilosBase.icone,
          background: 'rgba(255, 255, 255, 0.3)'
        }
      };
    } else {
      return {
        ...estilosBase,
        container: {
          ...estilosBase.container,
          background: '#f43f5e',
          color: 'white',
          width: '400px',
          maxWidth: 'calc(100vw - 40px)',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '16px 20px'
        },
        icone: {
          ...estilosBase.icone,
          background: 'rgba(255, 255, 255, 0.3)'
        },
        mensagem: {
          ...estilosBase.mensagem,
          marginTop: '10px',
          whiteSpace: 'pre-line',
          lineHeight: '1.5'
        }
      };
    }
  };
  
  const estilos = getEstilos();
  
  // Ícone baseado no status
  const getIcone = () => {
    if (status === 'verificando') {
      return (
        <div style={estilos.icone}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="40" strokeDashoffset="20">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 12 12"
                to="360 12 12"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      );
    } else if (status === 'conectado') {
      return (
        <div style={estilos.icone}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    } else {
      return (
        <div style={estilos.icone}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    }
  };
  
  return (
    <div style={estilos.container}>
      {getIcone()}
      <div style={estilos.mensagem}>{mensagem}</div>
      <button style={estilos.botaoFechar} onClick={() => setVisible(false)}>×</button>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}