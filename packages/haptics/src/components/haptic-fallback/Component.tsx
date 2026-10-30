import React, { type FC, type MouseEvent, useEffect } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { ensureDOM, TICK_ID } from '../../utils';

import styles from './index.module.css';

export interface HapticFallbackProps {
    /**
     * Прямой tap по label, связанному с нативным switch.
     */
    onTap: (event: MouseEvent<HTMLLabelElement>) => void;

    /**
     * Позиция overlay относительно элемента.
     *
     * @description
     * `cover` растягивает overlay на родителя, `origin` ставит tap-зону у начала контрола.
     * @default cover
     */
    placement?: 'cover' | 'origin';

    /**
     * Идентификатор родительского адаптера; overlay получает модификатор `-fallback`.
     */
    dataTestId?: string;
}

/** Компонент overlay для поддержки haptic feedback на iOS без Vibration API. */
export const HapticFallback: FC<HapticFallbackProps> = ({
    onTap,
    placement = 'cover',
    dataTestId,
}) => {
    useEffect(() => {
        ensureDOM();
    }, []);

    const handleClick = (event: MouseEvent<HTMLLabelElement>) => {
        event.stopPropagation();

        onTap(event);
    };

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
            htmlFor={TICK_ID}
            className={cn(styles.overlayLabel, {
                [styles.overlayLabelOrigin]: placement === 'origin',
            })}
            aria-hidden={true}
            data-test-id={getDataTestId(dataTestId, 'fallback')}
            onClick={handleClick}
        />
    );
};

HapticFallback.displayName = 'HapticFallback';
