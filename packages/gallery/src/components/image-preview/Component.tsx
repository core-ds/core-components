import React, { FC, KeyboardEventHandler, useContext, useRef } from 'react';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';

import { GalleryContext } from '../../context';
import { GalleryImage } from '../../types';
import { NoImagePaths } from './paths';

import styles from './index.module.css';

type Props = {
    image: GalleryImage;
    index: number;
    active?: boolean;
    onSelect: (index: number) => void;
    className: string;
};

export const ImagePreview: FC<Props> = ({ image, active = false, index, onSelect, className }) => {
    const { imagesMeta } = useContext(GalleryContext);

    const ref = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        onSelect(index);
    };

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (event.key === 'Enter') {
            onSelect(index);
        }
    };

    const [focused] = useFocus(ref, 'keyboard');

    const meta = imagesMeta[index];

    const isBroken = Boolean(meta?.broken);

    return (
        <div
            className={cn(
                styles.component,
                { [styles.active]: active, [styles.focused]: focused },
                className,
            )}
            onClick={handleClick}
            role='button'
            onKeyDown={handleKeyDown}
            tabIndex={0}
            ref={ref}
            aria-label={`Перейти к изображению ${index + 1}`}
        >
            {isBroken ? (
                <div className={cn(styles.preview, styles.brokenImageWrapper)}>
                    <div className={styles.brokenIcon}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='40'
                            height='40'
                            viewBox='0 0 40 40'
                            fill='none'
                        >
                            <rect width='40' height='40' fill='none' />
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d={NoImagePaths.baseImage}
                                fill='#DBDEE1'
                            />
                            <path d={NoImagePaths.triangleImage} fill='#DBDEE1' />
                        </svg>
                    </div>
                </div>
            ) : (
                <div
                    className={cn(styles.preview, styles.image, {
                        [styles.broken]: isBroken,
                        [styles.loading]: !meta,
                    })}
                    style={{ backgroundImage: `url(${image.src})` }}
                />
            )}
        </div>
    );
};
