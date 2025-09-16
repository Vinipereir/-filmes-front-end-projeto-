import styles from './perfil.module.css';

export default function Perfil() {
  // Dados de exemplo de um usuário
  const usuario = {
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
  };

  // Estatísticas e gráficos
  const generosPreferidos = [
    { genero: "Ficção Científica", porcentagem: 35 },
    { genero: "Drama", porcentagem: 25 },
    { genero: "Ação", porcentagem: 20 },
    { genero: "Suspense", porcentagem: 15 },
    { genero: "Outros", porcentagem: 5 }
  ];

  // Filmes recentemente avaliados
  const filmesRecentes = [
    { titulo: "Oppenheimer", rating: 4.5, data: "10/09/2023" },
    { titulo: "Barbie", rating: 4.0, data: "05/08/2023" },
    { titulo: "Interestelar", rating: 5.0, data: "20/07/2023" },
    { titulo: "Matrix", rating: 4.5, data: "15/06/2023" }
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
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{usuario.nome}</h1>
          <div style={{ color: '#4cc9f0', marginBottom: '0.5rem', fontSize: '1.2rem' }}>@{usuario.username}</div>
          <div style={{ color: '#aaa', marginBottom: '1rem' }}>{usuario.membro}</div>
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
            {filmesRecentes.map((filme, idx) => (
              <div key={idx} style={{ 
                background: 'rgba(20, 20, 40, 0.5)', 
                borderRadius: '10px', 
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold' }}>{filme.titulo}</span>
                  <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{filme.data}</span>
                </div>
                <div style={{ color: '#f0d744' }}>{"★".repeat(Math.floor(filme.rating))}{filme.rating % 1 === 0.5 ? "½" : ""}</div>
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
    </div>
  );
}
