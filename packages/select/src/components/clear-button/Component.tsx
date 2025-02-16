import React, { forwardRef } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { internalMergeRefs, preventDefault } from '@alfalab/core-components-shared';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CrossCircleSIcon } from '@alfalab/icons-glyph/CrossCircleSIcon';

import { ClearButtonProps } from '../../typings';

import styles from './index.module.css';

export const ClearButton = forwardRef<HTMLElement, ClearButtonProps>(
    ({ disabled, onClick, dataTestId, size }, ref) => {
        const IconComponent = size === 40 ? CrossCircleSIcon : CrossCircleMIcon;

        return (
            <Button
                ref={internalMergeRefs([ref])}
                type='button'
                view='text'
                disabled={disabled}
                aria-label='Очистить'
                className={cn(styles.clearButton, styles[`size-${size}`])}
                onClick={onClick}
                tabIndex={-1}
                dataTestId={dataTestId}
                onMouseDown={preventDefault}
            >
                <IconComponent className={styles.clearIcon} />
            </Button>
        );
    },
);
