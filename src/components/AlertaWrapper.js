'use client';
import dynamic from 'next/dynamic';

// Importar o componente de alerta de conexão de forma dinâmica (só carrega no cliente)
const ConexaoAlerta = dynamic(() => import('../components/ConexaoAlerta'), { ssr: false });

export default function AlertaWrapper() {
  return <ConexaoAlerta />;
}