import { useEffect, useMemo, useRef, useState } from 'react';
import reactFastCompare from 'react-fast-compare';

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
     * Дополнительный обработчик клика на чекбокс выбрать все
     */
    onSelectAllClick?: (selectedMultiple: OptionShape[]) => void;

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
    onSelectAllClick = () => null,
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
            name: 'apply-footer',
        });
    };

    const handleClear = () => {
        setSelectedDraft([]);
        onChange({
            selected: null,
            selectedMultiple: [],
            initiator: null,
            name: 'reset-footer',
        });
    };

    const handleToggleAll = () => {
        const optionsToSet = flatOptions.length === selectedDraft.length ? [] : flatOptions;

        onSelectAllClick(optionsToSet);
        setSelectedDraft(optionsToSet);
    };

    const selectedKeys = useMemo(() => selectedDraft.map(({ key }) => key), [selectedDraft]);

    const handleChange: Required<BaseSelectProps>['onChange'] = ({ initiator, ...restArgs }) => {
        if (!initiator) {
            onChange({
                initiator: null,
                ...restArgs,
            });

            return;
        }

        const initiatorSelected =
            selectedDraft.some(
                (selectedDraftOption) => selectedDraftOption.key === initiator.key,
            ) ||
            (initiator.key === SELECT_ALL_KEY &&
                (selectedDraft.length === flatOptions.length ||
                    flatOptions.every(({ key }) => selectedKeys.includes(key))));

        if (initiator.key === SELECT_ALL_KEY) {
            setSelectedDraft(initiatorSelected ? [] : flatOptions);
        } else {
            setSelectedDraft(
                initiatorSelected
                    ? selectedDraft.filter((o) => o.key !== initiator.key)
                    : selectedDraft.concat(initiator),
            );
        }
    };

    const handleClose = () => setSelectedDraft(selectedOptionsRef.current);

    useEffect(() => {
        // устанавливать selectedDraft если selectedOptions изменились
        if (!reactFastCompare(selectedOptionsRef.current, selectedOptions)) {
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
                ...(optionsListProps as AnyObject)?.headerProps,
                indeterminate: selectedDraft.length > 0,
                checked:
                    selectedDraft.length === flatOptions.length ||
                    flatOptions.every(({ key }) => selectedKeys.includes(key)),
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
