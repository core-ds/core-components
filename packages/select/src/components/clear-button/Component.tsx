import React, { forwardRef } from 'react';

import { Button } from '@alfalab/core-components-button';
import { internalMergeRefs, preventDefault } from '@alfalab/core-components-shared';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';

import { ClearButtonProps } from '../../typings';

import styles from './index.module.css';

export const ClearButton = forwardRef<HTMLElement, ClearButtonProps>(
    ({ disabled, onClick, dataTestId }, ref) => (
        <Button
            ref={internalMergeRefs([ref])}
            type='button'
            view='text'
            disabled={disabled}
            aria-label='Очистить'
            className={styles.clearButton}
            onClick={onClick}
            tabIndex={-1}
            dataTestId={dataTestId}
            onMouseDown={preventDefault}
        >
            <CrossCircleMIcon className={styles.clearIcon} />
        </Button>
    ),
);
