import { useEffect, useState } from 'react';

import {
    COUNTER_STEP,
    INTERVAL_STEP,
    MAX_COUNTER_VALUE,
    MIN_COUNTER_VALUE,
} from '../constants/constants';

type Props = {
    totalSeconds: number;
    onTick: (secondsRemaining: number) => void;
};

export const useTimer = (props: Props) => {
    const { totalSeconds, onTick } = props;

    const [secondsRemaining, updateSecondsRemaining] = useState<number>(
        Math.max(MIN_COUNTER_VALUE, Math.min(MAX_COUNTER_VALUE, totalSeconds)), // min 0, max 3599
    );

    useEffect(() => {
        const interval = setInterval(() => {
            if (!secondsRemaining) {
                clearInterval(interval);

                return;
            }

            updateSecondsRemaining((prev) => prev - COUNTER_STEP);
        }, INTERVAL_STEP);

        onTick(secondsRemaining);

        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondsRemaining]);

    return { secondsRemaining };
};
