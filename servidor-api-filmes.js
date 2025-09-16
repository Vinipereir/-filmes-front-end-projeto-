/**
 * Servidor de API mock para testes
 * Execute com: node servidor-api-filmes.js [porta]
 * A porta padrão é 4001 se não especificada
 */

const http = require('http');

// Dados de exemplo
const filmes = [
  { 
    id: 1, 
    titulo: "Vingadores: Ultimato", 
    tituloOriginal: "Avengers: Endgame",
    imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/q6725aR8Zs4IwGMXzZT8aC8lh41.jpg", 
    backdrop: "https://www.themoviedb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    genero: "Ação", 
    generos: ["Ação", "Aventura", "Ficção Científica"],
    ano: 2019, 
    lancamento: "25/04/2019",
    duracao: "181 min",
    sinopse: "Após os eventos devastadores de Vingadores: Guerra Infinita, o universo está em ruínas. Com a ajuda dos aliados restantes, os Vingadores se reúnem mais uma vez para reverter as ações de Thanos e restaurar o equilíbrio do universo.",
    diretor: "Anthony Russo, Joe Russo",
    avaliacao: 4.7,
    reviews: 1845,
    trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    elenco: [
      { nome: "Robert Downey Jr.", personagem: "Tony Stark / Homem de Ferro", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg" },
      { nome: "Chris Evans", personagem: "Steve Rogers / Capitão América", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/3bOGNsHlrswhyW79uvIHH1V43JI.jpg" },
      { nome: "Mark Ruffalo", personagem: "Bruce Banner / Hulk", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/z3dvKqMNDQWk3QLxzumloQVR0pv.jpg" }
    ],
    comentarios: [
      { usuario: "MarvelFan2000", data: "12/05/2019", texto: "Melhor filme da Marvel até hoje!", avaliacao: 5 },
      { usuario: "CinemaLover", data: "30/04/2019", texto: "Um final épico para a saga do infinito.", avaliacao: 4.5 }
    ]
  },
  { 
    id: 2, 
    titulo: "Pantera Negra", 
    tituloOriginal: "Black Panther",
    imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8TjvIO4JThs3MnORC0vansbZ04B.jpg", 
    backdrop: "https://www.themoviedb.org/t/p/original/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg",
    genero: "Ação", 
    generos: ["Ação", "Aventura", "Ficção Científica"],
    ano: 2018, 
    lancamento: "15/02/2018",
    duracao: "134 min",
    sinopse: "Após a morte do rei T'Chaka, T'Challa retorna a Wakanda para assumir seu lugar no trono. No entanto, quando um velho inimigo reaparece, o rei de Wakanda é testado quando é atraído para um conflito que coloca o destino de Wakanda e do mundo inteiro em risco.",
    diretor: "Ryan Coogler",
    avaliacao: 4.6,
    reviews: 1523,
    trailer: "https://www.youtube.com/watch?v=xjDjIWPwcPU",
    elenco: [
      { nome: "Chadwick Boseman", personagem: "T'Challa / Pantera Negra", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/mXxiOTrTMJBRSVRfgaQlaJjgsxX.jpg" },
      { nome: "Michael B. Jordan", personagem: "Erik Killmonger", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/kfcn0yyEdN2aJfVaxW0NIoKVF4J.jpg" },
      { nome: "Lupita Nyong'o", personagem: "Nakia", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/y40Cl0L1TRqJCYB3AttlFxyHiGp.jpg" }
    ],
    comentarios: [
      { usuario: "Wakanda4Ever", data: "20/02/2018", texto: "Wakanda para sempre! Filme revolucionário.", avaliacao: 5 },
      { usuario: "FilmCritic", data: "16/02/2018", texto: "Relevante cultural e politicamente, além de ser muito divertido.", avaliacao: 4.5 }
    ]
  },
  { 
    id: 3, 
    titulo: "A Forma da Água", 
    tituloOriginal: "The Shape of Water",
    imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hB6I5rZbgRGpKQhS6AlX4UUJQYU.jpg", 
    backdrop: "https://www.themoviedb.org/t/p/original/iNUuGUIHeeGsvOxo8DpUIQCO6LA.jpg",
    genero: "Romance", 
    generos: ["Romance", "Fantasia", "Drama"],
    ano: 2017, 
    lancamento: "22/02/2018",
    duracao: "123 min",
    sinopse: "Em um laboratório de alta segurança do governo durante a Guerra Fria, uma zeladora solitária forma um relacionamento único com uma criatura anfíbia que está sendo mantida em cativeiro.",
    diretor: "Guillermo del Toro",
    avaliacao: 4.3,
    reviews: 987,
    trailer: "https://www.youtube.com/watch?v=XFYWazblaUA",
    elenco: [
      { nome: "Sally Hawkins", personagem: "Elisa Esposito", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bSN9SysoKaXObjliA1A4KIEnefm.jpg" },
      { nome: "Doug Jones", personagem: "Criatura Anfíbia", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/2SAYpTF74kbF0LJQyWY6kLGIEbk.jpg" },
      { nome: "Michael Shannon", personagem: "Richard Strickland", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/xGKQMxy94ves8fZC2l1ARGlbfx6.jpg" }
    ],
    comentarios: [
      { usuario: "FilmeLover", data: "25/02/2018", texto: "Um conto de fadas moderno e belíssimo!", avaliacao: 4.5 },
      { usuario: "CineArt", data: "23/02/2018", texto: "Guillermo del Toro no seu melhor. Cinematografia deslumbrante.", avaliacao: 5 }
    ]
  },
  { 
    id: 4, 
    titulo: "Coringa", 
    tituloOriginal: "Joker",
    imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xLxgVxFWvb9hhUyCDDXxRPPnFck.jpg", 
    backdrop: "https://www.themoviedb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
    genero: "Drama", 
    generos: ["Drama", "Thriller", "Crime"],
    ano: 2019, 
    lancamento: "03/10/2019",
    duracao: "122 min",
    sinopse: "Arthur Fleck trabalha como palhaço e luta para encontrar seu caminho na sociedade fraturada de Gotham. Isolado, intimidado e desconsiderado, Fleck começa uma descida lenta ao abismo da loucura à medida que se transforma no infame criminoso Coringa.",
    diretor: "Todd Phillips",
    avaliacao: 4.5,
    reviews: 1738,
    trailer: "https://www.youtube.com/watch?v=t433PEQGErc",
    elenco: [
      { nome: "Joaquin Phoenix", personagem: "Arthur Fleck / Coringa", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/5hpkgozn38qqZ7M0F1jsagf5I1F.jpg" },
      { nome: "Robert De Niro", personagem: "Murray Franklin", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg" },
      { nome: "Zazie Beetz", personagem: "Sophie Dumond", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/sgxzT54GnvgeMnOZgpQQx9csWiR.jpg" }
    ],
    comentarios: [
      { usuario: "DCFanatic", data: "04/10/2019", texto: "Joaquin Phoenix merece todos os prêmios por essa atuação!", avaliacao: 5 },
      { usuario: "MovieBuff", data: "05/10/2019", texto: "Perturbador e brilhante ao mesmo tempo.", avaliacao: 4.5 }
    ]
  },
  { 
    id: 5, 
    titulo: "Divertida Mente", 
    tituloOriginal: "Inside Out",
    imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2AfHbQP5RqLguzuhtXKbGc7YOwH.jpg", 
    backdrop: "https://www.themoviedb.org/t/p/original/iQfddK8oXjv63jOHRVQbZkJaGd8.jpg",
    genero: "Animação", 
    generos: ["Animação", "Família", "Comédia"],
    ano: 2015, 
    lancamento: "18/06/2015",
    duracao: "95 min",
    sinopse: "Riley é uma garota que é tirada da vida no Centro-Oeste quando seu pai consegue um novo emprego em São Francisco. Guiada por suas emoções - Alegria, Medo, Raiva, Nojinho e Tristeza - ela tenta se adaptar à sua nova vida.",
    diretor: "Pete Docter",
    avaliacao: 4.8,
    reviews: 1654,
    trailer: "https://www.youtube.com/watch?v=yRUAzGQ3nSY",
    elenco: [
      { nome: "Amy Poehler", personagem: "Alegria (voz)", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/rWY8M5u8fBPimVQ3kgGfZJcjQDX.jpg" },
      { nome: "Phyllis Smith", personagem: "Tristeza (voz)", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/nJTe6UjHs4bPQQYnHs1N1VatBTi.jpg" },
      { nome: "Bill Hader", personagem: "Medo (voz)", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/9vKq2y2NoZRjhkT8FnyCzkLbmGK.jpg" }
    ],
    comentarios: [
      { usuario: "PixarFan", data: "20/06/2015", texto: "Um dos melhores filmes da Pixar! Emocionante e profundo.", avaliacao: 5 },
      { usuario: "AnimationLover", data: "19/06/2015", texto: "Criativo, divertido e com mensagens importantes sobre emoções.", avaliacao: 4.5 }
    ]
  },
  { 
    id: 6, 
    titulo: "Parasita", 
    tituloOriginal: "기생충 (Gisaengchung)",
    imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg", 
    backdrop: "https://www.themoviedb.org/t/p/original/ApiBzeaa95TNYliSbQ8pJv4Fje7.jpg",
    genero: "Drama", 
    generos: ["Drama", "Comédia", "Thriller"],
    ano: 2019, 
    lancamento: "07/11/2019",
    duracao: "132 min",
    sinopse: "A família Ki-taek, todos desempregados, se interessa particularmente pelo estilo de vida da rica família Park. Um dia, o filho deles consegue ser recomendado para dar aulas particulares de inglês na casa dos Park, e é assim que as duas famílias se conhecem.",
    diretor: "Bong Joon-ho",
    avaliacao: 4.7,
    reviews: 1512,
    trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
    elenco: [
      { nome: "Song Kang-ho", personagem: "Kim Ki-taek", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/b9YT39quSsGJvWYqTsG7MTYm0CG.jpg" },
      { nome: "Lee Sun-kyun", personagem: "Park Dong-ik", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/73yOFgkzj3k7fNqQAiEGt6W6Tah.jpg" },
      { nome: "Cho Yeo-jeong", personagem: "Park Yeon-kyo", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/dE98EZBvuRXdegQWT9kYe7EJRie.jpg" }
    ],
    comentarios: [
      { usuario: "CineInternacional", data: "10/11/2019", texto: "Um filme que merece todos os prêmios que ganhou. Obra-prima!", avaliacao: 5 },
      { usuario: "FilmeCritico", data: "08/11/2019", texto: "Incrível mistura de gêneros com uma crítica social poderosa.", avaliacao: 5 }
    ]
  },
  { 
    id: 7, 
    titulo: "O Rei Leão", 
    tituloOriginal: "The Lion King",
    imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8aIvm8OaJISOpVTt7rMIj792XLZ.jpg", 
    backdrop: "https://www.themoviedb.org/t/p/original/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg",
    genero: "Animação", 
    generos: ["Animação", "Aventura", "Família"],
    ano: 2019, 
    lancamento: "18/07/2019",
    duracao: "118 min",
    sinopse: "Simba idolatra seu pai, o rei Mufasa, e leva a sério seu próprio destino real. Mas nem todos no reino celebram a chegada do novo filhote. Scar, o irmão de Mufasa - e ex-herdeiro do trono - tem planos próprios.",
    diretor: "Jon Favreau",
    avaliacao: 4.4,
    reviews: 1347,
    trailer: "https://www.youtube.com/watch?v=7TavVZMewpY",
    elenco: [
      { nome: "Donald Glover", personagem: "Simba (voz)", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/qzdiC1s6GxLZs6t9iO7Y8q6KSyF.jpg" },
      { nome: "Beyoncé Knowles", personagem: "Nala (voz)", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/rF0Lb6SBhGSTvjRffmlKRSeI3jE.jpg" },
      { nome: "James Earl Jones", personagem: "Mufasa (voz)", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/dpxRFaQ7OoxzF3vAG5QXYqZfL7g.jpg" }
    ],
    comentarios: [
      { usuario: "DisneyFan", data: "20/07/2019", texto: "Visualmente impressionante, mas senti falta da emoção do original.", avaliacao: 4 },
      { usuario: "LionKingLover", data: "19/07/2019", texto: "Uma recriação incrível de um clássico amado.", avaliacao: 4.5 }
    ]
  },
  { 
    id: 8, 
    titulo: "Interestelar", 
    tituloOriginal: "Interstellar",
    imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg", 
    backdrop: "https://www.themoviedb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    genero: "Ficção Científica", 
    generos: ["Ficção Científica", "Aventura", "Drama"],
    ano: 2014, 
    lancamento: "06/11/2014",
    duracao: "169 min",
    sinopse: "Quando a Terra está se tornando inabitável, um grupo de exploradores assume a missão mais importante da história da humanidade: viajar além da nossa galáxia para descobrir se a humanidade tem um futuro entre as estrelas.",
    diretor: "Christopher Nolan",
    avaliacao: 4.8,
    reviews: 1823,
    trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    elenco: [
      { nome: "Matthew McConaughey", personagem: "Joseph Cooper", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/e9ZHRY5toiL8EQ1RFfKMKXdvzad.jpg" },
      { nome: "Anne Hathaway", personagem: "Dr. Amelia Brand", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/4Nh1zDDrV8ZrhmKCdDcFB8iZ8Ks.jpg" },
      { nome: "Jessica Chastain", personagem: "Murphy Cooper (adulta)", foto: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/lodMzLKSdrPcBry6TdoDsMN3Vge.jpg" }
    ],
    comentarios: [
      { usuario: "SciFiFan", data: "10/11/2014", texto: "Uma obra-prima visual e emocional. Nolan no seu auge!", avaliacao: 5 },
      { usuario: "FilmBuff", data: "07/11/2014", texto: "Ambicioso, épico e fascinante. Um filme que transcende o gênero de ficção científica.", avaliacao: 4.5 }
    ]
  },
  { 
    id: 9, 
    titulo: "Corra!", 
    imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/A0RoSZh8PEYJgDMgM2EV7Ycz3dR.jpg", 
    genero: "Terror", 
    ano: 2017, 
    sinopse: "Chris vai conhecer os pais de Rose, sua namorada, pela primeira vez. À medida que o fim de semana avança, uma série de descobertas cada vez mais perturbadoras o levam a descobrir que a família de sua namorada esconde um segredo terrível.",
    avaliacao: 4.6,
    reviews: 1322
  },
  { 
    id: 10, 
    titulo: "A Grande Aposta", 
    imagem: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5eAc07fXU0uLVSMYJ4weuHvBwZK.jpg", 
    genero: "Comédia", 
    ano: 2015, 
    sinopse: "Quatro estranhos no mundo das altas finanças preveem a crise de crédito e habitação do meio da década de 2000 e decidem enfrentar os grandes bancos pelo direito de ganhar dinheiro.",
    avaliacao: 4.2,
    reviews: 876
  }
];

// Configuração do servidor
const PORTA = process.argv[2] || 4001;

const servidor = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Configurar CORS para permitir requisições de qualquer origem
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Para requisições OPTIONS (pré-voo CORS)
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Definir o tipo de conteúdo como JSON
  res.setHeader('Content-Type', 'application/json');

  // Rota para listar todos os filmes
  if (req.url === '/movies' || req.url === '/movies/') {
    console.log('Enviando lista de filmes...');
    res.writeHead(200);
    res.end(JSON.stringify(filmes));
    return;
  }

  // Rota para obter um filme específico por ID
  const matchFilmeId = req.url.match(/^\/movies\/(\d+)$/);
  if (matchFilmeId) {
    const id = parseInt(matchFilmeId[1]);
    const filme = filmes.find(f => f.id === id);
    
    if (filme) {
      console.log(`Enviando filme com ID ${id}`);
      res.writeHead(200);
      res.end(JSON.stringify(filme));
    } else {
      console.log(`Filme com ID ${id} não encontrado`);
      res.writeHead(404);
      res.end(JSON.stringify({ erro: 'Filme não encontrado' }));
    }
    return;
  }

  // Rota para obter filmes por gênero
  const matchGenero = req.url.match(/^\/movies\/genero\/(.+)$/);
  if (matchGenero) {
    const genero = decodeURIComponent(matchGenero[1]);
    const filmesFiltrados = filmes.filter(f => f.genero.toLowerCase() === genero.toLowerCase());
    
    console.log(`Buscando filmes do gênero: ${genero}`);
    res.writeHead(200);
    res.end(JSON.stringify(filmesFiltrados));
    return;
  }

  // Rota não encontrada
  console.log(`Rota não encontrada: ${req.url}`);
  res.writeHead(404);
  res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
});

servidor.listen(PORTA, () => {
  console.log(`Servidor de API de filmes rodando em http://localhost:${PORTA}`);
  console.log('Rotas disponíveis:');
  console.log(`  http://localhost:${PORTA}/movies`);
  console.log(`  http://localhost:${PORTA}/movies/:id`);
  console.log(`  http://localhost:${PORTA}/movies/genero/:genero`);
  console.log('\nPara encerrar o servidor, pressione Ctrl+C');
});