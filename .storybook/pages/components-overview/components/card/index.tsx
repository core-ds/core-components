import React from 'react';
import kebab from 'lodash.kebabcase';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

import styles from './index.module.css';

type CardProps = {
    componentName: string;
};

enum ImageState {
    INITIAL,
    LOADED,
    ERROR,
}

export const Card: React.FC<CardProps> = ({ componentName }) => {
    const [imageState, setImageState] = React.useState(ImageState.INITIAL);
    const imageRef = React.useRef<HTMLImageElement>(null);

    React.useEffect(() => {
        if (imageRef.current && imageRef.current.complete) {
            setImageState(ImageState.LOADED);
        }
    }, []);

    const handleError = () => setImageState(ImageState.ERROR);

    const handleLoad = () => setImageState(ImageState.LOADED);

    return (
        <a key={componentName} href={createUrl(componentName)} className={styles.card}>
            <figure>
                <div className={styles.imageWrapper}>
                    {imageState === ImageState.ERROR && (
                        <Typography.Text
                            view='primary-small'
                            color='tertiary'
                            className={styles.fallbackText}
                        >
                            {`Компонент\n на фотосессии`}
                        </Typography.Text>
                    )}

                    {imageState !== ImageState.ERROR && (
                        <img
                            ref={imageRef}
                            src={createImageUrl(componentName)}
                            alt={componentName}
                            className={cn(styles.image, {
                                [styles.imageHidden]: imageState === ImageState.INITIAL,
                            })}
                            onError={handleError}
                            onLoad={handleLoad}
                        />
                    )}
                </div>

                <figcaption className={styles.caption}>
                    <Typography.Text view='primary-small'>{componentName}</Typography.Text>
                </figcaption>
            </figure>
        </a>
    );
};

function createImageUrl(componentName: string) {
    return `/images/${kebab(componentName)}_preview_snap.png`;
}

function createUrl(componentName: string) {
    const baseUrl = `${window.location.href.split('iframe')[0]}`;

    return `${baseUrl}?path=/docs/${componentName.toLowerCase()}--${kebab(componentName)}`;
}
