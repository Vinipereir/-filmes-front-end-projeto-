'use client';
import { useState } from 'react';

export default function BackdropImage({ 
  src, 
  alt, 
  style = {},
  fallbackColor = '#1a1a2e'
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

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'brightness(0.4)',
    backgroundColor: fallbackColor,
    ...style
  };

  if (imageError || !src) {
    return (
      <div style={{
        ...backgroundStyle,
        backgroundColor: fallbackColor,
        backgroundImage: 'none'
      }}></div>
    );
  }

  return (
    <>
      {isLoading && (
        <div style={{
          ...backgroundStyle,
          backgroundColor: fallbackColor,
          backgroundImage: 'none'
        }}></div>
      )}
      <div 
        style={{
          ...backgroundStyle,
          backgroundImage: `url(${src})`,
          display: isLoading ? 'none' : 'block'
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      ></div>
    </>
  );
}