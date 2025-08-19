import { useEffect, useState } from 'react';

import { noop } from '@alfalab/core-components-shared';

const MAX_PERSENT_VALUE = 100;

function makeTitle(time: number) {
    return `${Math.trunc(time / 60)}:${`${time % 60}`.padStart(2, '0')}`;
}

export function useTimer(
    time: number,
    active = true,
    counting: 'forward' | 'backward',
    onFinish: () => void,
    interval = 1000,
    step = 1,
): [value: number, title: string] {
    const [passedTime, setPassedTime] = useState(0);
    const isCompleted = passedTime === time;
    const persentValue = Math.trunc((passedTime / time) * MAX_PERSENT_VALUE);

    useEffect(() => {
        if (!active || isCompleted) {
            if (isCompleted) {
                onFinish();
            }

            return noop;
        }

        const timer = setInterval(() => {
            setPassedTime((prevPassed) => prevPassed + step);
        }, interval);

        return () => clearInterval(timer);
    }, [interval, isCompleted, active, step, onFinish]);

    return [persentValue, makeTitle(counting === 'backward' ? time - passedTime : passedTime)];
}
