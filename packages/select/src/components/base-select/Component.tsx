/* eslint-disable no-nested-ternary */
import React, {
    FocusEvent,
    forwardRef,
    KeyboardEvent,
    MouseEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import cn from 'classnames';
import {
    useCombobox,
    useMultipleSelection,
    UseMultipleSelectionProps,
    UseMultipleSelectionState,
} from 'downshift';

import { Popover } from '@alfalab/core-components-popover';
import { getDataTestId } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import {
    AnyObject,
    BaseSelectProps,
    OptionShape,
    OptionsListProps,
    SearchProps,
} from '../../typings';
import { defaultAccessor, defaultFilterFn, processOptions } from '../../utils';
import { NativeSelect } from '../native-select';

import styles from './index.module.css';

export const BaseSelect = forwardRef(
    // TODO: 😭
    // eslint-disable-next-line complexity
    (
        {
            dataTestId,
            className,
            fieldClassName,
            optionsListClassName,
            optionClassName,
            popperClassName,
            options,
            autocomplete = false,
            multiple = false,
            allowUnselect = false,
            disabled = false,
            closeOnSelect = !multiple,
            circularNavigation = false,
            nativeSelect = false,
            defaultOpen = false,
            open: openProp,
            popoverPosition = 'bottom-start',
            preventFlip = true,
            optionsListWidth = 'content',
            name,
            id,
            selected,
            size = 's',
            optionsSize = size,
            error,
            hint,
            block,
            label,
            labelView,
            placeholder,
            fieldProps = {},
            optionsListProps = {},
            optionProps = {},
            searchProps = {},
            showSearch = false,
            valueRenderer,
            onChange,
            onOpen,
            onFocus,
            onBlur,
            onScroll,
            Arrow,
            Field = () => null,
            OptionsList = () => null,
            Optgroup = () => null,
            Option = () => null,
            Search = () => null,
            updatePopover,
            zIndexPopover,
            showEmptyOptionsList = false,
            visibleOptions,
        }: BaseSelectProps,
        ref,
    ) => {
        const rootRef = useRef<HTMLLabelElement>(null);
        const fieldRef = useRef<HTMLInputElement>(null);
        const listRef = useRef<HTMLDivElement>(null);
        const initiatorRef = useRef<OptionShape | null>(null);
        const searchRef = useRef<HTMLInputElement>(null);

        const [searchState, setSearchState] = React.useState('');

        const [search, setSearch] =
            typeof searchProps?.value === 'string'
                ? [searchProps.value, searchProps.onChange]
                : [searchState, setSearchState];

        const itemToString = (option: OptionShape) => (option ? option.key : '');

        const accessor = searchProps.accessor || defaultAccessor;

        const { filteredOptions, flatOptions, selectedOptions } = useMemo(
            () =>
                processOptions(options, selected, (option) =>
                    defaultFilterFn(accessor(option), search),
                ),
            [accessor, options, search, selected],
        );

        const useMultipleSelectionProps: UseMultipleSelectionProps<OptionShape> = {
            itemToString,
            onSelectedItemsChange: (changes) => {
                if (onChange) {
                    const { selectedItems = [] } = changes;

                    onChange({
                        selectedMultiple: selectedItems,
                        selected: selectedItems.length ? selectedItems[0] : null,
                        initiator: initiatorRef.current,
                        name,
                    });

                    initiatorRef.current = null;
                }
            },
            stateReducer: (state, actionAndChanges) => {
                const { type, changes } = actionAndChanges;

                if (
                    !allowUnselect &&
                    type === useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace
                ) {
                    return state;
                }

                return changes as UseMultipleSelectionState<OptionShape>;
            },
        };

        if (selected !== undefined) {
            useMultipleSelectionProps.selectedItems = selectedOptions;
        }

        const {
            selectedItems,
            addSelectedItem,
            setSelectedItems,
            removeSelectedItem,
            getDropdownProps,
        } = useMultipleSelection(useMultipleSelectionProps);

        const {
            isOpen: open,
            getMenuProps,
            getInputProps,
            getItemProps,
            getComboboxProps,
            getLabelProps,
            highlightedIndex,
            toggleMenu,
            openMenu,
        } = useCombobox<OptionShape>({
            id,
            isOpen: openProp,
            circularNavigation,
            items: flatOptions,
            itemToString,
            defaultHighlightedIndex: selectedItems.length === 0 ? -1 : undefined,
            onIsOpenChange: (changes) => {
                if (onOpen) {
                    /**
                     *  Вызываем обработчик асинхронно.
                     *
                     * Иначе при клике вне открытого селекта сначала сработает onOpen, который закроет селект,
                     * А затем сработает onClick кнопки открытия\закрытия с open=false и в итоге селект откроется снова.
                     */
                    setTimeout(() => {
                        onOpen({
                            open: changes.isOpen,
                            name,
                        });
                    }, 0);
                }

                if (showSearch) {
                    if (changes.isOpen) {
                        setTimeout(() => {
                            searchRef.current?.focus();
                        }, 0);
                    } else {
                        setSearch?.('');
                    }
                }
            },
            stateReducer: (state, actionAndChanges) => {
                const { type, changes } = actionAndChanges;
                const { selectedItem } = changes;

                switch (type) {
                    case useCombobox.stateChangeTypes.InputKeyDownEnter:
                    case useCombobox.stateChangeTypes.ItemClick:
                        initiatorRef.current = selectedItem;

                        if (selectedItem && !selectedItem.disabled) {
                            const alreadySelected = selectedItems.includes(selectedItem);
                            const allowRemove =
                                allowUnselect || (multiple && selectedItems.length > 1);

                            if (alreadySelected && allowRemove) {
                                removeSelectedItem(selectedItem);
                            }

                            if (!alreadySelected) {
                                if (multiple) {
                                    addSelectedItem(selectedItem);
                                } else {
                                    setSelectedItems([selectedItem]);
                                }
                            }
                        }

                        return {
                            ...changes,
                            isOpen: !closeOnSelect,
                            // при closeOnSelect === false - сохраняем подсвеченный индекс
                            highlightedIndex:
                                state.isOpen && !closeOnSelect
                                    ? state.highlightedIndex
                                    : changes.highlightedIndex,
                        };
                    default:
                        return changes;
                }
            },
        });

        const menuProps = (getMenuProps as (options: object, additional: object) => AnyObject)(
            { ref: listRef },
            { suppressRefError: true },
        );
        const inputProps = getInputProps(getDropdownProps({ ref: mergeRefs([ref, fieldRef]) }));

        const handleFieldFocus = (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => {
            if (onFocus) onFocus(event);

            if (autocomplete && !open) {
                openMenu();
            }
        };

        const handleFieldBlur = (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => {
            const isNextFocusInsideList = listRef.current?.contains(
                (event.relatedTarget || document.activeElement) as HTMLElement,
            );

            if (!isNextFocusInsideList) {
                if (onBlur) onBlur(event);

                inputProps.onBlur(event);
            }
        };

        const handleFieldKeyDown = (event: KeyboardEvent<HTMLDivElement | HTMLInputElement>) => {
            inputProps.onKeyDown(event);
            if (autocomplete && !open && (event.key.length === 1 || event.key === 'Backspace')) {
                // Для автокомплита - открываем меню при начале ввода
                openMenu();
            }

            if (
                [' ', 'Enter'].includes(event.key) &&
                !autocomplete &&
                !nativeSelect &&
                (event.target as HTMLElement).tagName !== 'INPUT' &&
                (event.target as HTMLElement).tagName !== 'BUTTON'
            ) {
                // Открываем\закрываем меню по нажатию enter или пробела
                event.preventDefault();
                if (!open || highlightedIndex === -1) toggleMenu();
            }
        };

        const handleFieldClick = (event: MouseEvent) => {
            if (!autocomplete || (event.target as HTMLElement).tagName !== 'INPUT') {
                toggleMenu();
            } else {
                openMenu();
            }
        };

        const handleNativeSelectChange = useCallback(
            (event: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedItems(
                    // eslint-disable-next-line
                    [...(event.target.options as any)].reduce(
                        (acc, option, index) =>
                            option.selected ? acc.concat(flatOptions[index]) : acc,
                        [],
                    ),
                );
            },
            [flatOptions, setSelectedItems],
        );

        const getOptionProps = useCallback(
            (option: OptionShape, index: number) => ({
                ...(optionProps as object),
                className: optionClassName,
                innerProps: getItemProps({
                    index,
                    item: option,
                    disabled: option.disabled,
                    onMouseDown: (event: MouseEvent) => event.preventDefault(),
                }),
                multiple,
                index,
                option,
                size: optionsSize,
                disabled: option.disabled,
                highlighted: index === highlightedIndex,
                selected: selectedItems.some(({ key }) => key === option.key),
                dataTestId: getDataTestId(dataTestId, 'option'),
            }),
            [
                dataTestId,
                getItemProps,
                highlightedIndex,
                multiple,
                optionClassName,
                optionProps,
                optionsSize,
                selectedItems,
            ],
        );

        useEffect(() => {
            if (defaultOpen) openMenu();
        }, [defaultOpen, openMenu]);

        useEffect(() => {
            if (openProp) {
                openMenu();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const calcOptionsListWidth = useCallback(() => {
            if (listRef.current) {
                const widthAttr = optionsListWidth === 'field' ? 'width' : 'minWidth';

                const optionsListMinWidth = rootRef.current
                    ? rootRef.current.getBoundingClientRect().width
                    : 0;

                listRef.current.setAttribute('style', '');
                listRef.current.style[widthAttr] = `${optionsListMinWidth}px`;
            }
        }, [optionsListWidth]);

        useEffect(() => {
            const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
            const observer = new ResizeObserver(calcOptionsListWidth);

            if (rootRef.current) {
                observer.observe(rootRef.current);
            }

            return () => {
                observer.disconnect();
            };
        }, [calcOptionsListWidth, open, optionsListWidth]);

        useLayoutEffect_SAFE_FOR_SSR(calcOptionsListWidth, [
            open,
            optionsListWidth,
            filteredOptions,
            selectedItems,
        ]);

        const renderValue = useCallback(
            () =>
                selectedItems.map((option) => (
                    <input type='hidden' name={name} value={option.key} key={option.key} />
                )),
            [selectedItems, name],
        );

        const renderNativeSelect = useCallback(() => {
            const value = multiple
                ? selectedItems.map((option) => option.key)
                : (selectedItems[0] || {}).key;

            return (
                <NativeSelect
                    {...menuProps}
                    className={styles.nativeSelect}
                    disabled={disabled}
                    multiple={multiple}
                    name={name}
                    value={value}
                    onChange={handleNativeSelectChange}
                    options={filteredOptions}
                />
            );
        }, [
            multiple,
            selectedItems,
            disabled,
            name,
            handleNativeSelectChange,
            filteredOptions,
            menuProps,
        ]);

        const { header, emptyPlaceholder } = optionsListProps as OptionsListProps;

        const renderOptionsListHeader = () => {
            if (!showSearch && !header) {
                return null;
            }

            const handleClear: SearchProps['onClear'] = (event) => {
                setSearch?.('');
                searchProps?.componentProps?.onClear?.(event);
            };

            const handleChange: SearchProps['onChange'] = (event, payload) => {
                setSearch?.(payload.value);
                searchProps?.componentProps?.onChange?.(event, payload);
            };

            return (
                <React.Fragment>
                    {header}
                    {showSearch && (
                        <Search
                            {...searchProps?.componentProps}
                            value={search}
                            onChange={handleChange}
                            dataTestId={getDataTestId(dataTestId, 'search')}
                            onClear={handleClear}
                            className={cn(styles.search, searchProps?.componentProps?.className)}
                            ref={searchRef}
                        />
                    )}
                </React.Fragment>
            );
        };

        const needRenderOptionsList = flatOptions.length > 0 || showEmptyOptionsList || showSearch;

        const renderEmptyPlaceholder = useCallback(() => {
            if (emptyPlaceholder) {
                return emptyPlaceholder;
            }

            if (showSearch) {
                return <div className={styles.emptySearchPlaceholder}>Ничего не нашлось</div>;
            }

            return undefined;
        }, [emptyPlaceholder, showSearch]);

        return (
            <div
                {...getComboboxProps({
                    ref: rootRef,
                    ...(disabled && { 'aria-disabled': true }),
                    className: cn(styles.component, { [styles.block]: block }, className),
                })}
                onKeyDown={disabled ? undefined : handleFieldKeyDown}
                tabIndex={-1}
                data-test-id={getDataTestId(dataTestId)}
            >
                {nativeSelect && renderNativeSelect()}

                <Field
                    selectedMultiple={selectedItems}
                    selected={selectedItems[0]}
                    setSelectedItems={setSelectedItems}
                    toggleMenu={toggleMenu}
                    multiple={multiple}
                    open={open}
                    disabled={disabled}
                    size={size}
                    placeholder={placeholder}
                    label={label && <span {...getLabelProps()}>{label}</span>}
                    labelView={labelView}
                    Arrow={Arrow && <Arrow open={open} />}
                    error={error}
                    hint={hint}
                    valueRenderer={valueRenderer}
                    className={fieldClassName}
                    innerProps={{
                        onBlur: handleFieldBlur,
                        onFocus: disabled ? undefined : handleFieldFocus,
                        onClick: disabled ? undefined : handleFieldClick,
                        tabIndex: disabled ? undefined : nativeSelect ? -1 : 0,
                        ref: mergeRefs([inputProps.ref]),
                        id: inputProps.id,
                        'aria-labelledby': inputProps['aria-labelledby'],
                        'aria-controls': inputProps['aria-controls'],
                        'aria-autocomplete': autocomplete
                            ? inputProps['aria-autocomplete']
                            : undefined,
                    }}
                    dataTestId={getDataTestId(dataTestId, 'field')}
                    {...(fieldProps as AnyObject)}
                />

                {name && !nativeSelect && renderValue()}

                {!nativeSelect && (
                    <Popover
                        open={open}
                        withTransition={false}
                        anchorElement={fieldRef.current as HTMLElement}
                        position={popoverPosition}
                        preventFlip={preventFlip}
                        popperClassName={cn(styles.popoverInner, popperClassName)}
                        update={updatePopover}
                        zIndex={zIndexPopover}
                    >
                        {needRenderOptionsList && (
                            <div
                                {...menuProps}
                                className={cn(optionsListClassName, styles.optionsList)}
                            >
                                <OptionsList
                                    {...(optionsListProps as AnyObject)}
                                    optionsListWidth={optionsListWidth}
                                    flatOptions={flatOptions}
                                    highlightedIndex={highlightedIndex}
                                    open={open}
                                    size={size}
                                    options={filteredOptions}
                                    Optgroup={Optgroup}
                                    Option={Option}
                                    selectedItems={selectedItems}
                                    setSelectedItems={setSelectedItems}
                                    toggleMenu={toggleMenu}
                                    getOptionProps={getOptionProps}
                                    visibleOptions={visibleOptions}
                                    onScroll={onScroll}
                                    dataTestId={getDataTestId(dataTestId, 'options-list')}
                                    header={renderOptionsListHeader()}
                                    emptyPlaceholder={renderEmptyPlaceholder()}
                                />
                                <div className={styles.optionsListBorder} />
                            </div>
                        )}
                    </Popover>
                )}
            </div>
        );
    },
);
