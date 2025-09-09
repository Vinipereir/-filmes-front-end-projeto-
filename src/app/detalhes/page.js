import styles from './detalhes.module.css';

export default function Detalhes() {
  return (
    <div className={styles.detalhesContainer}>
      <h1 className={styles.title}>Detalhes do Filme/Série</h1>
      {/* Sinopse, elenco, avaliações, comentários */}
      <div className={styles.info}>Informações completas em breve...</div>
      <div className={styles.comentarios}>Comentários em breve...</div>
    </div>
  );
}
