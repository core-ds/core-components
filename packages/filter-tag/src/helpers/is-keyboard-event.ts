import { type KeyboardEvent, type MouseEvent } from 'react';

export const isKeyBoardEvent = (
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
): event is KeyboardEvent<HTMLDivElement> =>
    (event as KeyboardEvent<HTMLDivElement>).key !== undefined;
