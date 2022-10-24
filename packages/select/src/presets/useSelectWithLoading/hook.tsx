import React, { useCallback } from 'react';

import { Skeleton } from '@alfalab/core-components-skeleton';

import { Option } from '../../components/option';
import { BaseSelectProps, OptionProps, OptionShape } from '../../typings';

import styles from './index.module.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
type useSelectWithLoadingProps = {
    loading?: boolean;
    visibleOptions?: BaseSelectProps['visibleOptions'];
};

export function useSelectWithLoading({
    loading = false,
    visibleOptions = 6,
}: useSelectWithLoadingProps) {
    const renderOption = useCallback(
        (props: OptionProps) => (
            <Option {...props} Checkmark={null} highlighted={loading ? false : props.highlighted} />
        ),
        [loading],
    );

    const options: OptionShape[] = Array(visibleOptions)
        .fill(0)
        .map((_, key) => ({
            key: `loading-${key}`,
            disabled: true,
            content: <Skeleton className={styles.skeleton} visible={true} />,
        }));

    if (!loading) return null;

    return {
        Option: renderOption,
        options,
    };
}
