import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get('/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Catálogo de Filmes</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.title} - {movie.genre} ({movie.releaseDate})
          </li>
        ))}
      </ul>
    </div>
  );
}
