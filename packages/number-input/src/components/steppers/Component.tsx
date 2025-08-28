import React, { FC } from 'react';
import cn from 'classnames';

import { IconButton } from '@alfalab/core-components-icon-button';
import { InputProps } from '@alfalab/core-components-input';
import { getDataTestId } from '@alfalab/core-components-shared';
import { MinusMIcon } from '@alfalab/icons-glyph/MinusMIcon';
import { MinusSIcon } from '@alfalab/icons-glyph/MinusSIcon';
import { PlusMediumMIcon } from '@alfalab/icons-glyph/PlusMediumMIcon';
import { PlusSIcon } from '@alfalab/icons-glyph/PlusSIcon';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

export type SteppersProps = {
    value: number;
    min: number;
    max: number;
    className?: string;
    disabled?: boolean;
    focused?: boolean;
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

const SIZE_TO_CLASSNAME_MAP = {
    s: 'size-48',
    m: 'size-56',
    l: 'size-64',
    xl: 'size-72',
    40: 'size-40',
    48: 'size-48',
    56: 'size-56',
    64: 'size-64',
    72: 'size-72',
};

export const Steppers: FC<SteppersProps> = ({
    className,
    onIncrement,
    onDecrement,
    value,
    min,
    max,
    disabled,
    focused,
    dataTestId,
    colors,
    size = 48,
}) => {
    const decButtonDisabled = disabled || value <= min;
    const incButtonDisabled = disabled || value >= max;

    const MinusIconComponent = size === 40 ? MinusSIcon : MinusMIcon;
    const PlusIconComponent = size === 40 ? PlusSIcon : PlusMediumMIcon;

    return (
        <div
            className={cn(
                styles.component,
                colorStyles[colors].steppers,
                styles[SIZE_TO_CLASSNAME_MAP[size]],
                className,
                {
                    [colorStyles[colors].steppersFocused]: focused,
                    [colorStyles[colors].steppersDisabled]: disabled,
                },
            )}
        >
            <IconButton
                colors={colors}
                disabled={decButtonDisabled}
                className={styles.button}
                icon={<MinusIconComponent />}
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
                icon={<PlusIconComponent />}
                aria-label='увеличить'
                onMouseDown={preventDefault}
                onClick={onIncrement}
                dataTestId={getDataTestId(dataTestId, 'increment-button')}
                view='secondary'
            />
        </div>
    );
};

Steppers.displayName = 'Steppers';
