import React, { type ChangeEvent } from 'react';

import styles from './index.module.css';

type VideoSliderProps = {
    min?: number;
    max: number;
    value: number;
    buffer?: number;
    disabled?: boolean;
    onStart?: () => void;
    onCommit?: () => void;
    onInput?: (value: number) => void;
};

export const CustomSlider: React.FC<VideoSliderProps> = ({
    min = 0,
    max,
    value,
    buffer = 0,
    disabled,
    onCommit,
    onInput,
    onStart,
}) => {
    const handleCommit = () => {
        onCommit?.();
    };

    const handleStartInternal = () => {
        onStart?.();
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);

        onInput?.(newValue);
    };

    const bufferPercent = Math.min(100, (buffer / max) * 100);
    const valuePercent = Math.min(100, (value / max) * 100);

    return (
        <div className={styles.wrapper}>
            <div className={styles.buffer} style={{ width: `${bufferPercent}%` }} />
            <div className={styles.progress} style={{ width: `${valuePercent}%` }} />
            <input
                type='range'
                step={0.01}
                min={min}
                max={max}
                value={value}
                disabled={disabled}
                className={styles.slider}
                onChange={handleInput}
                onMouseDown={handleStartInternal}
                onTouchStart={handleStartInternal}
                onMouseUp={handleCommit}
                onTouchEnd={handleCommit}
            />
        </div>
    );
};
