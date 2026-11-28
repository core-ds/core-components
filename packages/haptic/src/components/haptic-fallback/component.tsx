import React, {
    type FC,
    type MouseEventHandler,
    type MutableRefObject,
    type RefObject,
} from 'react';

import styles from './index.module.css';

export interface HapticFallbackProps {
    disabled?: boolean;
    nodeRef?: RefObject<HTMLElement>;
    skipRef?: MutableRefObject<boolean>;
}

export const HapticFallback: FC<HapticFallbackProps> = ({ nodeRef }) => {
    const handleLabelClick: MouseEventHandler<HTMLLabelElement> = (event) => {
        event.stopPropagation();
    };
    const handleInputClick: MouseEventHandler<HTMLInputElement> = (event) => {
        event.stopPropagation();
        nodeRef?.current?.focus({ preventScroll: true });
        nodeRef?.current?.dispatchEvent(
            new MouseEvent('click', { bubbles: true, cancelable: true }),
        );
    };

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <label tabIndex={-1} className={styles.component} onClick={handleLabelClick}>
            <input
                {...{ switch: '' }}
                tabIndex={-1}
                className={styles.input}
                type='checkbox'
                onClick={handleInputClick}
            />
        </label>
    );
};
