import React, { CSSProperties, FC } from 'react';

import { getDataTestId } from '@alfalab/core-components-shared';
import { Text, TitleMobile } from '@alfalab/core-components-typography';

import { SIZES, VIEW_TEXT, VIEW_TITLE } from '../../consts';
import { ComponentSize } from '../../types/component-size';
import { TimerProps } from '../../types/timer-props';
import { TypographyColor } from '../../types/typography-color';

import { useTimer } from './hooks/useTimer';

import styles from './timer.module.css';

type Props = {
    totalSeconds: number;
    counting: TimerProps['counting'];
    size: ComponentSize;
    dataTestId?: string;
    color?: TypographyColor;
    style: CSSProperties;
    updateProgress: (secondsRemaining: number) => void;
};

export const Timer: FC<Props> = (props) => {
    const { totalSeconds, counting, size, dataTestId, color, style, updateProgress } = props;

    const { secondsRemaining } = useTimer({ totalSeconds, onTick: updateProgress });

    const secondsPassed = totalSeconds - secondsRemaining;
    const currentSeconds = counting === 'backward' ? secondsRemaining : secondsPassed;
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = String(currentSeconds % 60).padStart(2, '0');

    const isMobileTitle = SIZES[size] > 64;

    const getTimerText = () => `${minutes}:${seconds}`;

    if (isMobileTitle) {
        return (
            <TitleMobile
                className={styles.text}
                color={color}
                tag='div'
                font='system'
                view={VIEW_TITLE[size]}
                style={style}
                dataTestId={getDataTestId(dataTestId, 'title')}
            >
                {getTimerText()}
            </TitleMobile>
        );
    }

    return (
        <Text
            className={styles.text}
            color={color}
            tag='div'
            weight='bold'
            view={VIEW_TEXT[size]}
            style={style}
            dataTestId={getDataTestId(dataTestId, 'title')}
        >
            {getTimerText()}
        </Text>
    );
};
