import React from 'react';
import cn from 'classnames';

import { IconButton } from '@alfalab/core-components-icon-button';
import { getDataTestId } from '@alfalab/core-components-shared';
import { MinusMIcon } from '@alfalab/icons-glyph/MinusMIcon';
import { PlusMediumMIcon } from '@alfalab/icons-glyph/PlusMediumMIcon';

import styles from './index.module.css';

export type SteppersProps = {
    value: number;
    min: number;
    max: number;
    className?: string;
    disabled?: boolean;
    onIncrement: () => void;
    onDecrement: () => void;
    dataTestId?: string;
};

function preventDefault(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
}

export const Steppers: React.FC<SteppersProps> = ({
    className,
    onIncrement,
    onDecrement,
    value,
    min,
    max,
    disabled,
    dataTestId,
}) => {
    const decButtonDisabled = disabled || value <= min;
    const incButtonDisabled = disabled || value >= max;

    return (
        <div className={cn(styles.component, className)}>
            <IconButton
                disabled={decButtonDisabled}
                className={styles.button}
                icon={<MinusMIcon />}
                aria-label='уменьшить'
                onMouseDown={preventDefault}
                onClick={onDecrement}
                dataTestId={getDataTestId(dataTestId, 'decrement-button')}
                view='secondary'
            />
            <div className={styles.separator} />
            <IconButton
                disabled={incButtonDisabled}
                className={styles.button}
                icon={<PlusMediumMIcon />}
                aria-label='увеличить'
                onMouseDown={preventDefault}
                onClick={onIncrement}
                dataTestId={getDataTestId(dataTestId, 'increment-button')}
                view='secondary'
            />
        </div>
    );
};
