# CineMagic — Front-end (Guia rápido)

Este README explica passo a passo como rodar o front-end do projeto CineMagic (Next.js) localmente.

## Pré-requisitos

- Node.js (recomendado 18+)
- npm ou yarn
- Um terminal (no Windows, PowerShell funciona bem)

## 1) Instalação

Na raiz do projeto execute:

```powershell
npm install
```

## 2) Rodar em modo de desenvolvimento

```powershell
npm run dev
```

- A aplicação abrirá em `http://localhost:3000` por padrão.
- Se quiser rodar em outra porta, o Next.js permite escolher quando a porta padrão estiver em uso.

## 3) Servidor de API de teste (incluso)

O repositório contém um servidor simples para testes: `servidor-api-filmes.js`.

Para executá-lo na porta 4001:

```powershell
node servidor-api-filmes.js
```

Ou em outra porta:

```powershell
node servidor-api-filmes.js 3001
```

Endpoints úteis do servidor de teste:

- `GET /movies` — obtém a lista de filmes
- `GET /movies/:id` — detalhes do filme

## 4) Configurar a URL do backend no front

Se o backend (ou servidor de teste) rodar em outra porta/host, abra a aplicação e:

1. Clique no ícone ⚙️ no canto inferior direito
2. Insira a URL do backend (por exemplo `http://localhost:3001`)
3. Clique em "Testar Conexão" e depois em "Salvar"

A URL é salva em `localStorage` sob a chave `apiBaseUrl`.

## 5) Perfil do usuário (localStorage)

- O editor de perfil salva os dados no `localStorage` com a chave `usuarioPerfil` (contendo `nome`, `username`, `bio` e `avatar`).
- Avatares são convertidos para data URL e comprimidos antes de salvar; se a imagem for muito grande pode ocorrer erro de quota.

## 6) Build e execução em produção

```powershell
npm run build
npm run start
```

## 7) Troubleshooting

- Imagens não aparecem: verifique se a API está acessível e se as URLs das imagens são válidas (verifique Network e CORS).
- Perfil não persiste: verifique `localStorage` no DevTools e procure a chave `usuarioPerfil`.
- Erros no build: leia o log do terminal (ex.: problemas de prerender com hooks do cliente como `useSearchParams`).

## 8) Sugestões de melhoria

- Substituir `<img>` por `next/image` para otimizações de performance.
- Salvar avatars em backend/storage (S3) ao invés de `localStorage`.
- Adicionar script `npm run api` para iniciar o servidor de teste automaticamente.

---

Se quiser, eu adapto esse README para incluir comandos específicos do seu ambiente (ex.: `npm run api` no `package.json`) ou criar um `env.example`.
