import { type SwipeDirections } from 'react-swipeable';
import { type HandledEvents } from 'react-swipeable/es/types';

export type ShouldSkipSwipingParams = {
    deltaY: number;
    startY: number;
    event: HandledEvents;
    dir: SwipeDirections;
};
