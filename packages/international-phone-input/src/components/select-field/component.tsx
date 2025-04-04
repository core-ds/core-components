import React, { FC, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import type { FieldProps } from '@balafla/core-components-select/shared';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';
import { WorldMagnifierMIcon } from '@alfalab/icons-glyph/WorldMagnifierMIcon';

import { FlagIcon } from '../flag-icon';

import styles from './index.module.css';

export const EMPTY_COUNTRY_SELECT_FIELD = {
    value: 'EMPTY_COUNTRY_SELECT_VALUE',
    key: 'EMPTY_COUNTRY_SELECT_KEY',
};

type SelectFieldProps = FieldProps & {
    size?: 's' | 'm' | 'l' | 'xl' | 48 | 56 | 64 | 72;
};

const SIZE_TO_CLASSNAME_MAP = {
    s: 'size-48',
    m: 'size-56',
    l: 'size-64',
    xl: 'size-72',
    48: 'size-48',
    56: 'size-56',
    64: 'size-64',
    72: 'size-72',
};

export const SelectField: FC<SelectFieldProps> = ({
    selected,
    Arrow,
    size,
    disabled,
    innerProps = {},
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [focusVisible] = useFocus(wrapperRef, 'keyboard');

    const ref = innerProps.ref ? mergeRefs([innerProps.ref, wrapperRef]) : wrapperRef;

    return (
        <div
            ref={ref}
            className={cn(styles.component, size && styles[SIZE_TO_CLASSNAME_MAP[size]], {
                [styles.focusVisible]: focusVisible,
                [styles.disabled]: disabled,
            })}
        >
            <div {...innerProps} className={styles.inner}>
                <span className={styles.flagIconContainer}>
                    {!selected || selected === EMPTY_COUNTRY_SELECT_FIELD ? (
                        <WorldMagnifierMIcon className={styles.emptyCountryIcon} />
                    ) : (
                        <FlagIcon country={selected.key} />
                    )}
                </span>
                {Arrow}
            </div>
        </div>
    );
};
