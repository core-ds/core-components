import React from 'react';
import cn from 'classnames';
import kebab from 'lodash/kebabCase';

import { Typography } from '@balafla/core-components-typography';

import { createComponentUrl } from 'storybook/utils/createComponentUrl';

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

const COMPONENTS_WITH_SAFE_ZONE = ['SidePanel'];

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
        <a href={createComponentUrl(componentName)} className={styles.card}>
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
                                [styles.withSafeZone]:
                                    COMPONENTS_WITH_SAFE_ZONE.includes(componentName),
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
