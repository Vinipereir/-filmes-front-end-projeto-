# Projeto de Catálogo de Filmes

Este é um projeto front-end para exibição de um catálogo de filmes, desenvolvido com Next.js.

## Executando o Front-end

Para iniciar o servidor de desenvolvimento do front-end:

```bash
npm run dev
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).

## Conectando ao Back-end

Este front-end precisa se conectar a uma API de filmes para funcionar corretamente. Por padrão, o aplicativo tenta conectar a `http://localhost:4001` e outras portas alternativas.

### Servidor de API para testes

Um servidor API simples para testes está incluído no projeto. Para executá-lo:

```bash
# Para executar na porta padrão 4001
node servidor-api-filmes.js

# Ou para executar em uma porta específica
node servidor-api-filmes.js 3001
```

O servidor de testes fornecerá dois endpoints:
- `GET /movies` - Lista todos os filmes
- `GET /movies/:id` - Obtém detalhes de um filme específico

### Configurando a conexão com o Back-end

Se o back-end estiver rodando em um endereço diferente:

1. Clique no ícone ⚙️ no canto inferior direito da aplicação
2. Insira a URL correta do back-end (ex: `http://localhost:3001`)
3. Clique em "Testar Conexão" para verificar
4. Se a conexão for bem-sucedida, clique em "Salvar" para aplicar as alterações

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
