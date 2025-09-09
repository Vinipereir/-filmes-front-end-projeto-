import styles from './home.module.css';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Bem-vindo ao Catálogo</h1>
      <p className={styles.subtitle}>Descubra filmes e séries incríveis, avalie e compartilhe com a comunidade!</p>
      {/* Destaques e feed da comunidade */}
      <div className={styles.destaques}>Destaques em breve...</div>
      <div className={styles.feed}>Feed da comunidade em breve...</div>
    </div>
  );
}
