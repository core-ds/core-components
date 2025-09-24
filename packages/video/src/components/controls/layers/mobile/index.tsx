import React, { useCallback, useContext, useRef, useState } from 'react';

import { VideoContext } from '@alfalab/core-components-video/context';

import { BottomControls } from '../common/bottom-controls';
import { MidControls } from '../common/mid-controls';
import { TopControls } from '../common/top-controls';

import styles from './index.module.css';

type Props = {
    videoName?: string;
};

const TIMEOUT = 3000;

export const MobileControlsLayer = ({ videoName }: Props) => {
    const [visible, setVisible] = useState(true);
    const timerRef = useRef<number>();
    const lastTapRef = useRef<number>(0);

    const { skipBackward, skipForward } = useContext(VideoContext);

    const showControls = useCallback(() => {
        setVisible(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => setVisible(false), TIMEOUT);
    }, []);

    const handleTouchStart = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;

        if (target.closest('button, input')) {
            showControls();

            return;
        }

        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;
        const tapX = e.changedTouches[0].clientX;
        const wrapper = e.currentTarget.getBoundingClientRect();
        const isDoubleTap = now - lastTapRef.current < DOUBLE_TAP_DELAY;

        if (isDoubleTap) {
            if (tapX < wrapper.width / 2) {
                skipBackward();
            } else {
                skipForward();
            }
        }

        if (!isDoubleTap && visible) {
            setVisible(false);
            if (timerRef.current) clearTimeout(timerRef.current);
        }

        if (!isDoubleTap && !visible) {
            showControls();
        }

        lastTapRef.current = now;
    };

    return (
        <div
            className={styles.hoverLayer}
            onTouchEnd={handleTouchEnd}
            onTouchStart={handleTouchStart}
        >
            <div
                className={styles.controlsWrapper}
                style={{
                    opacity: visible ? 1 : 0,
                    pointerEvents: visible ? 'auto' : 'none',
                }}
            >
                <TopControls videoName={videoName} />
                <MidControls />
                <BottomControls />
            </div>
        </div>
    );
};
