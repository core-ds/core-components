import React from 'react';

import { Text } from '@alfalab/core-components-typography';
import { CheckmarkCompactMIcon } from '@alfalab/icons-glyph/CheckmarkCompactMIcon';

import styles from './index.module.css';

export const Subtitles = () => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
        className={styles.subtitles}
        onClick={(e) => {
            e.stopPropagation();
        }}
    >
        <div className={styles.subtitlesElement}>
            <Text view='component' color='primary-inverted'>
                Выключены
            </Text>

            <CheckmarkCompactMIcon color='white' />
        </div>
        <div className={styles.subtitlesElement}>
            <Text view='component' color='primary-inverted'>
                Включены
            </Text>
        </div>
    </div>
);
