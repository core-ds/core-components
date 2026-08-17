import React, { type FC, forwardRef, type MouseEvent, type ReactNode } from 'react';

import styles from './index.module.css';

/**
 * Hack from https://github.com/WebKit/WebKit/pull/38473
 * Native Safari `<input type="checkbox" switch>` plays a system haptic on a real user tap.
 */
const SWITCH_TYPE = { switch: '' };

export interface HapticSwitchOverlayProps {
    /**
     * Прямой tap по нативному switch.
     */
    onTap: (event: MouseEvent<HTMLInputElement>) => void;
}

export const HapticSwitchOverlay = forwardRef<HTMLLabelElement, HapticSwitchOverlayProps>(
    ({ onTap }, ref) => (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label ref={ref} className={styles.overlayLabel} aria-hidden={true}>
            <input
                {...SWITCH_TYPE}
                type='checkbox'
                className={styles.overlayInput}
                tabIndex={-1}
                onClick={(event) => {
                    const { currentTarget } = event;

                    // Overlay sits inside Checkbox/Switch <label>; bubbling would click the host again.
                    event.stopPropagation();

                    onTap(event);
                    currentTarget.checked = false;
                }}
            />
        </label>
    ),
);

HapticSwitchOverlay.displayName = 'HapticSwitchOverlay';

export interface HapticFallbackProps {
    /**
     * Контрол, поверх которого встаёт switch-overlay.
     */
    children: ReactNode;

    /**
     * Прямой tap по нативному switch.
     */
    onTap: (event: MouseEvent<HTMLInputElement>) => void;
}

export const HapticFallback: FC<HapticFallbackProps> = ({ children, onTap }) => (
    <span className={styles.wrapper}>
        {children}
        <HapticSwitchOverlay onTap={onTap} />
    </span>
);

HapticFallback.displayName = 'HapticFallback';
