import { useEffect, useMemo, useRef, useState } from 'react';
import deepEqual from 'deep-equal';

import type { AnyObject, BaseSelectProps, OptionShape } from '../../typings';
import {
    defaultAccessor,
    defaultFilterFn,
    defaultGroupAccessor,
    isGroup,
    processOptions,
} from '../../utils';

import { OptionsListWithApply } from './options-list-with-apply';

export type UseSelectWithApplyProps = {
    /**
     * Список выбранных пунктов
     */
    selected: BaseSelectProps['selected'];

    /**
     * Список вариантов выбора
     */
    options: BaseSelectProps['options'];

    /**
     * Обработчик выбора
     */
    onChange: BaseSelectProps['onChange'];

    /**
     * Компонент выпадающего меню
     */
    OptionsList?: BaseSelectProps['OptionsList'];

    /**
     * Пропсы, которые будут прокинуты в компонент списка
     */
    optionsListProps?: BaseSelectProps['optionsListProps'];

    /**
     * Включает отображение поиска
     */
    showSearch?: BaseSelectProps['showSearch'];

    /**
     *  Настройки поиска
     */
    searchProps?: BaseSelectProps['searchProps'];

    /**
     * Показывать кнопку очистки
     */
    showClear?: boolean;

    /**
     * Показывать пункт "Выбрать все"
     */
    showSelectAll?: boolean;

    /**
     * Показывать пункт "Выбрать все" в заголовке списка
     */
    showHeaderWithSelectAll?: boolean;
};

export const SELECT_ALL_KEY = 'select_all';

const selectAllOption = { key: SELECT_ALL_KEY, content: 'Выбрать все' };

export function useSelectWithApply({
    options,
    selected,
    onChange = () => null,
    OptionsList,
    optionsListProps = {},
    showClear = true,
    showSelectAll = false,
    showHeaderWithSelectAll = false,
    showSearch = false,
    searchProps = {},
}: UseSelectWithApplyProps) {
    const [searchState, setSearchState] = useState('');

    const [search, setSearch] =
        typeof searchProps?.value === 'string'
            ? [searchProps.value, searchProps.onChange]
            : [searchState, setSearchState];

    const accessor = searchProps.accessor || defaultAccessor;
    const filterFn = searchProps.filterFn || defaultFilterFn;
    const groupAccessor = searchProps.groupAccessor ?? defaultGroupAccessor;
    const filterGroup = searchProps.filterGroup ?? false;

    const { flatOptions, filteredOptions, selectedOptions } = useMemo(
        () =>
            processOptions(
                options,
                selected,
                showSearch
                    ? (option) => {
                          if (isGroup(option)) {
                              const groupAccessorValue = groupAccessor(option);

                              return (
                                  typeof groupAccessorValue === 'string' &&
                                  filterFn(groupAccessorValue, search)
                              );
                          }

                          return filterFn(accessor(option), search);
                      }
                    : undefined,
                filterGroup,
            ),
        [options, selected, showSearch, filterGroup, filterFn, accessor, search, groupAccessor],
    );

    const [selectedDraft, setSelectedDraft] = useState<OptionShape[]>(selectedOptions);

    const selectedOptionsRef = useRef<OptionShape[]>(selectedOptions);

    const handleApply = () => {
        onChange({
            selected: selectedDraft[0],
            selectedMultiple: selectedDraft,
            initiator: null,
        });
    };

    const handleClear = () => {
        setSelectedDraft([]);
        onChange({
            selected: null,
            selectedMultiple: [],
            initiator: null,
        });
    };

    const handleToggleAll = () => {
        setSelectedDraft(flatOptions.length === selectedDraft.length ? [] : flatOptions);
    };

    const handleChange: Required<BaseSelectProps>['onChange'] = ({ initiator, ...restArgs }) => {
        if (!initiator) {
            onChange({
                initiator: null,
                ...restArgs,
            });

            return;
        }

        const initiatorSelected =
            selectedDraft.includes(initiator) ||
            (initiator.key === SELECT_ALL_KEY && selectedDraft.length === flatOptions.length);

        if (initiator.key === SELECT_ALL_KEY) {
            setSelectedDraft(initiatorSelected ? [] : flatOptions);
        } else {
            setSelectedDraft(
                initiatorSelected
                    ? selectedDraft.filter((o) => o !== initiator)
                    : selectedDraft.concat(initiator),
            );
        }
    };

    const handleClose = () => setSelectedDraft(selectedOptionsRef.current);

    useEffect(() => {
        // устанавливать selectedDraft если selectedOptions изменились
        if (!deepEqual(selectedOptionsRef.current, selectedOptions)) {
            setSelectedDraft(selectedOptions);
        }
        selectedOptionsRef.current = selectedOptions;
    }, [selectedOptions]);

    const memoizedOptions = useMemo(
        () =>
            filteredOptions.length && showSelectAll
                ? [selectAllOption, ...filteredOptions]
                : filteredOptions,
        [filteredOptions, showSelectAll],
    );

    return {
        OptionsList: OptionsListWithApply,
        optionsListProps: {
            ...(optionsListProps as AnyObject),
            OptionsList,
            showClear,
            onClear: handleClear,
            onApply: handleApply,
            onClose: handleClose,
            selectedDraft,
            setSelectedDraft,
            showHeaderWithSelectAll,
            headerProps: {
                indeterminate: !!selectedDraft.length && selectedDraft.length < flatOptions.length,
                checked: selectedDraft.length === flatOptions.length,
                onChange: handleToggleAll,
            },
        },
        allowUnselect: true,
        multiple: true,
        options: memoizedOptions,
        onChange: handleChange,
        selected,
        showSearch,
        searchProps: showSearch
            ? {
                  ...searchProps,
                  value: search,
                  onChange: setSearch,
              }
            : undefined,
        /* Костыль для респонсив селекта. В мобильную версию хук уже зашит, и это единственный передать в мобилку оригинальные пропсы */
        originalProps: {
            options,
            selected,
            onChange,
            OptionsList,
            optionsListProps,
            showClear,
            showSelectAll,
            showHeaderWithSelectAll,
            showSearch,
            searchProps,
        },
    };
}
