import NextImage, { ImageLoader, ImageProps } from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const loader =
  (origin: string): ImageLoader =>
  ({ src, width, quality }) =>
    `https://sharpify.vercel.app/p?src=${origin}${src}&q=${
      quality || 80
    }&w=${width}`;

export const Image = (props: ImageProps) => {
  const [origin, setOrigin] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const customProps = useMemo(() => {
    return process.env.NODE_ENV === 'development'
      ? {
          unoptimized: true,
        }
      : {
          loader: loader(origin),
        };
  }, [origin]);

  return <NextImage {...props} {...customProps} />;
};
