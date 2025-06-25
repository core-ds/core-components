import React from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CrossCircleSIcon } from '@alfalab/icons-glyph/CrossCircleSIcon';

import { ClearButtonProps } from '../../typings';

import styles from './index.module.css';

export const ClearButton = ({ disabled, onClick, dataTestId, size }: ClearButtonProps) => {
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
            dataTestId={dataTestId}
        >
            <IconComponent className={styles.clearIcon} />
        </Button>
    );
};
