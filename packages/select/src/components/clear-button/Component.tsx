import React from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';

import { ClearButtonProps } from '../../typings';

import styles from './index.module.css';

export const ClearButton = ({ disabled, onClick, dataTestId, size }: ClearButtonProps) => (
    <Button
        type='button'
        view='text'
        disabled={disabled}
        aria-label='Очистить'
        className={cn(styles.clearButton, {
            [styles['size-40']]: size === 40,
        })}
        onClick={onClick}
        tabIndex={-1}
        dataTestId={dataTestId}
    >
        <CrossCircleMIcon className={styles.clearIcon} />
    </Button>
);
