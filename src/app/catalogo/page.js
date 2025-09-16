import styles from './catalogo.module.css';

export default function Catalogo() {
  const generos = ["Ação", "Comédia", "Drama", "Ficção Científica", "Terror", "Romance", "Animação"];
  const filmes = [
    { titulo: "Inception", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg", genero: "Ficção Científica", ano: 2010, rating: 4.7 },
    { titulo: "The Shawshank Redemption", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", genero: "Drama", ano: 1994, rating: 4.9 },
    { titulo: "The Dark Knight", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg", genero: "Ação", ano: 2008, rating: 4.8 },
    { titulo: "Pulp Fiction", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", genero: "Crime", ano: 1994, rating: 4.7 },
    { titulo: "Forrest Gump", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", genero: "Drama", ano: 1994, rating: 4.8 },
    { titulo: "The Matrix", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", genero: "Ficção Científica", ano: 1999, rating: 4.7 },
    { titulo: "Interestelar", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg", genero: "Ficção Científica", ano: 2014, rating: 4.8 },
    { titulo: "A Origem", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg", genero: "Ficção Científica", ano: 2010, rating: 4.7 },
  ];

  return (
    <div style={{ 
      fontFamily: 'Poppins, sans-serif', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', 
      color: '#fff', 
      padding: '32px 42px'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#4cc9f0' }}>Catálogo de Filmes e Séries</h1>
      
      {/* Filtros e busca */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        background: 'rgba(30, 30, 50, 0.5)', 
        padding: '1.5rem', 
        borderRadius: '12px', 
        marginBottom: '2rem',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Filtrar por:</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {generos.map((genero, idx) => (
              <button key={idx} style={{ 
                background: 'transparent', 
                border: '1px solid #4cc9f0', 
                padding: '0.5rem 1rem', 
                borderRadius: '20px', 
                color: '#4cc9f0',
                cursor: 'pointer'
              }}>{genero}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Buscar filmes e séries..." 
            style={{ 
              flex: 1, 
              padding: '0.8rem 1.2rem', 
              borderRadius: '30px', 
              border: 'none', 
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff'
            }} 
          />
          <button style={{ 
            background: '#4cc9f0', 
            border: 'none', 
            padding: '0.8rem 1.5rem', 
            borderRadius: '30px', 
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>Buscar</button>
        </div>
      </div>
      
      {/* Lista de filmes/séries */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '2rem'
      }}>
        {filmes.map((filme, idx) => (
          <div key={idx} style={{ 
            background: 'rgba(30, 30, 50, 0.5)', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)', 
            textAlign: 'center', 
            paddingBottom: '12px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>
              {filme.ano}
            </div>
            <img src={filme.imagem} alt={filme.titulo} style={{ width: '100%', height: '270px', objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '12px 8px 0 8px', fontWeight: 'bold', fontSize: '1.1rem', color: '#4cc9f0' }}>{filme.titulo}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '4px 0' }}>
              <div style={{ color: '#f0d744' }}>★ {filme.rating}</div>
              <div style={{ color: '#aaa', fontSize: '0.8rem' }}>{filme.genero}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
