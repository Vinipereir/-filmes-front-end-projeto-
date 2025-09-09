import styles from './perfil.module.css';

export default function Perfil() {
  return (
    <div className={styles.perfilContainer}>
      <h1 className={styles.title}>Meu Perfil</h1>
      {/* Estatísticas, listas personalizadas, configurações */}
      <div className={styles.stats}>Estatísticas em breve...</div>
      <div className={styles.listas}>Listas personalizadas em breve...</div>
      <div className={styles.config}>Configurações em breve...</div>
    </div>
  );
}
