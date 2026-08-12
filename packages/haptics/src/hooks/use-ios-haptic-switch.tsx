import React, {
    type MouseEvent,
    type ReactNode,
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { needsIosHapticSwitch } from '../ios-system-tick';

import styles from './ios-haptic-switch.module.css';

export interface UseIosHapticSwitchParams {
    /**
     * Не рендерить switch (disabled leaf).
     */
    disabled?: boolean;

    /**
     * Overlay относительно родителя (для `HapticInput` внутри `label`).
     *
     * @default false
     */
    fillParent?: boolean;

    /**
     * Вызывается при прямом tap по native switch (iOS 26.5+ tick уже от WebKit).
     */
    onSwitchTap?: (event: MouseEvent<HTMLInputElement>) => void;
};

export interface UseIosHapticSwitchResult {
    /**
     * `true` только на iPhone/iPad/iPod без `navigator.vibrate`.
     */
    active: boolean;

    /**
     * className для wrapper span; `undefined` если `!active` или `fillParent`.
     */
    wrapperClassName?: string;

    /**
     * className для leaf при `active && !fillParent` (`width: 100%`).
     */
    childClassName?: string;

    /**
     * JSX switch-overlay или `null`.
     */
    node: ReactNode;
};

const SWITCH_WIDTH = 51;
const SWITCH_HEIGHT = 31;

/**
 * iOS switch-layer для системного tick без Vibration API.
 *
 * Вне iOS возвращает `active: false` и `node: null` — leaf рендерит только свой элемент.
 */
export const useIosHapticSwitch = ({
    disabled = false,
    fillParent = false,
    onSwitchTap,
}: UseIosHapticSwitchParams = {}): UseIosHapticSwitchResult => {
    const [active] = useState(() => needsIosHapticSwitch());
    const labelRef = useRef<HTMLLabelElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const onSwitchTapRef = useRef(onSwitchTap);

    onSwitchTapRef.current = onSwitchTap;

    const showNode = active && !disabled;

    useLayoutEffect(() => {
        if (!showNode) return undefined;

        const label = labelRef.current;
        const input = inputRef.current;

        if (!label || !input) return undefined;

        const updateScale = () => {
            const { width, height } = label.getBoundingClientRect();

            if (width <= 0 || height <= 0) return;

            input.style.setProperty('--haptic-overlay-scale-x', String(width / SWITCH_WIDTH));
            input.style.setProperty('--haptic-overlay-scale-y', String(height / SWITCH_HEIGHT));
        };

        updateScale();

        // eslint-disable-next-line no-negated-condition
        const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateScale) : null;

        ro?.observe(label);

        return () => ro?.disconnect();
    }, [showNode]);

    const handleSwitchClick = useCallback((event: MouseEvent<HTMLInputElement>) => {
        const target = event.currentTarget;

        onSwitchTapRef.current?.(event);

        // Keep control unchecked so toggle chrome never settles visibly.
        target.checked = false;
    }, []);

    const node = useMemo(() => {
        if (!showNode) return null;

        return (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label ref={labelRef} className={styles.overlayLabel} aria-hidden={true}>
                <input
                    ref={inputRef}
                    type='checkbox'
                    // Native iOS switch — required for system haptic on direct tap.
                    // eslint-disable-next-line react/no-unknown-property
                    switch=''
                    className={styles.overlayInput}
                    tabIndex={-1}
                    onClick={handleSwitchClick}
                />
            </label>
        );
    }, [handleSwitchClick, showNode]);

    return {
        active,
        wrapperClassName: active && !fillParent ? styles.wrapper : undefined,
        childClassName: active && !fillParent ? styles.childStretch : undefined,
        node,
    };
};
