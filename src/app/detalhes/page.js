 'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './detalhes.module.css';
import AlertaWrapper from '../../components/AlertaWrapper';
import ConfiguracaoApi from '../../components/ConfiguracaoApi';
import MovieImage from '../../components/MovieImage';
import BackdropImage from '../../components/BackdropImage';
import Footer from '../../components/Footer';

// Retorna a base da API: localStorage > env > fallback
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('apiBaseUrl');
    if (saved) return saved;
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4001';
};

function getImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) return path;
  const base = getBaseUrl();
  return `${base.replace(/\/+$/,'')}/${path.replace(/^\/+/, '')}`;
}

export default function Detalhes() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [filme, setFilme] = useState({
    titulo: 'Carregando...',
    tituloOriginal: '',
    lancamento: '',
    duracao: '',
    generos: [],
    sinopse: 'Carregando informações do filme...',
    diretor: '',
    imagem: 'https://via.placeholder.com/200x300?text=Carregando',
    backdrop: 'https://via.placeholder.com/1920x1080?text=Carregando',
    avaliacao: 0,
    votos: 0,
    elenco: [],
    comentarios: []
  });

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [isFavorito, setIsFavorito] = useState(false);
  const [minhaAvaliacao, setMinhaAvaliacao] = useState(0);
  const [avaliacaoHover, setAvaliacaoHover] = useState(0);

  useEffect(() => {
    if (filme.titulo !== 'Carregando...' && typeof window !== 'undefined') {
      const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
      setIsFavorito(favoritos.some(f => f.id === id));
      const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]');
      const av = avaliacoes.find(a => a.filmeId === id);
      if (av) setMinhaAvaliacao(av.nota || 0);
    }
  }, [filme, id]);

  const salvarAvaliacao = (nota) => {
    if (typeof window === 'undefined') return;
    let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]');
    avaliacoes = avaliacoes.filter(a => a.filmeId !== id);
    avaliacoes.push({ filmeId: id, titulo: filme.titulo, imagem: filme.imagem, nota, data: new Date().toISOString(), generos: filme.generos });
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
    setMinhaAvaliacao(nota);
  };

  const toggleFavorito = () => {
    if (typeof window === 'undefined') return;
    let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    if (isFavorito) {
      favoritos = favoritos.filter(f => f.id !== id);
      setIsFavorito(false);
    } else {
      favoritos.push({ id, titulo: filme.titulo, imagem: filme.imagem, avaliacao: filme.avaliacao, lancamento: filme.lancamento, generos: filme.generos });
      setIsFavorito(true);
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  };

  useEffect(() => {
    const buscarDetalhesFilme = async () => {
      if (!id) {
        setErro('ID do filme não especificado');
        setCarregando(false);
        return;
      }
      try {
        setCarregando(true);
        const base = getBaseUrl();
        const res = await fetch(`${base.replace(/\/+$/,'')}/movies/${id}`);
        if (!res.ok) throw new Error('Erro na resposta da API');
        const data = await res.json();
        if (!data) throw new Error('Resposta inválida do servidor');
        const f = data;
        setFilme({
          titulo: f.title || f.titulo || 'Título não disponível',
          tituloOriginal: f.tituloOriginal || f.title || f.titulo || '',
          lancamento: f.releaseDate ? new Date(f.releaseDate).getFullYear().toString() : f.ano?.toString() || '',
          duracao: f.duracao || '120 min',
          generos: f.generos || (f.genre ? [f.genre] : [f.genero]).filter(Boolean),
          sinopse: f.synopsis || f.sinopse || 'Sinopse não disponível',
          diretor: f.diretor || 'Não informado',
          imagem: getImageUrl(f.imageUrl || f.imagem || f.poster) || 'https://via.placeholder.com/200x300/1a1a2e/4cc9f0?text=Sem+Imagem',
          backdrop: getImageUrl(f.backdrop || f.backdropUrl || f.imageUrl || f.imagem) || 'https://via.placeholder.com/1920x1080/1a1a2e/4cc9f0?text=Sem+Imagem+de+Fundo',
          avaliacao: f.avaliacao || f.rating || 0,
          votos: f.reviews || f.vote_count || 0,
          elenco: f.elenco || [],
          comentarios: f.comentarios || []
        });
        setErro(null);
      } catch (err) {
        console.error('Erro ao buscar detalhes do filme:', err);
        setErro('Não foi possível carregar as informações do filme. Verifique a conexão com o servidor API.');
      } finally {
        setCarregando(false);
      }
    };
    buscarDetalhesFilme();
  }, [id]);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: '#fff', padding: 0, margin: 0 }}>
      {carregando ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '1.2rem' }}>Carregando informações do filme...</p>
          <p style={{ fontSize: '1rem', marginTop: '1rem', color: '#aaa' }}>ID do filme: {id || 'Não especificado'}</p>
        </div>
      ) : erro ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#ff6b6b' }}>
          <p style={{ fontSize: '1.2rem' }}>{erro}</p>
          <button onClick={() => window.history.back()} style={{ background: '#4cc9f0', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '30px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', marginTop: '1.5rem' }}>Voltar</button>
        </div>
      ) : (
        <>
          <div style={{ position: 'relative', height: 450, width: '100%', overflow: 'hidden', marginBottom: '2rem' }}>
            <BackdropImage src={filme.backdrop} alt={`${filme.titulo} backdrop`} fallbackColor="#1a1a2e" />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'linear-gradient(to top, rgba(26, 26, 46, 1) 0%, rgba(26, 26, 46, 0) 100%)', height: '50%' }} />
            <div style={{ position: 'absolute', bottom: '2rem', left: '3rem', display: 'flex', alignItems: 'flex-end', gap: '2rem' }}>
              <MovieImage src={filme.imagem} alt={filme.titulo} width="180px" height="270px" style={{ borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.5)' }} fallbackTitle={filme.titulo} loading="eager" />
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
                    <span key={idx} style={{ background: 'rgba(76,201,240,0.2)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem' }}>{genero}</span>
                  ))}
                </div>
                <button onClick={toggleFavorito} style={{ background: isFavorito ? '#ff6b6b' : 'rgba(76,201,240,0.2)', border: isFavorito ? '2px solid #ff6b6b' : '2px solid #4cc9f0', padding: '0.8rem 1.5rem', borderRadius: '25px', color: '#fff', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onMouseOver={(e)=>e.currentTarget.style.transform='scale(1.05)'} onMouseOut={(e)=>e.currentTarget.style.transform='scale(1)'}>
                  <span>{isFavorito ? '❤️' : '🤍'}</span>
                  {isFavorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </button>
              </div>
            </div>
          </div>

          <div style={{ padding: '0 3rem 3rem 3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4cc9f0' }}>Sinopse</h2>
                <p style={{ lineHeight: '1.6', marginBottom: '2rem' }}>{filme.sinopse}</p>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4cc9f0' }}>Gênero</h2>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                  {filme.generos.map((genero, idx) => (
                    <span key={idx} style={{ background: 'rgba(76,201,240,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '1rem' }}>{genero}</span>
                  ))}
                </div>

                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: '#f0d744', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(240,215,68,0.1)', padding: '0.5rem 1rem', borderRadius: '10px' }}>
                    <span>★</span>
                    <span>{filme.avaliacao}</span>
                  </div>
                  <div style={{ color: '#ddd', fontSize: '1rem' }}>{filme.votos} avaliações</div>
                </div>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4cc9f0' }}>Sua Avaliação</h2>
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1rem' }}>
                    {[1,2,3,4,5].map((estrela)=> (
                      <button key={estrela} onClick={()=>salvarAvaliacao(estrela)} onMouseEnter={()=>setAvaliacaoHover(estrela)} onMouseLeave={()=>setAvaliacaoHover(0)} style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: (avaliacaoHover||minhaAvaliacao) >= estrela ? '#f0d744' : '#666', transition: 'color 0.2s ease', padding: '0.2rem' }}>
                        ★
                      </button>
                    ))}
                  </div>
                  {minhaAvaliacao > 0 && <p style={{ color: '#4cc9f0', fontSize: '0.9rem' }}>Você avaliou este filme com {minhaAvaliacao} estrela{minhaAvaliacao > 1 ? 's' : ''}</p>}
                </div>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4cc9f0' }}>Ano de Lançamento</h2>
                <p style={{ marginBottom: '2rem' }}>{filme.lancamento}</p>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <button onClick={()=>window.history.back()} style={{ background: '#4cc9f0', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '30px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', marginTop: '1.5rem' }}>Voltar para a lista de filmes</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
      <AlertaWrapper />
      <ConfiguracaoApi />
    </div>
  );
}
