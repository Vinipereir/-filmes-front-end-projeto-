'use client';
import { useState } from 'react';

export default function MovieImage({ 
  src, 
  alt, 
  width, 
  height, 
  style = {}, 
  className = '', 
  loading = 'lazy',
  fallbackTitle = 'Sem Imagem'
}) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const fallbackUrl = `https://via.placeholder.com/${width}x${height}/1a1a2e/4cc9f0?text=${encodeURIComponent(fallbackTitle)}`;

  return (
    <div style={{ position: 'relative', width, height, ...style }}>
      {isLoading && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#1a1a2e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4cc9f0',
            fontSize: '0.8rem',
            borderRadius: style.borderRadius || '0px'
          }}
        >
          Carregando...
        </div>
      )}
      <img
        src={imageError ? fallbackUrl : src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          backgroundColor: '#1a1a2e',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 300ms ease',
          ...style
        }}
        className={className}
        loading={loading}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
}