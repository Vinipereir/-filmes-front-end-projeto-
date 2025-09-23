import styles from './favoritos.module.css';
import MovieImage from '../../components/MovieImage';

export default function Favoritos() {
  const favoritos = [
    { titulo: "Inception", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg", genero: "Ficção Científica", dataSalvo: "15/09/2023", rating: 4.7 },
    { titulo: "The Shawshank Redemption", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", genero: "Drama", dataSalvo: "10/08/2023", rating: 4.9 },
    { titulo: "The Dark Knight", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg", genero: "Ação", dataSalvo: "05/07/2023", rating: 4.8 },
  ];

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
      {favoritos.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {favoritos.map((favorito, idx) => (
            <div key={idx} style={{ 
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
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#aaa', fontSize: '0.9rem' }}>
                    <span>{favorito.genero}</span>
                    <span>•</span>
                    <span style={{ color: '#f0d744' }}>★ {favorito.rating}</span>
                    <span>•</span>
                    <span>Adicionado em: {favorito.dataSalvo}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    color: '#4cc9f0', 
                    cursor: 'pointer', 
                    fontSize: '1rem' 
                  }}>Ver detalhes</button>
                  <button style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    color: '#ff6b6b', 
                    cursor: 'pointer', 
                    fontSize: '1rem' 
                  }}>Remover</button>
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
          <button style={{ 
            background: '#4cc9f0',
            border: 'none',
            padding: '0.8rem 2rem',
            borderRadius: '30px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>Explorar Catálogo</button>
        </div>
      )}
    </div>
  );
}
