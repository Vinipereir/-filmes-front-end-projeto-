'use client';
import { useState, useEffect } from 'react';

export default function BackdropImage({ 
  src, 
  alt, 
  style = {},
  fallbackColor = '#1a1a2e'
}) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSrc, setLoadedSrc] = useState(null);

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

  // Preload background image using Image() so we can detect load/error
  useEffect(() => {
    let active = true;
    if (!src) {
      setImageError(true);
      setIsLoading(false);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (!active) return;
      setLoadedSrc(src);
      setIsLoading(false);
    };
    img.onerror = () => {
      if (!active) return;
      setImageError(true);
      setIsLoading(false);
    };

    return () => {
      active = false;
    };
  }, [src]);

  const showBackground = !imageError && loadedSrc;

  return (
    <div style={{
      ...backgroundStyle,
      backgroundImage: showBackground ? `url(${loadedSrc})` : 'none'
    }} aria-label={alt}></div>
  );
}