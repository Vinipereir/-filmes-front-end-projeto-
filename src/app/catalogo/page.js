import styles from './catalogo.module.css';

export default function Catalogo() {
  return (
    <div className={styles.catalogoContainer}>
      <h1 className={styles.title}>Catálogo de Filmes e Séries</h1>
      {/* Filtros e busca */}
      <div className={styles.filtros}>Filtros e busca em breve...</div>
      {/* Lista de filmes/séries */}
      <div className={styles.lista}>Lista em breve...</div>
    </div>
  );
}
