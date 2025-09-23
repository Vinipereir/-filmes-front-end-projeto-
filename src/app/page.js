
'use client';
import { useState, useEffect } from 'react';
import AlertaWrapper from '../components/AlertaWrapper';
import ConfiguracaoApi from '../components/ConfiguracaoApi';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';
import api from '../services/api';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [filmes, setFilmes] = useState([]);
  const [filmesExibidos, setFilmesExibidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [generoSelecionado, setGeneroSelecionado] = useState('');
  
  // Lista de gêneros para os filtros - baseado nos dados reais da API
  const generos = ["Ação", "Comédia", "Drama", "Ficção Científica", "Terror", "Romance", "Animação", "Aventura", "Fantasia", "Thriller", "Crime", "Família"];
  
  // Buscar filmes ao carregar o componente
  useEffect(() => {
    const buscarFilmes = async () => {
      try {
        setCarregando(true);
        console.log('Iniciando busca de filmes...');
        
        // Buscar filmes do back-end
        const response = await api.get('/movies');
        console.log('Dados recebidos do back-end:', response.data);
        
        // Processar e formatar os dados recebidos
        const dadosFormatados = Array.isArray(response.data) 
          ? response.data.map(filme => ({
              id: filme.id,
              titulo: filme.titulo || filme.nome || filme.title || 'Título não disponível',
              imagem: filme.imagem || filme.poster || filme.poster_path || 'https://via.placeholder.com/200x300?text=Sem+Imagem',
              genero: filme.genero || filme.categoria || filme.genre || 'Não categorizado',
              ano: filme.ano || filme.lancamento || filme.release_date || new Date().getFullYear(),
              rating: filme.rating || filme.avaliacao || filme.vote_average || Math.floor(Math.random() * 5) + 1,
              reviews: filme.reviews || filme.avaliacoes || filme.vote_count || Math.floor(Math.random() * 1000) + 1
            }))
          : [];
        
        console.log('Dados formatados:', dadosFormatados);
        
        if (dadosFormatados.length === 0) {
          console.log('Nenhum filme encontrado na API, usando dados de fallback');
          setErro("Não foram encontrados filmes no servidor. Exibindo dados de exemplo.");
          usarDadosFallback();
        } else {
          setFilmes(dadosFormatados);
          setFilmesExibidos(dadosFormatados);
          setErro(null);
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setErro("Não foi possível conectar ao servidor de filmes. Exibindo dados de exemplo.");
        usarDadosFallback();
      } finally {
        setCarregando(false);
      }
    };
    
    // Função para usar dados de fallback quando o back-end não responde
    const usarDadosFallback = () => {
      const dadosFallback = [
        { id: 1, titulo: "Stranger Things", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg", genero: "Ficção Científica", ano: 2016, rating: 4.8, reviews: 1423 },
        { id: 2, titulo: "Breaking Bad", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ggFHVNu6YYI5L9pCfOacjizRGt.jpg", genero: "Drama", ano: 2008, rating: 4.9, reviews: 2837 },
        { id: 3, titulo: "La Casa de Papel", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7xkH1v1bTzQ2JQ1zjTsNM8g4Q4T.jpg", genero: "Ação", ano: 2017, rating: 4.5, reviews: 1654 },
        { id: 4, titulo: "The Witcher", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg", genero: "Fantasia", ano: 2019, rating: 4.3, reviews: 1232 },
        { id: 5, titulo: "Dark", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg", genero: "Ficção Científica", ano: 2017, rating: 4.7, reviews: 983 },
        { id: 6, titulo: "Interstellar", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", genero: "Ficção Científica", ano: 2014, rating: 4.8, reviews: 1823 },
      ];
      
      setFilmes(dadosFallback);
      setFilmesExibidos(dadosFallback);
    };
    
    buscarFilmes();
  }, []);
  
  // Filtrar por gênero
  const filtrarPorGenero = (genero) => {
    if (genero === '') {
      // Botão "Todos" - mostrar todos os filmes
      setGeneroSelecionado('');
      setFilmesExibidos(filmes);
    } else if (generoSelecionado === genero) {
      // Se clicar no mesmo gênero, desseleciona (volta para "Todos")
      setGeneroSelecionado('');
      setFilmesExibidos(filmes);
    } else {
      // Selecionar o novo gênero
      setGeneroSelecionado(genero);
      // Filtrar filmes pelo gênero selecionado - verificar tanto genero quanto generos
      const filmesFiltrados = filmes.filter(filme => {
        const generoMatch = filme.genero?.toLowerCase() === genero.toLowerCase();
        const generosMatch = filme.generos?.some(g => g.toLowerCase() === genero.toLowerCase());
        return generoMatch || generosMatch;
      });
      setFilmesExibidos(filmesFiltrados);
    }
  };

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
          <button 
            onClick={() => setShowLogin(!showLogin)} 
            style={{ 
              color: '#fff', 
              textDecoration: 'none', 
              fontWeight: '500', 
              padding: '8px 16px', 
              borderRadius: '20px', 
              transition: 'all 0.3s',
              background: 'rgba(76, 201, 240, 0.4)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {showLogin ? 'Fechar Login' : 'Login JWT'}
          </button>
          <a href="/perfil" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', padding: '8px 16px', borderRadius: '20px', transition: 'all 0.3s' }}>Perfil</a>
        </nav>
      </header>
      <main style={{ padding: '32px 42px' }}>
        <h2 style={{ fontSize: '2rem', marginTop: '1rem', marginBottom: '1.5rem', color: '#fff' }}>Filmes e Séries em Destaque</h2>
        
        {/* Barra de categorias/gêneros */}
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          marginBottom: '2rem', 
          overflowX: 'auto', 
          padding: '0.5rem 0',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: '-ms-autohiding-scrollbar'
        }}>
          {/* Botão "Todos" */}
          <button 
            onClick={() => filtrarPorGenero('')}
            style={{ 
              background: '#4cc9f0', 
              border: 'none',
              padding: '0.8rem 1.5rem', 
              borderRadius: '30px', 
              color: '#fff',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontSize: '0.95rem',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
          >
            Mostrar Todos os Filmes
          </button>
        </div>
        
        {/* Estado de carregando */}
        {carregando && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ fontSize: '1.2rem' }}>Carregando filmes...</p>
          </div>
        )}
        
        {/* Mensagem de erro */}
        {erro && !carregando && (
          <div style={{ textAlign: 'center', padding: '1rem', color: '#ff6b6b' }}>
            <p style={{ fontSize: '1.2rem' }}>{erro}</p>
          </div>
        )}
        
        {/* Grid de filmes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
          {filmesExibidos.map((filme, idx) => (
            <a href={`/detalhes?id=${filme.id}`} key={idx} style={{ 
              background: 'rgba(30, 30, 50, 0.5)', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)', 
              textAlign: 'center', 
              paddingBottom: '12px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit'
            }}>
              {/* Badge do ano */}
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>
                {filme.ano}
              </div>
              <img src={filme.imagem} alt={filme.titulo} style={{ width: '100%', height: '270px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '12px 8px 0 8px', fontWeight: 'bold', fontSize: '1.1rem', color: '#4cc9f0' }}>{filme.titulo}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '4px 0' }}>
                <div style={{ color: '#f0d744' }}>★ {filme.rating}</div>
                <div style={{ color: '#aaa', fontSize: '0.8rem' }}>({filme.reviews} avaliações)</div>
              </div>
              <div style={{ color: '#999', fontSize: '0.9rem', margin: '4px 0' }}>{filme.genero}</div>
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
            </a>
          ))}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Componente de alerta de conexão */}
      <AlertaWrapper />
      
      {/* Componente de configuração da API */}
      <ConfiguracaoApi />
      
      {/* Componente de login JWT */}
      {showLogin && <LoginForm />}
    </div>
  );
}
