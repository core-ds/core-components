import React, { ElementType, useCallback, useMemo } from 'react';
import cn from 'classnames';

import {
    BaseOption,
    BaseSelectProps,
    OptionsListProps,
    VirtualOptionsList,
} from '@alfalab/core-components-select/shared';
import { getDataTestId } from '@alfalab/core-components-shared';
import { WorldMagnifierMIcon } from '@alfalab/icons-glyph/WorldMagnifierMIcon';

import { SIZE_TO_CLASSNAME_MAP } from '../../consts';
import { Country } from '../../types';
import { FlagIcon } from '../flag-icon';
import { EMPTY_COUNTRY_SELECT_FIELD, SelectField } from '../select-field';

import styles from './index.module.css';

export type SharedCountrySelectProps = Omit<
    BaseSelectProps,
    'fieldProps' | 'options' | 'Field' | 'OptionsList' | 'selected'
> & {
    /**
     * Пропсы, которые будут прокинуты в компонент поля
     */
    fieldProps?: Record<string, unknown>;

    /*
     * Отключает выбор страны через селект
     */
    hideCountrySelect?: boolean;
};

type CountrySelectProps = SharedCountrySelectProps & {
    countries?: Country[][];
    country?: Country;
    fieldWidth?: number;
    view: 'desktop' | 'mobile';
    SelectComponent: ElementType;
};

export const CountrySelect: React.FC<CountrySelectProps> = ({
    hideCountrySelect,
    countries,
    country,
    dataTestId,
    fieldWidth,
    onChange,
    view = 'desktop',
    SelectComponent,
    size,
    ...restProps
}) => {
    const isMobile = useMemo(() => view === 'mobile', [view]);

    const options = useMemo(
        () =>
            countries?.map((areas) => {
                const { iso2, dialCode, name } = areas[0];

                return {
                    key: iso2,
                    value: areas[0],
                    content: (
                        <span
                            className={cn([
                                styles.option,
                                size && styles[SIZE_TO_CLASSNAME_MAP[size]],
                                isMobile && styles.mobile,
                            ])}
                        >
                            <FlagIcon country={iso2} className={styles.flag} />

                            <span className={styles.optionTextWrap}>
                                <span className={styles.countryName}>{name}</span>
                                <span className={styles.dialCode}>+{dialCode}</span>
                            </span>
                        </span>
                    ),
                };
            }) || [],
        [countries, size, isMobile],
    );

    const renderOptionsList = useCallback(
        (props: OptionsListProps) => (
            <div style={{ width: fieldWidth || 0 }}>
                <VirtualOptionsList {...props} optionsListWidth='field' />
            </div>
        ),
        [fieldWidth],
    );

    const renderFlagIcon = () => (
        <span className={styles.flagIconWrapper}>
            {country?.iso2 ? (
                <FlagIcon country={country.iso2} />
            ) : (
                <WorldMagnifierMIcon className={styles.emptyCountryIcon} />
            )}
        </span>
    );

    const renderCountrySelect = () => {
        const selected = options.find((c) => c.key === country?.iso2)?.key;

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div className={styles.component} onClick={(event) => event.stopPropagation()}>
                <SelectComponent
                    Option={BaseOption}
                    size={size}
                    {...restProps}
                    dataTestId={getDataTestId(dataTestId, 'country-select')}
                    options={options}
                    selected={selected || EMPTY_COUNTRY_SELECT_FIELD}
                    onChange={onChange}
                    Field={SelectField}
                    OptionsList={isMobile ? VirtualOptionsList : renderOptionsList}
                    {...(isMobile && {
                        bottomSheetProps: {
                            title: 'Выберите страну',
                        },
                    })}
                />
            </div>
        );
    };

    return hideCountrySelect || options.length < 2 ? renderFlagIcon() : renderCountrySelect();
};
