import React, { useState } from 'react';

/**
 * Smart image component that gracefully handles local assets:
 * Displays the image if available, or renders a polished fallback if the file is not yet placed in public/assets/
 */
export default function SafeImage({ src, alt, className = '', fallback = null }) {
  const [hasError, setHasError] = useState(false);

  if (hasError && fallback) {
    return fallback;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      draggable={false}
    />
  );
}
