/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';

import { Text } from '@alfalab/core-components-typography';
import { speeds } from '@alfalab/core-components-video/constants';
import { VideoContext } from '@alfalab/core-components-video/context';
import { CheckmarkCompactMIcon } from '@alfalab/icons-glyph/CheckmarkCompactMIcon';

import styles from './index.module.css';

export const ChooseSpeed = () => {
    const { playbackRate, setPlaybackRate } = useContext(VideoContext);

    return (
        <div
            className={styles.speed}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            {speeds.map((el, index) => (
                <div
                    key={el}
                    className={styles.speedElement}
                    onClick={() => {
                        setPlaybackRate(index);
                    }}
                >
                    <Text view='component' color='primary-inverted'>
                        {el === 1 ? 'обычная' : `${el}x`}
                    </Text>

                    {index === playbackRate && <CheckmarkCompactMIcon color='white' />}
                </div>
            ))}
        </div>
    );
};
