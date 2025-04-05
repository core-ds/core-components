/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useMemo } from 'react';

import { SelectDesktop, SelectDesktopProps } from '@alfalab/core-components-select/desktop';
import { NextOptionsList } from '@alfalab/core-components-select/shared';
import { Country } from '@alfalab/utils';

import { FlagIcon } from '../flag-icon';
import { EMPTY_COUNTRY_SELECT_FIELD, SelectField } from '../select-field';

import styles from './index.module.css';

type CountriesSelectProps = Pick<
    SelectDesktopProps,
    'size' | 'dataTestId' | 'disabled' | 'onChange' | 'preventFlip' | 'fieldWidth'
> & {
    selected?: string;
    countries: Country[];
};

export const CountriesSelect: FC<CountriesSelectProps> = ({
    disabled,
    size,
    selected,
    countries,
    fieldWidth,
    preventFlip,
    onChange,
    dataTestId,
}) => {
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

    return (
        <div className={styles.component} onClick={(event) => event.stopPropagation()}>
            <SelectDesktop
                dataTestId={dataTestId}
                disabled={disabled}
                size={size}
                options={options}
                selected={selected || EMPTY_COUNTRY_SELECT_FIELD}
                onChange={onChange}
                Field={SelectField}
                OptionsList={NextOptionsList}
                preventFlip={preventFlip}
                fieldWidth={fieldWidth}
                optionsListWidth='field'
            />
        </div>
    );
};
