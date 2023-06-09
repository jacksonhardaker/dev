import Image, { ImageProps } from 'next/image';
import { FC } from 'react';

import styles from './CoverImage.module.css';

export const CoverImage: FC<
  ImageProps & {
    caption?: string;
    src: string;
  }
> = ({ caption, ...props }) => {
  return (
    <figure
      itemProp="image"
      itemScope
      itemType="https://schema.org/ImageObject"
      className={styles.figure}
    >
      <Image
        quality={40}
        priority
        fill
        {...props}
      />
      {props.src && <meta itemProp="url" content={props.src} />}
      {props.width && <meta itemProp="width" content={`${props.width}`} />}
      {props.height && <meta itemProp="height" content={`${props.height}`} />}
      {caption && (
        <figcaption className={styles.figcaption}>{caption}</figcaption>
      )}
    </figure>
  );
};
