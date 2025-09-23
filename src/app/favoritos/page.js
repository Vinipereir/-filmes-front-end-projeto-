'use client';
import { useState, useEffect } from 'react';
import styles from './favoritos.module.css';
import MovieImage from '../../components/MovieImage';
import Footer from '../../components/Footer';

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Carregar favoritos do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favoritosSalvos = JSON.parse(localStorage.getItem('favoritos') || '[]');
      setFavoritos(favoritosSalvos);
      setCarregando(false);
    }
  }, []);

  // Função para remover filme dos favoritos
  const removerFavorito = (id) => {
    if (typeof window !== 'undefined') {
      const novosFavoritos = favoritos.filter(filme => filme.id !== id);
      setFavoritos(novosFavoritos);
      localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
    }
  };

  return (
    <div style={{ 
      fontFamily: 'Poppins, sans-serif', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', 
      color: '#fff', 
      padding: '32px 42px'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#4cc9f0' }}>Meus Favoritos</h1>
      <p style={{ marginBottom: '2rem', color: '#aaa' }}>Filmes e séries que você marcou como favoritos</p>
      
      {/* Controles */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '2rem', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>Ordenar por:</span>
          <select style={{ 
            background: 'rgba(30, 30, 50, 0.5)', 
            border: '1px solid rgba(76, 201, 240, 0.3)', 
            padding: '0.5rem 1rem', 
            borderRadius: '8px', 
            color: '#fff'
          }}>
            <option>Data adicionada (mais recente)</option>
            <option>Data adicionada (mais antiga)</option>
            <option>Avaliação (maior)</option>
            <option>Avaliação (menor)</option>
            <option>Título (A-Z)</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ 
            background: 'transparent',
            border: '1px solid rgba(76, 201, 240, 0.5)',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            color: '#4cc9f0',
            cursor: 'pointer'
          }}>Criar lista</button>
          <button style={{ 
            background: 'rgba(76, 201, 240, 0.2)',
            border: '1px solid rgba(76, 201, 240, 0.5)',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            color: '#4cc9f0',
            cursor: 'pointer'
          }}>Exportar favoritos</button>
        </div>
      </div>
      
      {/* Lista de favoritos */}
      {carregando ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#aaa' }}>
          Carregando favoritos...
        </div>
      ) : favoritos.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {favoritos.map((favorito, idx) => (
            <div key={favorito.id || idx} style={{ 
              display: 'flex', 
              background: 'rgba(30, 30, 50, 0.5)', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.2s ease'
            }}>
              <MovieImage
                src={favorito.imagem}
                alt={favorito.titulo}
                width="100px"
                height="150px"
                style={{ borderRadius: '12px 0 0 12px' }}
                fallbackTitle={favorito.titulo}
                loading="lazy"
              />
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                flex: 1, 
                padding: '1rem', 
                alignItems: 'center' 
              }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{favorito.titulo}</h3>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#aaa', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                    {favorito.generos && favorito.generos.length > 0 && (
                      <>
                        <span>{favorito.generos[0]}</span>
                        <span>•</span>
                      </>
                    )}
                    {favorito.avaliacao && (
                      <>
                        <span style={{ color: '#f0d744' }}>★ {favorito.avaliacao}</span>
                        <span>•</span>
                      </>
                    )}
                    {favorito.lancamento && (
                      <>
                        <span>Ano: {favorito.lancamento}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>Nos favoritos</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <button 
                    onClick={() => window.location.href = `/detalhes?id=${favorito.id}`}
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      color: '#4cc9f0', 
                      cursor: 'pointer', 
                      fontSize: '1rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '5px',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(76, 201, 240, 0.1)'}
                    onMouseOut={(e) => e.target.style.background = 'transparent'}
                  >
                    Ver detalhes
                  </button>
                  <button 
                    onClick={() => removerFavorito(favorito.id)}
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      color: '#ff6b6b', 
                      cursor: 'pointer', 
                      fontSize: '1rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '5px',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(255, 107, 107, 0.1)'}
                    onMouseOut={(e) => e.target.style.background = 'transparent'}
                  >
                    ❤️ Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          padding: '3rem', 
          textAlign: 'center', 
          background: 'rgba(30, 30, 50, 0.5)', 
          borderRadius: '12px'
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Você ainda não tem favoritos</h3>
          <p style={{ marginBottom: '1.5rem', color: '#aaa' }}>Navegue pelo catálogo e adicione filmes e séries aos favoritos</p>
          <button 
            onClick={() => window.location.href = '/catalogo'}
            style={{ 
              background: '#4cc9f0',
              border: 'none',
              padding: '0.8rem 2rem',
              borderRadius: '30px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Explorar Catálogo
          </button>
        </div>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
