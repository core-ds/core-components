import React from 'react';

function disableUserInput<T>(disabled = false, event: React.KeyboardEvent<T>) {
    const isCopy = (event.metaKey || event.ctrlKey) && event.key === 'c';
    const isTab = event.key === 'Tab';
    const isArrow = event.key === 'ArrowLeft' || event.key === 'ArrowRight';

    if (disabled && !isCopy && !isTab && !isArrow) {
        event.preventDefault();
    }
}

export const inputUtils = {
    disableUserInput,
};
