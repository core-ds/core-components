import { useReducer } from 'react';

import { type AnimationDirection, type LottieProps } from '@alfalab/core-components-lottie/types';

const reducer = (direction: AnimationDirection) => (direction * -1) as AnimationDirection;

export const useBounce = (
    initialDirection: AnimationDirection,
): Pick<LottieProps, 'direction' | 'onIterationChange'> => {
    const [direction, onIterationChange] = useReducer(reducer, initialDirection);

    return { direction, onIterationChange };
};
