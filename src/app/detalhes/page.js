import styles from './detalhes.module.css';

export default function Detalhes() {
  // Dados fictícios de um filme de exemplo
  const filme = {
    titulo: "Inception",
    tituloOriginal: "Inception",
    lancamento: "16 Jul 2010",
    duracao: "2h 28m",
    generos: ["Ação", "Aventura", "Ficção Científica"],
    sinopse: "Dom Cobb é um ladrão com a rara habilidade de roubar segredos do inconsciente durante o estado de sono. Isso faz dele um fugitivo no mundo da espionagem corporativa. Cobb tem a chance de se redimir quando recebe uma tarefa final: realizar o inverso, plantar uma ideia na mente de alguém. Se tiver sucesso, será o crime perfeito, mas um inimigo tenta antecipar seus movimentos.",
    diretor: "Christopher Nolan",
    imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    backdrop: "https://www.themoviedb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    avaliacao: 4.7,
    votos: 22834,
    elenco: [
      { nome: "Leonardo DiCaprio", personagem: "Dom Cobb", foto: "https://www.themoviedb.org/t/p/w138_and_h175_face/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg" },
      { nome: "Joseph Gordon-Levitt", personagem: "Arthur", foto: "https://www.themoviedb.org/t/p/w138_and_h175_face/4U9G4YwTlIEbAymBaseltS38eH4.jpg" },
      { nome: "Elliot Page", personagem: "Ariadne", foto: "https://www.themoviedb.org/t/p/w138_and_h175_face/wGJZP6rKJ8i9L0cawxFMcRQjTBn.jpg" },
      { nome: "Tom Hardy", personagem: "Eames", foto: "https://www.themoviedb.org/t/p/w138_and_h175_face/4CR1D9VLWJrbYDzs5pj2ZyTxKgr.jpg" }
    ],
    comentarios: [
      { usuario: "FilmeFan123", texto: "Um dos melhores filmes que já vi! A direção do Nolan é impecável e o roteiro é complexo sem ser confuso.", avaliacao: 5, data: "12/08/2023" },
      { usuario: "CinemaPro", texto: "Cinematografia incrível e atuações de primeira. O final deixa você pensando por dias.", avaliacao: 4.5, data: "05/03/2023" },
      { usuario: "MariaFilmes", texto: "Assisti pela terceira vez e ainda encontro detalhes novos. Obra-prima!", avaliacao: 5, data: "22/01/2023" }
    ]
  };

  return (
    <div style={{ 
      fontFamily: 'Poppins, sans-serif', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', 
      color: '#fff', 
      padding: '0', 
      margin: '0'
    }}>
      {/* Banner do filme */}
      <div style={{ 
        position: 'relative', 
        height: '450px', 
        width: '100%', 
        overflow: 'hidden',
        marginBottom: '2rem'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${filme.backdrop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)'
        }}></div>
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
          <img 
            src={filme.imagem} 
            alt={filme.titulo} 
            style={{
              width: '180px',
              height: '270px',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)'
            }} 
          />
          <div>
            <h1 style={{ fontSize: '3rem', margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{filme.titulo}</h1>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
              <div style={{ color: '#f0d744', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>★</span>
                <span>{filme.avaliacao}</span>
              </div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>({filme.votos} votos)</div>
              <div style={{ color: '#ddd', fontSize: '0.9rem' }}>{filme.lancamento}</div>
              <div style={{ color: '#ddd', fontSize: '0.9rem' }}>{filme.duracao}</div>
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
          gridTemplateColumns: '2fr 1fr', 
          gap: '2rem', 
          marginBottom: '2rem'
        }}>
          {/* Coluna esquerda */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4cc9f0' }}>Sinopse</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '2rem' }}>{filme.sinopse}</p>
            
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4cc9f0' }}>Diretor</h2>
            <p style={{ marginBottom: '2rem' }}>{filme.diretor}</p>
            
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4cc9f0' }}>Elenco Principal</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {filme.elenco.map((ator, idx) => (
                <div key={idx} style={{ 
                  background: 'rgba(30, 30, 50, 0.5)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                }}>
                  <img 
                    src={ator.foto} 
                    alt={ator.nome} 
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                  />
                  <div style={{ padding: '0.7rem' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{ator.nome}</div>
                    <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{ator.personagem}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Coluna direita */}
          <div>
            <div style={{ 
              background: 'rgba(30, 30, 50, 0.5)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
            }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4cc9f0' }}>Sua Avaliação</h2>
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                fontSize: '2rem', 
                color: '#aaa',
                marginBottom: '1.5rem'
              }}>
                {"★★★★★".split("").map((star, idx) => (
                  <span key={idx} style={{ cursor: 'pointer' }}>★</span>
                ))}
              </div>
              <textarea 
                placeholder="Deixe seu comentário sobre o filme..."
                style={{
                  width: '100%',
                  height: '100px',
                  padding: '1rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  resize: 'none',
                  color: '#fff',
                  marginBottom: '1rem'
                }}
              ></textarea>
              <button style={{
                background: '#4cc9f0',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '30px',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%'
              }}>Enviar Avaliação</button>
            </div>
          </div>
        </div>
        
        {/* Comentários */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#4cc9f0' }}>Comentários da Comunidade</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filme.comentarios.map((comentario, idx) => (
              <div key={idx} style={{ 
                background: 'rgba(30, 30, 50, 0.5)',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                  <div style={{ fontWeight: 'bold' }}>{comentario.usuario}</div>
                  <div style={{ color: '#aaa', fontSize: '0.9rem' }}>{comentario.data}</div>
                </div>
                <div style={{ 
                  color: '#f0d744', 
                  fontSize: '0.9rem', 
                  marginBottom: '0.8rem' 
                }}>{"★".repeat(Math.floor(comentario.avaliacao))}{comentario.avaliacao % 1 === 0.5 ? "½" : ""}</div>
                <p style={{ lineHeight: '1.5' }}>{comentario.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
