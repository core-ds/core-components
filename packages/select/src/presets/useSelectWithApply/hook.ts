import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import reactFastCompare from 'react-fast-compare';

import { SELECT_ALL_KEY } from '../../consts';
import { type AnyObject, type BaseSelectProps, type OptionShape } from '../../typings';
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

    /**
     * Значение name при применении выбора
     * @default 'apply-footer'
     */
    applyName?: string;

    /**
     * Значение name при сбросе выбора
     * @default 'reset-footer'
     */
    resetName?: string;

    /**
     * Позиция чекбокса "Выбрать все" в Header
     * @default 'before'
     */
    checkmarkPosition?: 'before' | 'after';
};

const selectAllOption = { key: SELECT_ALL_KEY, content: 'Выбрать все' };

const isSelectable = (option: OptionShape) => !option.disabled;

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
    checkmarkPosition = 'before',
    showSearch = false,
    searchProps = {},
    applyName = 'apply-footer',
    resetName = 'reset-footer',
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

    const selectableOptions = useMemo(() => flatOptions.filter(isSelectable), [flatOptions]);

    const [selectedDraft, setSelectedDraftState] = useState<OptionShape[]>(() =>
        selectedOptions.filter(isSelectable),
    );

    const setSelectedDraft = useCallback((items: OptionShape[]) => {
        setSelectedDraftState(items.filter(isSelectable));
    }, []);

    const selectedOptionsRef = useRef<OptionShape[]>(selectedOptions);

    const selectedKeys = useMemo(() => selectedDraft.map(({ key }) => key), [selectedDraft]);

    const allSelectableSelected = useMemo(
        () =>
            selectableOptions.length > 0 &&
            selectableOptions.every(({ key }) => selectedKeys.includes(key)),
        [selectableOptions, selectedKeys],
    );

    const handleApply = () => {
        onChange({
            selected: selectedDraft[0],
            selectedMultiple: selectedDraft,
            initiator: null,
            name: applyName,
        });
    };

    const handleClear = () => {
        setSelectedDraft([]);
        onChange({
            selected: null,
            selectedMultiple: [],
            initiator: null,
            name: resetName,
        });
    };

    const handleToggleAll = () => {
        const optionsToSet = allSelectableSelected ? [] : selectableOptions;

        onSelectAllClick(optionsToSet);
        setSelectedDraft(optionsToSet);
    };

    const handleChange: Required<BaseSelectProps>['onChange'] = ({ initiator, ...restArgs }) => {
        if (!initiator) {
            const selectedMultiple = (restArgs.selectedMultiple ?? []).filter(isSelectable);

            onChange({
                initiator: null,
                ...restArgs,
                selected: selectedMultiple[0] ?? null,
                selectedMultiple,
            });

            return;
        }

        if (!isSelectable(initiator)) {
            return;
        }

        const initiatorSelected =
            selectedDraft.some(
                (selectedDraftOption) => selectedDraftOption.key === initiator.key,
            ) ||
            (initiator.key === SELECT_ALL_KEY && allSelectableSelected);

        if (initiator.key === SELECT_ALL_KEY) {
            setSelectedDraft(initiatorSelected ? [] : selectableOptions);
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
    }, [selectedOptions, setSelectedDraft]);

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
                indeterminate: selectedDraft.length > 0 && !allSelectableSelected,
                checked: allSelectableSelected,
                onChange: handleToggleAll,
                checkmarkPosition,
            },
        },
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
            checkmarkPosition,
            showSearch,
            searchProps,
            applyName,
            resetName,
        },
    };
}
