'use client';
import { useState, useEffect } from 'react';
import api from '../services/api';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se já está autenticado ao carregar o componente
    const checkAuth = () => {
      const isAuth = api.isAuthenticated();
      setIsAuthenticated(isAuth);
      if (isAuth) {
        setMessage('Você já está autenticado.');
      }
    };
    
    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await api.login(email, password);
      console.log('Login bem-sucedido:', response);
      setMessage('Login realizado com sucesso!');
      setIsAuthenticated(true);
      
      // Recarregar a página após 1.5 segundos para aplicar a autenticação em toda a aplicação
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMessage(
        error.response?.data?.message || 
        'Erro ao fazer login. Verifique suas credenciais.'
      );
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    setMessage('Logout realizado com sucesso.');
    
    // Recarregar a página após 1.5 segundos
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '130px',
      left: '20px',
      backgroundColor: '#1e293b',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      width: '300px'
    }}>
      <h3 style={{ color: '#f8fafc', marginTop: '0', marginBottom: '15px' }}>
        {isAuthenticated ? 'Status da Autenticação' : 'Login JWT'}
      </h3>
      
      {isAuthenticated ? (
        <div>
          <p style={{ color: '#cbd5e1', marginBottom: '15px' }}>
            Você está autenticado com JWT. Token salvo no localStorage.
          </p>
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#cbd5e1' }}>
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #475569',
                backgroundColor: '#0f172a',
                color: '#f8fafc'
              }}
              required
              placeholder="exemplo@email.com"
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#cbd5e1' }}>
              Senha:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #475569',
                backgroundColor: '#0f172a',
                color: '#f8fafc'
              }}
              required
              placeholder="Sua senha"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              fontWeight: 'bold'
            }}
          >
            {isLoading ? 'Processando...' : 'Login'}
          </button>
        </form>
      )}
      
      {message && (
        <div style={{
          marginTop: '10px',
          padding: '8px',
          borderRadius: '4px',
          backgroundColor: isAuthenticated 
            ? 'rgba(16, 185, 129, 0.2)' 
            : 'rgba(239, 68, 68, 0.2)',
          color: isAuthenticated ? '#10b981' : '#ef4444',
          fontSize: '0.9rem'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}