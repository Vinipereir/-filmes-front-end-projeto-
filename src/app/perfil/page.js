'use client';
import { useState, useEffect } from 'react';
import styles from './perfil.module.css';
import Footer from '../../components/Footer';

export default function Perfil() {
  // Estado para controlar o modal de edição
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [avaliacoesRecentes, setAvaliacoesRecentes] = useState([]);
  
  // Estado para os dados do usuário (para permitir edição)
  const [usuario, setUsuario] = useState({
    nome: "Maria Silva",
    username: "MariaFilmes",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    membro: "Desde Janeiro 2023",
    bio: "Apaixonada por cinema, principalmente filmes de ficção científica e drama. Meus diretores favoritos são Christopher Nolan, Denis Villeneuve e Quentin Tarantino.",
    stats: {
      assistidos: 142,
      favoritos: 23,
      avaliados: 86,
      listas: 5
    }
  });

  // Estados temporários para edição
  const [nomeTemp, setNomeTemp] = useState(usuario.nome);
  const [usernameTemp, setUsernameTemp] = useState(usuario.username);
  const [bioTemp, setBioTemp] = useState(usuario.bio);

  // Carregar avaliações do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]');
      const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
      
      // Ordenar avaliações por data (mais recentes primeiro)
      const avaliacoesOrdenadas = avaliacoes.sort((a, b) => new Date(b.data) - new Date(a.data));
      setAvaliacoesRecentes(avaliacoesOrdenadas.slice(0, 5)); // Mostrar apenas as 5 mais recentes
      
      // Atualizar estatísticas
      setUsuario(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          avaliados: avaliacoes.length,
          favoritos: favoritos.length
        }
      }));
    }
  }, []);

  // Função para abrir o modal
  const abrirModalEditar = () => {
    setNomeTemp(usuario.nome);
    setUsernameTemp(usuario.username);
    setBioTemp(usuario.bio);
    setMostrarModalEditar(true);
  };

  // Função para salvar as alterações
  const salvarAlteracoes = () => {
    setUsuario(prev => ({
      ...prev,
      nome: nomeTemp,
      username: usernameTemp,
      bio: bioTemp
    }));
    setMostrarModalEditar(false);
  };

  // Função para cancelar edição
  const cancelarEdicao = () => {
    setMostrarModalEditar(false);
  };

  // Estatísticas e gráficos
  const generosPreferidos = [
    { genero: "Ficção Científica", porcentagem: 35 },
    { genero: "Drama", porcentagem: 25 },
    { genero: "Ação", porcentagem: 20 },
    { genero: "Suspense", porcentagem: 15 },
    { genero: "Outros", porcentagem: 5 }
  ];

  // Listas criadas
  const listas = [
    { nome: "Ficção Científica Favoritos", qtdFilmes: 12 },
    { nome: "Para assistir", qtdFilmes: 8 },
    { nome: "Melhores de 2023", qtdFilmes: 5 },
    { nome: "Clássicos do Cinema", qtdFilmes: 15 },
    { nome: "Maratonas de fim de semana", qtdFilmes: 7 }
  ];

  return (
    <div style={{ 
      fontFamily: 'Poppins, sans-serif', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', 
      color: '#fff', 
      padding: '32px 42px'
    }}>
      {/* Cabeçalho do perfil */}
      <div style={{ 
        display: 'flex', 
        gap: '2rem', 
        marginBottom: '3rem',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <img 
          src={usuario.avatar} 
          alt={usuario.nome} 
          style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%', 
            objectFit: 'cover',
            border: '4px solid #4cc9f0'
          }} 
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{usuario.nome}</h1>
              <div style={{ color: '#4cc9f0', marginBottom: '0.5rem', fontSize: '1.2rem' }}>@{usuario.username}</div>
              <div style={{ color: '#aaa', marginBottom: '1rem' }}>{usuario.membro}</div>
            </div>
            <button 
              onClick={abrirModalEditar}
              style={{
                background: '#4cc9f0',
                border: 'none',
                borderRadius: '8px',
                padding: '0.8rem 1.5rem',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(76, 201, 240, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#3ba3cc';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(76, 201, 240, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#4cc9f0';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(76, 201, 240, 0.3)';
              }}
            >
              <span>✏️</span>
              Editar Perfil
            </button>
          </div>
          <p style={{ maxWidth: '600px', lineHeight: '1.6' }}>{usuario.bio}</p>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <div style={{ 
          background: 'rgba(30, 30, 50, 0.5)', 
          borderRadius: '12px', 
          padding: '1.5rem',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4cc9f0', marginBottom: '0.5rem' }}>{usuario.stats.assistidos}</div>
          <div>Filmes Assistidos</div>
        </div>
        <div style={{ 
          background: 'rgba(30, 30, 50, 0.5)', 
          borderRadius: '12px', 
          padding: '1.5rem',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4cc9f0', marginBottom: '0.5rem' }}>{usuario.stats.favoritos}</div>
          <div>Favoritos</div>
        </div>
        <div style={{ 
          background: 'rgba(30, 30, 50, 0.5)', 
          borderRadius: '12px', 
          padding: '1.5rem',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4cc9f0', marginBottom: '0.5rem' }}>{usuario.stats.avaliados}</div>
          <div>Avaliações</div>
        </div>
        <div style={{ 
          background: 'rgba(30, 30, 50, 0.5)', 
          borderRadius: '12px', 
          padding: '1.5rem',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4cc9f0', marginBottom: '0.5rem' }}>{usuario.stats.listas}</div>
          <div>Listas Criadas</div>
        </div>
      </div>

      {/* Conteúdo principal em colunas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem'
      }}>
        {/* Gêneros preferidos */}
        <div style={{ 
          background: 'rgba(30, 30, 50, 0.5)', 
          borderRadius: '12px', 
          padding: '1.5rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4cc9f0' }}>Gêneros Preferidos</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {generosPreferidos.map((genero, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>{genero.genero}</span>
                  <span>{genero.porcentagem}%</span>
                </div>
                <div style={{ 
                  height: '8px', 
                  borderRadius: '4px', 
                  background: 'rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${genero.porcentagem}%`, 
                    background: '#4cc9f0',
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avaliações recentes */}
        <div style={{ 
          background: 'rgba(30, 30, 50, 0.5)', 
          borderRadius: '12px', 
          padding: '1.5rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4cc9f0' }}>Avaliações Recentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {avaliacoesRecentes.length > 0 ? (
              avaliacoesRecentes.map((avaliacao, idx) => (
                <div key={idx} style={{ 
                  background: 'rgba(20, 20, 40, 0.5)', 
                  borderRadius: '10px', 
                  padding: '1rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold' }}>{avaliacao.titulo}</span>
                    <span style={{ fontSize: '0.8rem', color: '#aaa' }}>
                      {new Date(avaliacao.data).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div style={{ color: '#f0d744', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{"★".repeat(avaliacao.nota)}</span>
                    <span style={{ color: '#ccc', fontSize: '0.9rem' }}>
                      {avaliacao.nota} estrela{avaliacao.nota > 1 ? 's' : ''}
                    </span>
                  </div>
                  {avaliacao.generos && avaliacao.generos.length > 0 && (
                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                      {avaliacao.generos.slice(0, 3).map((genero, gIdx) => (
                        <span key={gIdx} style={{ 
                          background: 'rgba(76, 201, 240, 0.2)', 
                          padding: '0.2rem 0.5rem', 
                          borderRadius: '10px', 
                          fontSize: '0.7rem',
                          color: '#4cc9f0'
                        }}>
                          {genero}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div style={{ 
                background: 'rgba(20, 20, 40, 0.5)', 
                borderRadius: '10px', 
                padding: '2rem',
                textAlign: 'center',
                color: '#aaa'
              }}>
                <p>Você ainda não avaliou nenhum filme.</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Vá para a página de detalhes de um filme e deixe sua avaliação!
                </p>
              </div>
            )}
          </div>
          <button style={{ 
            width: '100%', 
            background: 'transparent',
            border: '1px solid rgba(76, 201, 240, 0.3)',
            padding: '0.7rem',
            borderRadius: '8px',
            color: '#4cc9f0',
            marginTop: '1rem',
            cursor: 'pointer'
          }}>Ver todas avaliações</button>
        </div>

        {/* Listas criadas */}
        <div style={{ 
          background: 'rgba(30, 30, 50, 0.5)', 
          borderRadius: '12px', 
          padding: '1.5rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4cc9f0' }}>Minhas Listas</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {listas.map((lista, idx) => (
              <div key={idx} style={{ 
                background: 'rgba(20, 20, 40, 0.5)', 
                borderRadius: '10px', 
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.3rem' }}>{lista.nome}</div>
                  <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{lista.qtdFilmes} filmes</div>
                </div>
                <button style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#4cc9f0', 
                  cursor: 'pointer' 
                }}>Ver</button>
              </div>
            ))}
          </div>
          <button style={{ 
            width: '100%', 
            background: 'transparent',
            border: '1px solid rgba(76, 201, 240, 0.3)',
            padding: '0.7rem',
            borderRadius: '8px',
            color: '#4cc9f0',
            marginTop: '1rem',
            cursor: 'pointer'
          }}>Criar nova lista</button>
        </div>
      </div>

      {/* Modal de Edição de Perfil */}
      {mostrarModalEditar && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderRadius: '12px',
            padding: '2rem',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(76, 201, 240, 0.3)'
          }}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '1.5rem', 
              color: '#4cc9f0',
              textAlign: 'center'
            }}>
              ✏️ Editar Perfil
            </h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#fff',
                fontWeight: 'bold'
              }}>
                Nome:
              </label>
              <input
                type="text"
                value={nomeTemp}
                onChange={(e) => setNomeTemp(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(76, 201, 240, 0.3)',
                  background: 'rgba(30, 30, 50, 0.5)',
                  color: '#fff',
                  fontSize: '1rem'
                }}
                placeholder="Seu nome completo"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#fff',
                fontWeight: 'bold'
              }}>
                Username:
              </label>
              <input
                type="text"
                value={usernameTemp}
                onChange={(e) => setUsernameTemp(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(76, 201, 240, 0.3)',
                  background: 'rgba(30, 30, 50, 0.5)',
                  color: '#fff',
                  fontSize: '1rem'
                }}
                placeholder="@seuusername"
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#fff',
                fontWeight: 'bold'
              }}>
                Biografia:
              </label>
              <textarea
                value={bioTemp}
                onChange={(e) => setBioTemp(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(76, 201, 240, 0.3)',
                  background: 'rgba(30, 30, 50, 0.5)',
                  color: '#fff',
                  fontSize: '1rem',
                  resize: 'vertical',
                  fontFamily: 'Poppins, sans-serif'
                }}
                placeholder="Conte um pouco sobre você e seus gostos cinematográficos..."
              />
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'flex-end' 
            }}>
              <button
                onClick={cancelarEdicao}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  padding: '0.8rem 1.5rem',
                  color: '#fff',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                Cancelar
              </button>
              <button
                onClick={salvarAlteracoes}
                style={{
                  background: '#4cc9f0',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.8rem 1.5rem',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#3ba3cc';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#4cc9f0';
                }}
              >
                💾 Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
