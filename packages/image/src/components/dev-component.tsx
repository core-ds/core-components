import React, { useEffect, useState } from 'react';

import styles from './index.module.css';

const opimizeImageSizeInKb = 100;

type Props = {
    src: string;
};

const ImageCdnIntegration = ({ src }: Props) => {
    const [notValid, setNotValid] = useState(false);

    useEffect(() => {
        fetch(src)
            .then((response) => response.blob())
            .then((response) => {
                const valid = Number(response.size) / 1000 < opimizeImageSizeInKb;

                if (!valid) {
                    setNotValid(true);
                }
            });
    }, [src]);

    if (notValid) {
        return (
            <div className={styles.notValid}>
                <b>Изображение слишком большого размера!</b> <br />
                <a href=''>Документация по исправлению проблемы</a>
            </div>
        );
    }

    return null;
};

export default ImageCdnIntegration;
