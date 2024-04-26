import { SwipeDirections } from 'react-swipeable';
import { HandledEvents } from 'react-swipeable/es/types';

export type ShouldSkipSwipingParams = {
    deltaY: number;
    startY: number;
    event: HandledEvents;
    dir: SwipeDirections;
};
