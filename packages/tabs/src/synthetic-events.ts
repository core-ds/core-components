import type React from 'react';

export const createSyntheticEvent = <T extends Element, E extends Event>(
    event: E,
): React.SyntheticEvent<T, E> => {
    let isDefaultPrevented = false;
    let isPropagationStopped = false;
    const preventDefault = () => {
        isDefaultPrevented = true;
        event.preventDefault();
    };
    const stopPropagation = () => {
        isPropagationStopped = true;
        event.stopPropagation();
    };

    return {
        nativeEvent: event,
        currentTarget: event.currentTarget as EventTarget & T,
        target: event.target as EventTarget & T,
        bubbles: event.bubbles,
        cancelable: event.cancelable,
        defaultPrevented: event.defaultPrevented,
        eventPhase: event.eventPhase,
        isTrusted: event.isTrusted,
        preventDefault,
        isDefaultPrevented: () => isDefaultPrevented,
        stopPropagation,
        isPropagationStopped: () => isPropagationStopped,
        persist: () => {},
        timeStamp: event.timeStamp,
        type: event.type,
    };
};

export const createUIEvent = <T extends Element, E extends Event>(
    event: E,
): React.UIEvent<T, E> => ({
    ...createSyntheticEvent(event),
    detail: 0,
    view: {
        styleMedia: {
            type: '',
            matchMedium: () => false,
        },
        document,
    },
});

export const createSyntheticMouseEvent = <T extends Element>(
    event: MouseEvent,
): React.MouseEvent<T, MouseEvent> => ({
    ...createUIEvent<T, MouseEvent>(event),
    altKey: event.altKey,
    button: event.button,
    buttons: event.buttons,
    clientX: event.clientX,
    clientY: event.clientY,
    ctrlKey: event.ctrlKey,
    getModifierState: event.getModifierState,
    metaKey: event.metaKey,
    movementX: event.movementX,
    movementY: event.movementY,
    pageX: event.pageX,
    pageY: event.pageY,
    relatedTarget: event.relatedTarget,
    screenX: event.screenX,
    screenY: event.screenY,
    shiftKey: event.shiftKey,
});
