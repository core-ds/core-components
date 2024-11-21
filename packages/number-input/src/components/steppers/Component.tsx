import React from 'react';
import cn from 'classnames';

import { IconButton } from '@alfalab/core-components-icon-button';
import { InputProps } from '@alfalab/core-components-input';
import { getDataTestId } from '@alfalab/core-components-shared';
import { MinusMIcon } from '@alfalab/icons-glyph/MinusMIcon';
import { PlusMediumMIcon } from '@alfalab/icons-glyph/PlusMediumMIcon';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

export type SteppersProps = {
    value: number;
    min: number;
    max: number;
    className?: string;
    disabled?: boolean;
    onIncrement: () => void;
    onDecrement: () => void;
    dataTestId?: string;
    colors: 'default' | 'inverted';
    size: InputProps['size'];
};

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
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
    colors,
    size,
}) => {
    const decButtonDisabled = disabled || value <= min;
    const incButtonDisabled = disabled || value >= max;

    return (
        <div className={cn(styles.component, className)}>
            <IconButton
                colors={colors}
                disabled={decButtonDisabled}
                className={styles.button}
                icon={<MinusMIcon {...(size === 40 && { width: 16, height: 16 })} />}
                aria-label='уменьшить'
                onMouseDown={preventDefault}
                onClick={onDecrement}
                dataTestId={getDataTestId(dataTestId, 'decrement-button')}
                view='secondary'
            />
            <div className={cn(styles.separator, colorStyles[colors].separator)} />
            <IconButton
                colors={colors}
                disabled={incButtonDisabled}
                className={styles.button}
                icon={<PlusMediumMIcon {...(size === 40 && { width: 16, height: 16 })} />}
                aria-label='увеличить'
                onMouseDown={preventDefault}
                onClick={onIncrement}
                dataTestId={getDataTestId(dataTestId, 'increment-button')}
                view='secondary'
            />
        </div>
    );
};
