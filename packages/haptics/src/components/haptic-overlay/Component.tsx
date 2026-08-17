import React, {
    type FC,
    Fragment,
    type InputHTMLAttributes,
    type MouseEvent,
    type ReactNode,
    useCallback,
    useLayoutEffect,
    useRef,
} from 'react';

import { useCoreConfig } from '@alfalab/core-components-config';

import { hapticLog } from '../../utils/logger';

import styles from './index.module.css';

const SWITCH_WIDTH = 51;
const SWITCH_HEIGHT = 31;
const NATIVE_SWITCH_ATTRIBUTE = { switch: '' } as InputHTMLAttributes<HTMLInputElement>;

export type HapticOverlayProps = {
    /**
     * Контрол, поверх которого встаёт switch-overlay.
     */
    children: ReactNode;

    // todo: delete prop
    fillParent?: boolean;

    /**
     * Прямой tap по нативному switch.
     */
    onTap: (event: MouseEvent<HTMLInputElement>) => void;
};

export const HapticOverlay: FC<HapticOverlayProps> = ({ children, fillParent = false, onTap }) => {
    const { haptics } = useCoreConfig();
    const debug = haptics?.debug ?? false;

    const labelRef = useRef<HTMLLabelElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const onTapRef = useRef(onTap);

    onTapRef.current = onTap;

    useLayoutEffect(() => {
        const label = labelRef.current;
        const input = inputRef.current;

        if (!label || !input) return undefined;

        // todo: ref
        // overlay должен совпадать с хит-зоной контрола, поэтому его нужно позиционировать относительно родителя.
        if (fillParent) {
            const host = label.parentElement;

            if (host && getComputedStyle(host).position === 'static') {
                host.style.position = 'relative';
            }
        }

        const updateScale = () => {
            const { width, height } = label.getBoundingClientRect();

            if (width <= 0 || height <= 0) return;

            input.style.setProperty('--haptic-overlay-scale-x', String(width / SWITCH_WIDTH));
            input.style.setProperty('--haptic-overlay-scale-y', String(height / SWITCH_HEIGHT));
        };

        updateScale();

        // todo: refactor debug mode
        if (debug) {
            hapticLog(debug, 'overlay:mount', {
                fillParent,
                rect: label.getBoundingClientRect(),
                userAgent: navigator.userAgent,
            });
        }

        const resizeObserver =
            typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateScale);

        resizeObserver?.observe(label);

        return () => resizeObserver?.disconnect();
    }, [debug, fillParent]);

    const handleClick = useCallback(
        (event: MouseEvent<HTMLInputElement>) => {
            const target = event.currentTarget;

            hapticLog(debug, 'overlay:tap');

            onTapRef.current(event);

            target.checked = false;
        },
        [debug],
    );

    const overlay = (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label ref={labelRef} className={styles.overlayLabel} aria-hidden={true}>
            <input
                {...NATIVE_SWITCH_ATTRIBUTE}
                ref={inputRef}
                type='checkbox'
                className={styles.overlayInput}
                tabIndex={-1}
                onClick={handleClick}
            />
        </label>
    );

    if (fillParent) {
        return (
            <Fragment>
                {children}
                {overlay}
            </Fragment>
        );
    }

    return (
        <span className={styles.wrapper}>
            {children}
            {overlay}
        </span>
    );
};

HapticOverlay.displayName = 'HapticOverlay';
