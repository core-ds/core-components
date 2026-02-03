import React, { type MouseEventHandler } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
import { StatusBadge } from '@alfalab/core-components-status-badge';

import { type BaseInputProps } from '../components/base-input/types/base-input-props';
import { ClearButton } from '../components/clear-button';
import { LockIcon } from '../components/lock-icon';

import { type AddonsConfig } from './get-addons-by-priority';

import styles from '../components/base-input/index.module.css';

interface Params
    extends Pick<
        BaseInputProps,
        | 'size'
        | 'error'
        | 'colors'
        | 'disabled'
        | 'dataTestId'
        | 'success'
        | 'rightAddons'
        | 'readOnly'
    > {
    clearButtonVisible: boolean;
    handleClear: MouseEventHandler;
}

/**
 * Right addons priority [4] <= [3] <= [2] <= [1] or [0]
 * [4] - Clear
 * [3] - Status (error, success)
 * [2] - Common (info, e.g.)
 * [1] - Indicators (eye, calendar, chevron, stepper e.g.)
 * [0] - Lock
 */
export const buildRightAddons = (params: Params) => {
    const {
        size = 48,
        error,
        colors = 'default',
        disabled,
        dataTestId,
        success,
        rightAddons,
        readOnly,
        clearButtonVisible,
        handleClear,
    } = params;

    const statusBadgeSize = size === 40 ? 16 : 20;

    const rightAddonsMap: AddonsConfig[] = [
        {
            priority: 4,
            predicate: clearButtonVisible,
            render: () => (
                <ClearButton
                    onClick={handleClear}
                    disabled={disabled}
                    colors={colors}
                    dataTestId={getDataTestId(dataTestId, 'clear-icon')}
                    size={size}
                />
            ),
        },
        {
            priority: 3,
            predicate: Boolean(error),
            render: () => (
                <div className={cn(styles.errorIcon)} data-addon='error-icon'>
                    <StatusBadge
                        view='negative-alert'
                        size={statusBadgeSize}
                        dataTestId={getDataTestId(dataTestId, 'error-icon')}
                    />
                </div>
            ),
        },
        {
            priority: 3,
            predicate: Boolean(success && !error),
            render: () => (
                <div className={cn(styles.successIcon)}>
                    <StatusBadge
                        view='positive-checkmark'
                        size={statusBadgeSize}
                        dataTestId={getDataTestId(dataTestId, 'success-icon')}
                    />
                </div>
            ),
        },
        {
            priority: 2,
            predicate: Boolean(rightAddons),
            render: () => rightAddons,
        },
        {
            priority: 0,
            predicate: Boolean(disabled || readOnly),
            render: () => <LockIcon colors={colors} size={size} />,
        },
    ];

    return rightAddonsMap;
};
