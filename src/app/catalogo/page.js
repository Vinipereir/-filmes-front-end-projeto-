'use client';
import { useState, useEffect } from 'react';
import styles from './catalogo.module.css';
import api from '../../services/api';
import AlertaWrapper from '../../components/AlertaWrapper';
import ConfiguracaoApi from '../../components/ConfiguracaoApi';
import axios from 'axios';

export default function Catalogo() {
  // Estados para armazenar dados e filtros
  const [filmes, setFilmes] = useState([]);
  const [filmesExibidos, setFilmesExibidos] = useState([]);
  const [busca, setBusca] = useState('');
  const [generoSelecionado, setGeneroSelecionado] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  
  // Lista de gêneros que usaremos para os filtros
  const generos = ["Ação", "Comédia", "Drama", "Ficção Científica", "Terror", "Romance", "Animação"];
  
  // Buscar filmes ao carregar o componente
  useEffect(() => {
    const buscarFilmes = async () => {
      try {
        setCarregando(true);
        console.log('Iniciando busca de filmes...');
        
        // Buscar filmes diretamente do back-end
        const response = await api.get('/movies');
        console.log('Dados recebidos do back-end:', response.data);
        
        // Processar e formatar os dados recebidos
        // Adapte esta parte conforme o formato dos dados do seu back-end
        const dadosFormatados = Array.isArray(response.data) 
          ? response.data.map(filme => ({
              id: filme.id,
              titulo: filme.titulo || filme.nome || 'Título não disponível',
              imagem: filme.imagem || filme.poster || 'https://via.placeholder.com/200x300?text=Sem+Imagem',
              genero: filme.genero || 'Não categorizado',
              ano: filme.ano || filme.lancamento || new Date().getFullYear(),
              rating: filme.rating || filme.avaliacao || 0
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
        { id: 1, titulo: "Inception", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg", genero: "Ficção Científica", ano: 2010, rating: 4.7 },
        { id: 2, titulo: "The Shawshank Redemption", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", genero: "Drama", ano: 1994, rating: 4.9 },
        { id: 3, titulo: "The Dark Knight", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg", genero: "Ação", ano: 2008, rating: 4.8 },
        { id: 4, titulo: "Pulp Fiction", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", genero: "Crime", ano: 1994, rating: 4.7 },
        { id: 5, titulo: "Forrest Gump", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", genero: "Drama", ano: 1994, rating: 4.8 },
        { id: 6, titulo: "The Matrix", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", genero: "Ficção Científica", ano: 1999, rating: 4.7 },
        { id: 7, titulo: "Interestelar", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg", genero: "Ficção Científica", ano: 2014, rating: 4.8 },
        { id: 8, titulo: "A Origem", imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg", genero: "Ficção Científica", ano: 2010, rating: 4.7 },
      ];
      
      setFilmes(dadosFallback);
      setFilmesExibidos(dadosFallback);
    };
    
    buscarFilmes();
  }, []);
  
  // Função para filtrar os filmes com base na busca e gênero
  const filtrarFilmes = () => {
    let filmesFiltrados = [...filmes];
    
    // Filtrar por termo de busca
    if (busca) {
      const termoBusca = busca.toLowerCase();
      filmesFiltrados = filmesFiltrados.filter(filme => 
        filme.titulo.toLowerCase().includes(termoBusca)
      );
    }
    
    // Filtrar por gênero
    if (generoSelecionado) {
      filmesFiltrados = filmesFiltrados.filter(filme => 
        filme.genero === generoSelecionado
      );
    }
    
    setFilmesExibidos(filmesFiltrados);
  };
  
  // Atualizar a busca
  const handleBuscaChange = (e) => {
    setBusca(e.target.value);
  };
  
  // Executar a busca ao pressionar Enter ou clicar no botão
  const handleBusca = () => {
    filtrarFilmes();
  };
  
  // Executar a busca ao pressionar Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      filtrarFilmes();
    }
  };
  
  // Filtrar por gênero
  const handleGeneroClick = (genero) => {
    if (generoSelecionado === genero) {
      // Se clicar no mesmo gênero, desseleciona
      setGeneroSelecionado('');
    } else {
      // Selecionar o novo gênero
      setGeneroSelecionado(genero);
    }
    // Aplicar o filtro após atualizar o estado
    setTimeout(filtrarFilmes, 0);
  };

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
              <button 
                key={idx} 
                onClick={() => handleGeneroClick(genero)}
                style={{ 
                  background: generoSelecionado === genero ? '#4cc9f0' : 'transparent', 
                  border: '1px solid #4cc9f0', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px', 
                  color: generoSelecionado === genero ? '#fff' : '#4cc9f0',
                  cursor: 'pointer'
                }}
              >
                {genero}
              </button>
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
            value={busca}
            onChange={handleBuscaChange}
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={handleBusca}
            style={{ 
              background: '#4cc9f0', 
              border: 'none', 
              padding: '0.8rem 1.5rem', 
              borderRadius: '30px', 
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Buscar
          </button>
        </div>
      </div>
      
      {/* Estado de carregando */}
      {carregando && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontSize: '1.2rem' }}>Carregando filmes...</p>
        </div>
      )}
      
      {/* Mensagem de erro */}
      {erro && !carregando && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
          <p style={{ fontSize: '1.2rem' }}>{erro}</p>
        </div>
      )}
      
      {/* Mensagem de nenhum resultado */}
      {!carregando && !erro && filmesExibidos.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontSize: '1.2rem' }}>Nenhum filme encontrado com os critérios selecionados.</p>
        </div>
      )}
      
      {/* Lista de filmes/séries */}
      {!carregando && !erro && filmesExibidos.length > 0 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '2rem'
        }}>
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
              position: 'relative',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              transform: 'translateY(0)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)'
              }
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
            </a>
          ))}
        </div>
      )}
      
      {/* Componente de alerta de conexão */}
      <AlertaWrapper />
      
      {/* Componente de configuração da API */}
      <ConfiguracaoApi />
    </div>
  );
}
