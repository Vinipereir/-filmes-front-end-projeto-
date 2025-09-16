import styles from './home.module.css';

export default function Home() {
  const destaques = [
    { titulo: "Interstellar", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", lancamento: "2014", rating: 4.8, diretor: "Christopher Nolan" },
    { titulo: "Oppenheimer", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", lancamento: "2023", rating: 4.6, diretor: "Christopher Nolan" },
    { titulo: "Dune", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uzERcfV2rSHNhW5eViQiO9hNiA7.jpg", lancamento: "2021", rating: 4.4, diretor: "Denis Villeneuve" },
  ];

  const atividades = [
    { usuario: "MariaFilmes", acao: "avaliou", filme: "The Matrix", rating: 5, tempo: "há 2 horas" },
    { usuario: "CinemaPro", acao: "comentou em", filme: "The Shawshank Redemption", comentario: "Obra-prima do cinema!", tempo: "há 5 horas" },
    { usuario: "FilmeLover", acao: "adicionou aos favoritos", filme: "Pulp Fiction", tempo: "há 1 dia" },
    { usuario: "JohnCinema", acao: "avaliou", filme: "Interstellar", rating: 4.5, tempo: "há 2 dias" },
  ];

  return (
    <div style={{ 
      fontFamily: 'Poppins, sans-serif', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', 
      color: '#fff', 
      padding: '32px 42px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#4cc9f0' }}>FilmCommunity</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#ddd' }}>
          Descubra, avalie e compartilhe suas opiniões sobre filmes e séries com toda a comunidade
        </p>
      </div>

      {/* Banner principal */}
      <div style={{ 
        background: 'rgba(30, 30, 50, 0.5)', 
        borderRadius: '16px', 
        padding: '2rem', 
        marginBottom: '3rem',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Explore nosso catálogo</h2>
        <p style={{ marginBottom: '1.5rem', color: '#aaa', maxWidth: '700px', margin: '0 auto 1.5rem auto' }}>
          Encontre novos filmes para assistir, compartilhe suas opiniões e conecte-se com outros cinéfilos
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button style={{ 
            background: '#4cc9f0',
            border: 'none',
            padding: '0.8rem 2rem',
            borderRadius: '30px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1.1rem'
          }}>Explorar Catálogo</button>
          <button style={{ 
            background: 'transparent',
            border: '1px solid #4cc9f0',
            padding: '0.8rem 2rem',
            borderRadius: '30px',
            color: '#4cc9f0',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1.1rem'
          }}>Meus Favoritos</button>
        </div>
      </div>

      {/* Grid de seções */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* Destaques */}
        <div style={{ 
          background: 'rgba(30, 30, 50, 0.5)', 
          borderRadius: '16px', 
          padding: '1.5rem', 
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4cc9f0' }}>Em Destaque</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {destaques.map((destaque, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                gap: '1rem', 
                background: 'rgba(20, 20, 40, 0.5)', 
                borderRadius: '10px', 
                overflow: 'hidden',
                cursor: 'pointer'
              }}>
                <img 
                  src={destaque.imagem} 
                  alt={destaque.titulo} 
                  style={{ width: '80px', height: '120px', objectFit: 'cover' }} 
                />
                <div style={{ padding: '0.8rem 0.5rem', flex: 1 }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{destaque.titulo}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: '#aaa', marginBottom: '0.5rem' }}>
                    <span>{destaque.lancamento}</span>
                    <span>•</span>
                    <span>Dir: {destaque.diretor}</span>
                  </div>
                  <div style={{ color: '#f0d744' }}>★ {destaque.rating}</div>
                </div>
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
          }}>Ver mais destaques</button>
        </div>
        
        {/* Feed da comunidade */}
        <div style={{ 
          background: 'rgba(30, 30, 50, 0.5)', 
          borderRadius: '16px', 
          padding: '1.5rem', 
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4cc9f0' }}>Atividade Recente</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {atividades.map((atividade, idx) => (
              <div key={idx} style={{ 
                background: 'rgba(20, 20, 40, 0.5)', 
                borderRadius: '10px', 
                padding: '1rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold' }}>{atividade.usuario}</span>
                  <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{atividade.tempo}</span>
                </div>
                <div>
                  <span>{atividade.acao} </span>
                  <span style={{ color: '#4cc9f0' }}>{atividade.filme}</span>
                  {atividade.rating && <span style={{ color: '#f0d744', marginLeft: '0.5rem' }}>★ {atividade.rating}</span>}
                </div>
                {atividade.comentario && (
                  <div style={{ 
                    marginTop: '0.5rem', 
                    padding: '0.7rem', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}>
                    "{atividade.comentario}"
                  </div>
                )}
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
          }}>Ver mais atividades</button>
        </div>
        
        {/* Estatísticas */}
        <div style={{ 
          background: 'rgba(30, 30, 50, 0.5)', 
          borderRadius: '16px', 
          padding: '1.5rem', 
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4cc9f0' }}>Estatísticas</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ 
              background: 'rgba(20, 20, 40, 0.5)', 
              borderRadius: '10px', 
              padding: '1.2rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4cc9f0', marginBottom: '0.5rem' }}>1,234</div>
              <div style={{ color: '#aaa' }}>Filmes no catálogo</div>
            </div>
            <div style={{ 
              background: 'rgba(20, 20, 40, 0.5)', 
              borderRadius: '10px', 
              padding: '1.2rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4cc9f0', marginBottom: '0.5rem' }}>562</div>
              <div style={{ color: '#aaa' }}>Séries catalogadas</div>
            </div>
            <div style={{ 
              background: 'rgba(20, 20, 40, 0.5)', 
              borderRadius: '10px', 
              padding: '1.2rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4cc9f0', marginBottom: '0.5rem' }}>25,621</div>
              <div style={{ color: '#aaa' }}>Avaliações da comunidade</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
