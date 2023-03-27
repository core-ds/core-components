import React from 'react';
import kebab from 'lodash.kebabcase';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

import styles from './index.module.css';

type CardProps = {
    componentName: string;
    mode: string;
};

enum ImageState {
    INITIAL,
    LOADED,
    ERROR,
}

export const Card: React.FC<CardProps> = ({ componentName, mode }) => {
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
        <a href={createPageUrl(componentName)} className={styles.card}>
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
                            src={createImageUrl(componentName, mode)}
                            alt={componentName}
                            className={cn(styles.image, {
                                [styles.imageHidden]: imageState === ImageState.INITIAL,
                            })}
                            loading='lazy'
                            decoding='async'
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

function createImageUrl(componentName: string, mode: string) {
    return `./images/${kebab(componentName)}-${mode === 'dark' ? 'dark-' : ''}preview-snap.png`;
}

function createPageUrl(componentName: string) {
    const baseUrl = `${window.location.href.split('iframe')[0]}`;

    return `${baseUrl}?path=/docs/${componentName.toLowerCase()}--${kebab(componentName)}`;
}
