import styles from './favoritos.module.css';

export default function Favoritos() {
  return (
    <div className={styles.favoritosContainer}>
      <h1 className={styles.title}>Meus Favoritos</h1>
      {/* Lista de favoritos */}
      <div className={styles.lista}>Lista de favoritos em breve...</div>
    </div>
  );
}
