import React from 'react';
import { ArrowRightMIcon } from '@alfalab/icons-glyph/ArrowRightMIcon';

import styles from './index.module.css';

type Props = {
    title: string;
    description: string;
    link: string;
};

export const Plate = ({ title, description, link }: Props) => {
    return (
        <a className={styles.plate} href={link}>
            <div className={styles.titleWrapper}>
                <span className={styles.title}>{title}</span>

                <ArrowRightMIcon />
            </div>
            <div className={styles.description}>{description}</div>
        </a>
    );
};
