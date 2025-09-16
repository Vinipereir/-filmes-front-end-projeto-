
export default function Home() {
  const filmes = [
    { titulo: "Stranger Things", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg", rating: 4.8, reviews: 1423 },
    { titulo: "Breaking Bad", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ggFHVNu6YYI5L9pCfOacjizRGt.jpg", rating: 4.9, reviews: 2837 },
    { titulo: "La Casa de Papel", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7xkH1v1bTzQ2JQ1zjTsNM8g4Q4T.jpg", rating: 4.5, reviews: 1654 },
    { titulo: "The Witcher", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg", rating: 4.3, reviews: 1232 },
    { titulo: "Dark", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg", rating: 4.7, reviews: 983 },
    { titulo: "Interstellar", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", rating: 4.8, reviews: 1823 },
  ];

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: '#fff', padding: '0', margin: '0' }}>
      <header style={{ 
        padding: '24px 42px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#4cc9f0' }}>
          FilmCommunity
        </div>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '1rem' }}>
          <a href="/home" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', padding: '8px 16px', borderRadius: '20px', transition: 'all 0.3s' }}>Home</a>
          <a href="/catalogo" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', padding: '8px 16px', borderRadius: '20px', transition: 'all 0.3s', background: 'rgba(76, 201, 240, 0.2)' }}>Catálogo</a>
          <a href="/detalhes" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', padding: '8px 16px', borderRadius: '20px', transition: 'all 0.3s' }}>Detalhes</a>
          <a href="/favoritos" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', padding: '8px 16px', borderRadius: '20px', transition: 'all 0.3s' }}>Favoritos</a>
          <a href="/perfil" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', padding: '8px 16px', borderRadius: '20px', transition: 'all 0.3s' }}>Perfil</a>
        </nav>
      </header>
      <main style={{ padding: '32px 42px' }}>
        <h2 style={{ fontSize: '2rem', marginTop: '1rem', marginBottom: '1.5rem', color: '#fff' }}>Filmes e Séries em Destaque</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
          {filmes.map((filme, idx) => (
            <div key={idx} style={{ 
              background: 'rgba(30, 30, 50, 0.5)', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)', 
              textAlign: 'center', 
              paddingBottom: '12px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}>
              <img src={filme.imagem} alt={filme.titulo} style={{ width: '100%', height: '270px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '12px 8px 0 8px', fontWeight: 'bold', fontSize: '1.1rem', color: '#4cc9f0' }}>{filme.titulo}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '4px 0' }}>
                <div style={{ color: '#f0d744' }}>★ {filme.rating}</div>
                <div style={{ color: '#aaa', fontSize: '0.8rem' }}>({filme.reviews} avaliações)</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '8px 0' }}>
                <button style={{
                  background: 'transparent', 
                  border: '1px solid #4cc9f0', 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  color: '#4cc9f0',
                  cursor: 'pointer'
                }}>Comentar</button>
                <button style={{ background: '#4cc9f0', border: 'none', padding: '4px 12px', borderRadius: '20px', color: '#fff', cursor: 'pointer' }}>Favoritar</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
