'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';

export default function Home() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: '',
    senha: ''
  });
  const [loginErro, setLoginErro] = useState('');
  const [registroData, setRegistroData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [registroErro, setRegistroErro] = useState('');
  const [activeTab, setActiveTab] = useState('login'); // 'login' ou 'registro'

  // Atualiza os dados de login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Atualiza os dados de registro
  const handleRegistroChange = (e) => {
    const { name, value } = e.target;
    setRegistroData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função para fazer login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginErro('');
    
    try {
      // Verificar se todos os campos estão preenchidos
      if (!loginData.email || !loginData.senha) {
        setLoginErro('Por favor, preencha todos os campos');
        return;
      }
      
      // Aqui você faria a requisição para o back-end
      // const response = await api.post('/login', loginData);
      
      // Simular login bem-sucedido
      localStorage.setItem('usuarioLogado', JSON.stringify({
        email: loginData.email,
        isAdmin: false,
        isAnonimo: false
      }));
      
      // Redirecionar para o catálogo
      console.log('Redirecionando para catálogo após login...');
      window.location.href = '/catalogo';
      // Alternativa caso a linha acima não funcione
      // router.push('/catalogo');
      
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setLoginErro('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  // Função para registro
  const handleRegistro = async (e) => {
    e.preventDefault();
    setRegistroErro('');
    
    try {
      // Verificar se todos os campos estão preenchidos
      if (!registroData.nome || !registroData.email || !registroData.senha || !registroData.confirmarSenha) {
        setRegistroErro('Por favor, preencha todos os campos');
        return;
      }
      
      // Verificar se as senhas coincidem
      if (registroData.senha !== registroData.confirmarSenha) {
        setRegistroErro('As senhas não coincidem');
        return;
      }
      
      // Aqui você faria a requisição para o back-end
      // const response = await api.post('/registro', registroData);
      
      // Simular registro bem-sucedido
      localStorage.setItem('usuarioLogado', JSON.stringify({
        nome: registroData.nome,
        email: registroData.email,
        isAdmin: false,
        isAnonimo: false
      }));
      
      // Redirecionar para o catálogo
      console.log('Redirecionando para catálogo após registro...');
      window.location.href = '/catalogo';
      // Alternativa caso a linha acima não funcione
      // router.push('/catalogo');
      
    } catch (error) {
      console.error('Erro ao fazer registro:', error);
      setRegistroErro('Erro ao fazer registro. Tente novamente.');
    }
  };

  // Função para entrar como anônimo
  const entrarAnonimo = () => {
    try {
      // Armazenar informação de usuário anônimo no localStorage
      localStorage.setItem('usuarioLogado', JSON.stringify({
        nome: 'Visitante',
        isAdmin: false,
        isAnonimo: true
      }));
      
      console.log('Redirecionando para catálogo como anônimo...');
      
      // Redirecionar para o catálogo
      window.location.href = '/catalogo';
      
      // Alternativa caso a linha acima não funcione
      // router.push('/catalogo');
    } catch (error) {
      console.error('Erro ao entrar como anônimo:', error);
      alert('Erro ao entrar como anônimo. Tente novamente.');
    }
  };

  return (
    <div style={{ 
      fontFamily: 'Poppins, sans-serif', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', 
      color: '#fff', 
      padding: '32px 42px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        alignItems: 'center'
      }}>
        {/* Coluna da esquerda - Apresentação */}
        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#4cc9f0' }}>FilmCommunity</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.6' }}>
            Sua plataforma para descobrir, avaliar e compartilhar opiniões sobre filmes e séries com toda a comunidade.
          </p>
          
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4cc9f0' }}>Recursos:</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
                <div style={{ background: 'rgba(76, 201, 240, 0.3)', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1rem' }}>✓</div>
                <span>Acesso a um vasto catálogo de filmes e séries</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
                <div style={{ background: 'rgba(76, 201, 240, 0.3)', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1rem' }}>✓</div>
                <span>Avalie e comente sobre seus títulos favoritos</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
                <div style={{ background: 'rgba(76, 201, 240, 0.3)', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1rem' }}>✓</div>
                <span>Descubra recomendações personalizadas</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ background: 'rgba(76, 201, 240, 0.3)', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1rem' }}>✓</div>
                <span>Conecte-se com outros amantes de cinema</span>
              </li>
            </ul>
          </div>
          
          <button 
            onClick={entrarAnonimo}
            style={{ 
              background: 'transparent',
              border: '2px solid #4cc9f0',
              padding: '1rem 2rem',
              borderRadius: '30px',
              color: '#4cc9f0',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1.1rem',
              width: '100%',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(76, 201, 240, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(76, 201, 240, 0.1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(76, 201, 240, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(76, 201, 240, 0.3)';
            }}
          >
            Continuar como Visitante
          </button>
          <p style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '0.5rem', textAlign: 'center' }}>
            Modo visitante tem funcionalidades limitadas (apenas visualização)
          </p>
        </div>
        
        {/* Coluna da direita - Login/Registro */}
        <div style={{ 
          background: 'rgba(30, 30, 50, 0.5)', 
          borderRadius: '16px', 
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          {/* Abas de Login/Registro */}
          <div style={{ 
            display: 'flex', 
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '1.5rem'
          }}>
            <button 
              onClick={() => setActiveTab('login')}
              style={{ 
                flex: 1,
                background: 'transparent',
                border: 'none',
                padding: '0.8rem',
                color: activeTab === 'login' ? '#4cc9f0' : '#aaa',
                borderBottom: activeTab === 'login' ? '2px solid #4cc9f0' : 'none',
                fontWeight: activeTab === 'login' ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              Login
            </button>
            <button 
              onClick={() => setActiveTab('registro')}
              style={{ 
                flex: 1,
                background: 'transparent',
                border: 'none',
                padding: '0.8rem',
                color: activeTab === 'registro' ? '#4cc9f0' : '#aaa',
                borderBottom: activeTab === 'registro' ? '2px solid #4cc9f0' : 'none',
                fontWeight: activeTab === 'registro' ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              Criar Conta
            </button>
          </div>
          
          {/* Formulário de Login */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ddd' }}>
                  Email
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  style={{ 
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  placeholder="Seu email"
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ddd' }}>
                  Senha
                </label>
                <input 
                  type="password" 
                  name="senha"
                  value={loginData.senha}
                  onChange={handleLoginChange}
                  style={{ 
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  placeholder="Sua senha"
                />
              </div>
              
              {loginErro && (
                <div style={{ 
                  padding: '0.8rem', 
                  background: 'rgba(255, 87, 87, 0.2)', 
                  color: '#ff5757', 
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem'
                }}>
                  {loginErro}
                </div>
              )}
              
              <button 
                type="submit"
                style={{ 
                  width: '100%',
                  background: '#4cc9f0',
                  border: 'none',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginBottom: '1rem'
                }}
              >
                Entrar
              </button>
              
              <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#aaa' }}>
                <p>Não tem uma conta? <span 
                  onClick={() => setActiveTab('registro')} 
                  style={{ color: '#4cc9f0', cursor: 'pointer' }}
                >
                  Registre-se
                </span></p>
              </div>
            </form>
          )}
          
          {/* Formulário de Registro */}
          {activeTab === 'registro' && (
            <form onSubmit={handleRegistro}>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ddd' }}>
                  Nome
                </label>
                <input 
                  type="text" 
                  name="nome"
                  value={registroData.nome}
                  onChange={handleRegistroChange}
                  style={{ 
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  placeholder="Seu nome"
                />
              </div>
              
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ddd' }}>
                  Email
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={registroData.email}
                  onChange={handleRegistroChange}
                  style={{ 
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  placeholder="Seu email"
                />
              </div>
              
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ddd' }}>
                  Senha
                </label>
                <input 
                  type="password" 
                  name="senha"
                  value={registroData.senha}
                  onChange={handleRegistroChange}
                  style={{ 
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  placeholder="Crie uma senha"
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ddd' }}>
                  Confirmar Senha
                </label>
                <input 
                  type="password" 
                  name="confirmarSenha"
                  value={registroData.confirmarSenha}
                  onChange={handleRegistroChange}
                  style={{ 
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  placeholder="Confirme sua senha"
                />
              </div>
              
              {registroErro && (
                <div style={{ 
                  padding: '0.8rem', 
                  background: 'rgba(255, 87, 87, 0.2)', 
                  color: '#ff5757', 
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem'
                }}>
                  {registroErro}
                </div>
              )}
              
              <button 
                type="submit"
                style={{ 
                  width: '100%',
                  background: '#4cc9f0',
                  border: 'none',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginBottom: '1rem'
                }}
              >
                Criar Conta
              </button>
              
              <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#aaa' }}>
                <p>Já tem uma conta? <span 
                  onClick={() => setActiveTab('login')} 
                  style={{ color: '#4cc9f0', cursor: 'pointer' }}
                >
                  Faça login
                </span></p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
