import React from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CrossCircleSIcon } from '@alfalab/icons-glyph/CrossCircleSIcon';

import { BaseInputProps } from '../base-input';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

interface ClearButtonProps {
    disabled?: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    colors: 'default' | 'inverted';
    dataTestId?: string;
    size?: BaseInputProps['size'];
}

const preventDefault = (e: React.UIEvent<HTMLElement>) => e.preventDefault();

export const ClearButton: React.FC<ClearButtonProps> = ({
    colors,
    disabled,
    onClick,
    dataTestId,
    size,
}) => {
    const IconComponent = size === 40 ? CrossCircleSIcon : CrossCircleMIcon;

    return (
        <Button
            type='button'
            view='text'
            disabled={disabled}
            aria-label='Очистить'
            className={cn(styles.clearButton)}
            onClick={onClick}
            tabIndex={-1}
            onMouseDown={preventDefault}
            dataTestId={dataTestId}
        >
            <IconComponent className={cn(styles.clearIcon, colorStyles[colors].clearIcon)} />
        </Button>
    );
};
