/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: "C:\\Users\\2TDS2\\Documents\\-filmes-front-end-projeto--1",
  // Desabilitar as regras de ESLint durante o build para evitar problemas com imagens
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configurações de imagem para permitir domínios externos
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;