import React from 'react';

import { Button } from '@alfalab/core-components-button';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';

import { ClearButtonProps } from '../../typings';

import styles from './index.module.css';

export const ClearButton = ({ disabled, onClick, dataTestId }: ClearButtonProps) => (
    <Button
        type='button'
        view='text'
        disabled={disabled}
        aria-label='Очистить'
        className={styles.clearButton}
        onClick={onClick}
        tabIndex={-1}
        dataTestId={dataTestId}
    >
        <CrossCircleMIcon className={styles.clearIcon} />
    </Button>
);
