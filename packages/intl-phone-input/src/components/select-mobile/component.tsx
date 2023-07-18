/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, forwardRef, useCallback, useMemo } from 'react';

import {
    OptionsListProps,
    SelectMobile,
    SelectMobileProps,
    VirtualOptionsList,
} from '@alfalab/core-components-select';
import { Country } from '@alfalab/utils';

import { FlagIcon } from '../flag-icon';
import { EMPTY_COUNTRY_SELECT_FIELD, SelectField } from '../select-field';

import styles from './index.module.css';

type CountriesSelectProps = Pick<
    SelectMobileProps,
    'size' | 'dataTestId' | 'disabled' | 'onChange' | 'preventFlip'
> & {
    selected?: string;
    countries: Country[];
};

export const CountriesSelectMobile: FC<CountriesSelectProps> = forwardRef(
    ({ disabled, size, selected, countries, preventFlip, onChange, dataTestId }, ref) => {
        const options = useMemo(
            () =>
                countries.map(({ iso2, dialCode, name }) => ({
                    key: iso2,
                    value: iso2,
                    content: (
                        <span className={styles.option}>
                            <FlagIcon country={iso2} className={styles.flag} />
                            <span className={styles.optionTextWrap}>
                                <span className={styles.countryName}>{name}</span>
                                <span className={styles.dialCode}>+{dialCode}</span>
                            </span>
                        </span>
                    ),
                })),
            [countries],
        );

        const renderOptionsList = useCallback(
            (props: OptionsListProps) => (
                <div>
                    <VirtualOptionsList {...props} className={styles.optionsList} />
                </div>
            ),
            [],
        );

        return (
            <div className={styles.component} onClick={(event) => event.stopPropagation()}>
                <SelectMobile
                    ref={ref}
                    bottomSheetProps={{
                        hasCloser: false,
                    }}
                    dataTestId={dataTestId}
                    disabled={disabled}
                    size={size}
                    options={options}
                    selected={selected || EMPTY_COUNTRY_SELECT_FIELD}
                    onChange={onChange}
                    Field={SelectField}
                    OptionsList={renderOptionsList}
                    preventFlip={preventFlip}
                />
            </div>
        );
    },
);
