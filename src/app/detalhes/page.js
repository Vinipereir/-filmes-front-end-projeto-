'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './detalhes.module.css';
import api from '../../services/api';
import AlertaWrapper from '../../components/AlertaWrapper';
import ConfiguracaoApi from '../../components/ConfiguracaoApi';
import MovieImage from '../../components/MovieImage';
import BackdropImage from '../../components/BackdropImage';

export default function Detalhes() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [filme, setFilme] = useState({
    titulo: "Carregando...",
    tituloOriginal: "",
    lancamento: "",
    duracao: "",
    generos: [],
    sinopse: "Carregando informações do filme...",
    diretor: "",
    imagem: "https://via.placeholder.com/200x300?text=Carregando",
    backdrop: "https://via.placeholder.com/1920x1080?text=Carregando",
    avaliacao: 0,
    votos: 0,
    elenco: [],
    comentarios: []
  });
  
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentario, setComentario] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  
  // Buscar detalhes do filme
  useEffect(() => {
    const buscarDetalhesFilme = async () => {
      if (!id) {
        console.error("ID do filme não encontrado na URL");
        setErro("ID do filme não especificado");
        setCarregando(false);
        return;
      }
      
      console.log(`Tentando buscar detalhes para o filme com ID: ${id}`);
      
      try {
        setCarregando(true);
        console.log(`Buscando detalhes do filme com ID: ${id}`);
        
        // Conectar diretamente ao back-end
        console.log(`Fazendo requisição para: /movies/${id}`);
        const response = await api.get(`/movies/${id}`);
        console.log('Dados recebidos do back-end:', JSON.stringify(response.data));
        
        if (response.data) {
          // Adaptar os dados da API para o formato que esperamos
          const filmeData = response.data;
          // Mapear os dados do servidor para o formato esperado pela página
          console.log('Adaptando dados recebidos:', filmeData);
          setFilme({
            titulo: filmeData.titulo || "Título não disponível",
            tituloOriginal: filmeData.tituloOriginal || filmeData.titulo || "",
            lancamento: filmeData.ano?.toString() || "",
            duracao: filmeData.duracao || "120 min",
            generos: filmeData.generos || [filmeData.genero].filter(Boolean),
            sinopse: filmeData.sinopse || "Sinopse não disponível",
            diretor: filmeData.diretor || "Não informado",
            imagem: filmeData.imagem || "https://via.placeholder.com/200x300/1a1a2e/4cc9f0?text=Sem+Imagem",
            backdrop: filmeData.backdrop || filmeData.imagem || "https://via.placeholder.com/1920x1080/1a1a2e/4cc9f0?text=Sem+Imagem+de+Fundo",
            avaliacao: filmeData.avaliacao || 0,
            votos: filmeData.reviews || 0,
            elenco: filmeData.elenco || [],
            comentarios: filmeData.comentarios || []
          });
          setErro(null);
        } else {
          throw new Error('Resposta inválida do servidor');
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
        setErro("Não foi possível carregar as informações do filme. Verifique a conexão com o servidor API.");
      } finally {
        setCarregando(false);
      }
    };
    
    buscarDetalhesFilme();
  }, [id]);

  return (
    <div style={{ 
      fontFamily: 'Poppins, sans-serif', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', 
      color: '#fff', 
      padding: '0', 
      margin: '0'
    }}>
      {carregando ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '1.2rem' }}>Carregando informações do filme...</p>
          <p style={{ fontSize: '1rem', marginTop: '1rem', color: '#aaa' }}>ID do filme: {id || 'Não especificado'}</p>
        </div>
      ) : erro ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#ff6b6b' }}>
          <p style={{ fontSize: '1.2rem' }}>{erro}</p>
          <button 
            onClick={() => window.history.back()}
            style={{
              background: '#4cc9f0',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '30px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '1.5rem'
            }}
          >
            Voltar
          </button>
        </div>
      ) : (
        <>
          {/* Banner com imagem do filme */}
          <div style={{ 
            position: 'relative', 
            height: '450px', 
            width: '100%', 
            overflow: 'hidden',
            marginBottom: '2rem'
          }}>
            <BackdropImage
              src={filme.backdrop}
              alt={`${filme.titulo} backdrop`}
              fallbackColor="#1a1a2e"
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              background: 'linear-gradient(to top, rgba(26, 26, 46, 1) 0%, rgba(26, 26, 46, 0) 100%)',
              height: '50%'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '2rem',
              left: '3rem',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '2rem'
            }}>
              <MovieImage
                src={filme.imagem}
                alt={filme.titulo}
                width="180px"
                height="270px"
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)'
                }}
                fallbackTitle={filme.titulo}
                loading="eager"
              />
              <div>
                <h1 style={{ fontSize: '3rem', margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{filme.titulo}</h1>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
                  <div style={{ color: '#f0d744', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>★</span>
                    <span>{filme.avaliacao}</span>
                  </div>
                  <div style={{ color: '#aaa', fontSize: '0.9rem' }}>({filme.votos} votos)</div>
                  <div style={{ color: '#ddd', fontSize: '0.9rem' }}>Ano: {filme.lancamento}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  {filme.generos.map((genero, idx) => (
                    <span key={idx} style={{ 
                      background: 'rgba(76, 201, 240, 0.2)', 
                      padding: '0.3rem 0.8rem', 
                      borderRadius: '20px', 
                      fontSize: '0.9rem'
                    }}>{genero}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div style={{ padding: '0 3rem 3rem 3rem' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr', 
              gap: '2rem', 
              marginBottom: '2rem'
            }}>
              {/* Informações do filme */}
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4cc9f0' }}>Sinopse</h2>
                <p style={{ lineHeight: '1.6', marginBottom: '2rem' }}>{filme.sinopse}</p>
                
                {/* Seção de gênero */}
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4cc9f0' }}>Gênero</h2>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                  {filme.generos.map((genero, idx) => (
                    <span key={idx} style={{ 
                      background: 'rgba(76, 201, 240, 0.2)', 
                      padding: '0.5rem 1rem', 
                      borderRadius: '20px', 
                      fontSize: '1rem'
                    }}>{genero}</span>
                  ))}
                </div>
                
                {/* Avaliação */}
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4cc9f0' }}>Avaliação</h2>
                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    color: '#f0d744', 
                    fontSize: '2rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    background: 'rgba(240, 215, 68, 0.1)',
                    padding: '0.5rem 1rem',
                    borderRadius: '10px'
                  }}>
                    <span>★</span>
                    <span>{filme.avaliacao}</span>
                  </div>
                  <div style={{ color: '#ddd', fontSize: '1rem' }}>{filme.votos} avaliações</div>
                </div>
                
                {/* Ano de lançamento */}
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4cc9f0' }}>Ano de Lançamento</h2>
                <p style={{ marginBottom: '2rem' }}>{filme.lancamento}</p>
                
                {/* Botão para voltar */}
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <button 
                    onClick={() => window.history.back()}
                    style={{
                      background: '#4cc9f0',
                      border: 'none',
                      padding: '0.8rem 1.5rem',
                      borderRadius: '30px',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      marginTop: '1.5rem'
                    }}
                  >
                    Voltar para a lista de filmes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Componente de alerta de conexão */}
      <AlertaWrapper />
      
      {/* Componente de configuração da API */}
      <ConfiguracaoApi />
    </div>
  );
}