'use client';
import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';

export default function Simples() {
  const [filmes, setFilmes] = useState([]);
  const [filmesExibidos, setFilmesExibidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [generoSelecionado, setGeneroSelecionado] = useState('');
  
  // Lista de gêneros que temos nos filmes - baseado nos dados reais da API
  const generos = ["Ação", "Comédia", "Drama", "Ficção Científica", "Terror", "Romance", "Animação", "Aventura", "Fantasia", "Thriller", "Crime", "Família"];
  
  // Buscar filmes do servidor quando o componente for montado
  useEffect(() => {
    async function carregarFilmes() {
      try {
        setCarregando(true);
        
        // Tenta buscar os filmes do servidor local
        const resposta = await fetch('http://localhost:4001/movies');
        
        if (!resposta.ok) {
          throw new Error(`Erro na resposta: ${resposta.status}`);
        }
        
        const dados = await resposta.json();
        console.log('Filmes carregados:', dados);
        
        setFilmes(dados);
        setFilmesExibidos(dados);
        setErro(null);
      } catch (error) {
        console.error('Falha ao carregar filmes:', error);
        setErro(`Falha ao carregar filmes: ${error.message}`);
      } finally {
        setCarregando(false);
      }
    }
    
    carregarFilmes();
  }, []);
  
  // Filtrar por gênero
  function filtrarPorGenero(genero) {
    if (genero === '') {
      // Botão "Todos" - mostrar todos os filmes
      setGeneroSelecionado('');
      setFilmesExibidos(filmes);
    } else if (generoSelecionado === genero) {
      // Se clicar no mesmo gênero, remove o filtro (volta para "Todos")
      setGeneroSelecionado('');
      setFilmesExibidos(filmes);
    } else {
      // Aplicar filtro por gênero - verificar tanto genero quanto generos
      setGeneroSelecionado(genero);
      const filtrados = filmes.filter(filme => {
        const generoMatch = filme.genero?.toLowerCase() === genero.toLowerCase();
        const generosMatch = filme.generos?.some(g => g.toLowerCase() === genero.toLowerCase());
        return generoMatch || generosMatch;
      });
      setFilmesExibidos(filtrados);
    }
  }
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>CineMagic</h1>
      
      {/* Barra de categorias */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {/* Botão "Todos" */}
        <button 
          onClick={() => filtrarPorGenero('')}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Mostrar Todos os Filmes
        </button>
      </div>
      
      {/* Mensagens de estado */}
      {carregando && (
        <div style={{ textAlign: 'center', margin: '50px 0' }}>
          <p>Carregando filmes...</p>
        </div>
      )}
      
      {erro && (
        <div style={{ 
          textAlign: 'center', 
          margin: '50px 0', 
          padding: '20px', 
          backgroundColor: '#ffdddd', 
          borderRadius: '5px' 
        }}>
          <p><strong>Erro:</strong> {erro}</p>
          <p>Verifique se o servidor está rodando com: <code>node servidor-api-filmes.js</code></p>
        </div>
      )}
      
      {/* Lista de filmes */}
      {!carregando && !erro && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {filmesExibidos.length > 0 ? (
            filmesExibidos.map((filme) => (
              <div 
                key={filme.id} 
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <img 
                  src={filme.imagem} 
                  alt={filme.titulo}
                  style={{
                    width: '100%',
                    height: '350px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: '15px' }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>{filme.titulo}</h3>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '10px',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    <span>{filme.genero}</span>
                    <span>{filme.ano}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '10px' 
                  }}>
                    <span style={{ 
                      color: '#f8ce0b', 
                      marginRight: '5px' 
                    }}>★</span>
                    <span>{filme.avaliacao || filme.rating}</span>
                    <span style={{ 
                      fontSize: '12px', 
                      color: '#666',
                      marginLeft: '10px'
                    }}>
                      ({filme.reviews} avaliações)
                    </span>
                  </div>
                  <button style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    width: '100%',
                    cursor: 'pointer'
                  }}>
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '50px' 
            }}>
              <p>Nenhum filme encontrado para a categoria selecionada.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}