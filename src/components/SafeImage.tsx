import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  fallbackSrc?: string;
  fallbackLabel?: string;
  alt?: string;
  className?: string;
}

/**
 * Resilient Image component that prevents broken image icons caused by
 * third-party hosting failures (such as ImgBB 403 blocks, timeouts, or deletions).
 * It automatically switches to a fallback source or renders an elegant branded fallback.
 */
export default function SafeImage({
  src,
  fallbackSrc,
  fallbackLabel,
  alt = 'Fenster International School',
  className = '',
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);
  const [attemptedFallback, setAttemptedFallback] = useState(false);

  // If the src prop changes externally, reset the error state
  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setAttemptedFallback(false);
  }, [src]);

  const handleError = () => {
    if (!attemptedFallback && fallbackSrc && fallbackSrc !== currentSrc) {
      setAttemptedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    return (
      <div 
        className={`flex items-center justify-center bg-slate-100 text-primary border border-slate-200 select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="text-center p-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mb-2 text-sm">
            FIS
          </div>
          <span className="text-xs font-semibold text-slate-500 line-clamp-1">
            {fallbackLabel || alt}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}
