import Image, { ImageProps } from 'next/image';
import { VFC } from 'react';

import styles from './CoverImage.module.css';

export const CoverImage: VFC<
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
        width={680}
        height={510}
        priority={true}
        {...props}
        src={`/images/${props.src}`}
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
