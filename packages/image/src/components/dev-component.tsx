import React, { useEffect, useState } from 'react';

import { ImageProps } from '../component';

import styles from './index.module.css';

const opimizeImageSizeInKb = 10;

type Props = {
    src: string;
    warning: ImageProps['warning'];
};

const ImageCdnIntegration = ({ src, warning }: Props) => {
    const [notValid, setNotValid] = useState(false);

    useEffect(() => {
        fetch(src)
            .then((response) => response.blob())
            .then((response) => {
                const valid = Number(response.size) / 1000 < opimizeImageSizeInKb;
                console.log('🚀 ~ .then ~ valid:', valid);

                if (!valid) {
                    setNotValid(true);
                }
            });
    }, [src]);

    if (notValid) {
        return (
            <div className={styles.notValid}>
                <b>{warning?.message || 'Изображение слишком большого размера!'}</b> <br />
                <a href={warning?.url}>Документация по исправлению проблемы</a>
            </div>
        );
    }

    return null;
};

export default ImageCdnIntegration;
