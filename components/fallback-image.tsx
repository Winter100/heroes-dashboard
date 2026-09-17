import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface FallbackImageProps extends ImageProps {
  fallbackSrc?: string;
}

export const FallbackImage = ({
  src,
  alt,
  fallbackSrc = '/default.png',
  ...rest
}: FallbackImageProps) => {
  const [imgError, setImgError] = useState<boolean>(false);

  if (!src || src === '' || !src.toString().startsWith('http')) {
    return (
      <div
        className='flex items-center justify-center bg-black/35 text-gray-500 rounded-md'
        style={{
          width: rest.width || '100%',
          height: rest.height || '100%',
          minHeight: '100px',
        }}
      >
        <span className='text-sm font-medium'>No Image</span>
      </div>
    );
  }

  return (
    <Image
      src={imgError ? fallbackSrc : src}
      alt={alt || '이미지'}
      sizes='(max-width: 640px) 100vw, 384px'
      className='object-cover '
      onError={() => {
        setImgError(true);
      }}
      {...rest}
    />
  );
};
