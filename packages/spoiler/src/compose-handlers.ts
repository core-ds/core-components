import { type SyntheticEvent } from 'react';

/** Выполняет внутренний обработчик, если потребитель не отменил событие. */
export const composeHandlers =
    <Event extends SyntheticEvent>(
        user: ((event: Event) => void) | undefined,
        own: (event: Event) => void,
    ) =>
    (event: Event) => {
        user?.(event);
        if (!event.defaultPrevented) own(event);
    };
