import React, { useCallback, useContext, useRef, useState } from 'react';

import { VideoContext } from '@alfalab/core-components-video/context';
import { useVideoHotkeys } from '@alfalab/core-components-video/shared/hooks/use-keys';

import { BottomControls } from '../common/bottom-controls';
import { MidControls } from '../common/mid-controls';
import { TopControls } from '../common/top-controls';

import styles from './index.module.css';

type Props = {
    videoName?: string;
};

const TIMEOUT = 3000;

export const DesktopControlsLayer = ({ videoName }: Props) => {
    const [visible, setVisible] = useState(true);
    const timerRef = useRef<number>();

    useVideoHotkeys();
    const { togglePause } = useContext(VideoContext);

    const showControls = useCallback(() => {
        setVisible(true);

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => setVisible(false), TIMEOUT);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;

        if (target.closest('button, input')) return;

        togglePause();
    };

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            className={styles.hoverLayer}
            onClick={handleClick}
            onMouseMove={showControls}
            onMouseEnter={showControls}
        >
            <div
                className={styles.controlsWrapper}
                style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
            >
                <TopControls videoName={videoName} />
                <MidControls />
                <BottomControls />
            </div>
        </div>
    );
};
