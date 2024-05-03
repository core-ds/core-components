/* eslint-disable no-nested-ternary */
import React, {
    FC,
    FocusEvent,
    forwardRef,
    ForwardRefExoticComponent,
    KeyboardEvent,
    MouseEvent,
    RefAttributes,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import cn from 'classnames';
import { compute } from 'compute-scroll-into-view';
import {
    useCombobox,
    useMultipleSelection,
    UseMultipleSelectionProps,
    UseMultipleSelectionState,
} from 'downshift';

import type { BottomSheetProps } from '@alfalab/core-components-bottom-sheet';
import type { ModalMobileProps } from '@alfalab/core-components-modal/mobile';
import type {
    ModalContentProps,
    ModalFooterProps,
    ModalHeaderProps,
} from '@alfalab/core-components-modal/shared';
import type { PopoverProps } from '@alfalab/core-components-popover';
import { fnUtils, getDataTestId } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import type {
    AdditionalMobileProps,
    AnyObject,
    BaseSelectProps,
    BottomSheetSelectMobileProps,
    ModalSelectMobileProps,
    OptionShape,
    OptionsListProps,
    SearchProps,
} from '../../typings';
import { defaultAccessor, defaultFilterFn, processOptions } from '../../utils';
import { NativeSelect } from '../native-select';

import styles from './index.module.css';
import mobileStyles from './mobile.module.css';

type ComponentProps = BaseSelectProps &
    AdditionalMobileProps &
    BottomSheetSelectMobileProps &
    ModalSelectMobileProps & {
        isBottomSheet?: boolean;
        view: 'desktop' | 'mobile';
        Popover?: ForwardRefExoticComponent<PopoverProps & RefAttributes<HTMLDivElement>>;
        BottomSheet?: React.ForwardRefExoticComponent<
            BottomSheetProps & React.RefAttributes<HTMLDivElement>
        >;
        ModalMobile?: ForwardRefExoticComponent<
            ModalMobileProps & RefAttributes<HTMLDivElement>
        > & {
            Header: FC<ModalHeaderProps>;
            Footer: FC<ModalFooterProps>;
            Content: FC<ModalContentProps>;
        };
    };

const itemToString = (option: OptionShape | null) => (option ? option.key : '');

const isItemDisabled = (option: OptionShape | null) => Boolean(option?.disabled);

export const BaseSelect = forwardRef(
    // TODO: 😭
    // eslint-disable-next-line complexity
    (
        {
            dataTestId,
            className,
            fieldClassName,
            optionGroupClassName,
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
            size = 48,
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
            view,
            isBottomSheet = true,
            footer,
            swipeable,
            modalProps,
            popoverProps,
            modalFooterProps,
            modalHeaderProps,
            bottomSheetProps,
            Popover,
            ModalMobile,
            BottomSheet,
        }: ComponentProps,
        ref,
    ) => {
        const rootRef = useRef<HTMLDivElement>(null);
        const fieldRef = useRef<HTMLInputElement>(null);
        const listRef = useRef<HTMLDivElement>(null);
        const initiatorRef = useRef<OptionShape | null>(null);
        const searchRef = useRef<HTMLInputElement>(null);
        const scrollableContainerRef = useRef<HTMLDivElement>(null);
        const onOpenRef = useRef(onOpen);

        const [searchState, setSearchState] = React.useState('');

        const [search, setSearch] =
            typeof searchProps?.value === 'string'
                ? [searchProps.value, searchProps.onChange]
                : [searchState, setSearchState];

        const accessor = searchProps.accessor || defaultAccessor;
        const filterFn = searchProps.filterFn || defaultFilterFn;

        const { filteredOptions, flatOptions, selectedOptions } = useMemo(
            () => processOptions(options, selected, (option) => filterFn(accessor(option), search)),
            [filterFn, accessor, options, search, selected],
        );

        const scrollIntoView = (node: HTMLElement) => {
            if (!node || view === 'mobile') return;

            requestAnimationFrame(() => {
                const actions = compute(node, {
                    boundary: listRef.current,
                    block: 'nearest',
                    scrollMode: 'if-needed',
                });

                actions.forEach((action) => {
                    const { el, top } = action;

                    el.scrollTop = top;
                });
            });
        };

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

        onOpenRef.current = onOpen;

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
            getLabelProps,
            highlightedIndex,
            toggleMenu,
            openMenu,
            closeMenu,
            setHighlightedIndex,
        } = useCombobox<OptionShape>({
            id,
            isOpen: openProp,
            items: flatOptions,
            itemToString,
            isItemDisabled,
            defaultHighlightedIndex: selectedItems.length === 0 ? -1 : undefined,
            scrollIntoView,
            onSelectedItemChange: (changes) => {
                const selectedItem = changes.selectedItem || initiatorRef.current;

                if (selectedItem && !selectedItem.disabled) {
                    const alreadySelected = selectedItems.includes(selectedItem);
                    const allowRemove = allowUnselect || (multiple && selectedItems.length > 1);

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
            },
            onIsOpenChange: (changes) => {
                if (onOpenRef.current) {
                    /**
                     *  Вызываем обработчик асинхронно.
                     *
                     * Иначе при клике вне открытого селекта сначала сработает onOpen, который закроет селект,
                     * А затем сработает onClick кнопки открытия\закрытия с open=false и в итоге селект откроется снова.
                     */
                    setTimeout(() => {
                        onOpenRef.current?.({
                            open: changes.isOpen,
                            name,
                        });
                    }, 0);
                }

                if (showSearch) {
                    if (changes.isOpen && view === 'desktop') {
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

                switch (type) {
                    case useCombobox.stateChangeTypes.InputKeyDownArrowDown:
                        if (!circularNavigation && state.highlightedIndex === options.length - 1) {
                            return { ...changes, highlightedIndex: state.highlightedIndex };
                        }

                        return changes;
                    case useCombobox.stateChangeTypes.InputKeyDownArrowUp:
                        if (!circularNavigation && state.highlightedIndex === 0) {
                            return { ...changes, highlightedIndex: state.highlightedIndex };
                        }

                        return changes;

                    case useCombobox.stateChangeTypes.InputKeyDownEnter:
                    case useCombobox.stateChangeTypes.ItemClick: {
                        const { selectedItem } = changes;

                        initiatorRef.current = selectedItem || null;

                        return {
                            ...changes,
                            selectedItem: state.selectedItem === selectedItem ? null : selectedItem,
                            isOpen: !closeOnSelect || (view === 'mobile' && multiple),
                            // при closeOnSelect === false - сохраняем подсвеченный индекс
                            highlightedIndex:
                                state.isOpen && !closeOnSelect
                                    ? state.highlightedIndex
                                    : changes.highlightedIndex,
                        };
                    }
                    default:
                        return changes;
                }
            },
        });

        useEffect(() => {
            /*
             * При изменении openProp, состояние внутри downshift в useEnhancedReducer не меняется, поэтому меняем его таким способом
             * Скорее всего это исправят в будущих версиях downshift
             */
            if (openProp !== undefined) {
                if (openProp) {
                    openMenu();
                } else {
                    closeMenu();
                }
            }
        }, [openProp, openMenu, closeMenu]);

        const inputProps = getInputProps(getDropdownProps({ ref: mergeRefs([ref, fieldRef]) }));
        const { ref: menuRef, ...menuProps } = getMenuProps(
            { ref: listRef },
            { suppressRefError: true },
        );

        const handleEntered = (node: HTMLElement, isAppearing: boolean) => {
            if (showSearch) searchRef.current?.focus();

            if (isBottomSheet) {
                bottomSheetProps?.transitionProps?.onEntered?.(node, isAppearing);
            } else {
                modalProps?.transitionProps?.onEntered?.(node, isAppearing);
            }
        };

        const handleFieldFocus = (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => {
            if (onFocus) onFocus(event);

            if (autocomplete && !open) {
                openMenu();
            }
        };

        const handleFieldBlur = (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => {
            if (view === 'desktop') {
                const isNextFocusInsideField = fieldRef.current?.contains(
                    (event.relatedTarget || document.activeElement) as HTMLElement,
                );

                const isNextFocusInsideList = listRef.current?.contains(
                    (event.relatedTarget || document.activeElement) as HTMLElement,
                );

                if (!isNextFocusInsideField && !isNextFocusInsideList) {
                    if (onBlur) onBlur(event);

                    inputProps.onBlur?.(event);
                }
            }

            if (view === 'mobile' && !open && onBlur) onBlur(event);
        };

        const handleFieldKeyDown = (event: KeyboardEvent<HTMLDivElement | HTMLInputElement>) => {
            inputProps.onKeyDown?.(event);

            // https://caniuse.com/?search=KeyboardEvent.key
            const isKeyUnsupported = event.key === 'Unidentified';

            if (
                autocomplete &&
                !open &&
                (isKeyUnsupported || event.key.length === 1 || event.key === 'Backspace')
            ) {
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

        const getOptionProps = (option: OptionShape, index: number) => ({
            ...(optionProps as object),
            mobile: view === 'mobile',
            className: cn(optionClassName, {
                [mobileStyles.option]: view === 'mobile',
            }),
            innerProps: getItemProps({
                index,
                item: option,
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
        });

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
            if (view === 'desktop' && listRef.current) {
                const widthAttr = optionsListWidth === 'field' ? 'width' : 'minWidth';

                const optionsListMinWidth = rootRef.current
                    ? rootRef.current.getBoundingClientRect().width
                    : 0;

                listRef.current.setAttribute('style', '');
                listRef.current.style[widthAttr] = `${optionsListMinWidth}px`;
            }
        }, [view, optionsListWidth]);

        useEffect(() => {
            if (view === 'desktop') {
                const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
                const observer = new ResizeObserver(calcOptionsListWidth);

                if (rootRef.current) {
                    observer.observe(rootRef.current);
                }

                return () => {
                    observer.disconnect();
                };
            }

            return fnUtils.noop;
        }, [view, calcOptionsListWidth, open, optionsListWidth]);

        useLayoutEffect_SAFE_FOR_SSR(calcOptionsListWidth, [
            open,
            optionsListWidth,
            filteredOptions,
            selectedItems,
        ]);

        const renderValue = () =>
            selectedItems.map((option) => (
                <input type='hidden' name={name} value={option.key} key={option.key} />
            ));

        const renderNativeSelect = () => {
            const value = multiple
                ? selectedItems.map((option) => option.key)
                : (selectedItems[0] || {}).key;

            return (
                <NativeSelect
                    {...(menuProps as AnyObject)}
                    className={styles.nativeSelect}
                    disabled={disabled}
                    multiple={multiple}
                    name={name}
                    value={value}
                    onChange={handleNativeSelectChange}
                    options={filteredOptions}
                />
            );
        };

        const renderSearch = () => {
            if (!showSearch) return null;

            const handleClear: SearchProps['onClear'] = (event) => {
                setSearch?.('');
                searchProps?.componentProps?.onClear?.(event);
            };

            const handleChange: SearchProps['onChange'] = (event, payload) => {
                setSearch?.(payload.value);
                searchProps?.componentProps?.onChange?.(event, payload);
            };

            return (
                <Search
                    {...searchProps?.componentProps}
                    value={search}
                    onChange={handleChange}
                    dataTestId={getDataTestId(dataTestId, 'search')}
                    onClear={handleClear}
                    className={cn(searchProps?.componentProps?.className, {
                        [styles.search]: view === 'desktop',
                        [mobileStyles.search]: view === 'mobile',
                    })}
                    ref={mergeRefs([searchRef, searchProps?.componentProps?.ref || null])}
                />
            );
        };

        const { header, emptyPlaceholder } = optionsListProps as OptionsListProps;

        const renderOptionsListHeader = () => {
            if (header || (view === 'desktop' && showSearch)) {
                return (
                    <React.Fragment>
                        {header}
                        {view === 'desktop' && renderSearch()}
                    </React.Fragment>
                );
            }

            return null;
        };

        const renderEmptyPlaceholder = () => {
            if (emptyPlaceholder) {
                return emptyPlaceholder;
            }

            if (showSearch) {
                return <div className={styles.emptySearchPlaceholder}>Ничего не нашлось</div>;
            }

            return undefined;
        };

        const renderOptionsList = () => {
            if (flatOptions.length === 0 && !showEmptyOptionsList && !showSearch) return null;

            const listProps = optionsListProps as OptionsListProps & RefAttributes<HTMLDivElement>;

            return (
                <div
                    {...menuProps}
                    ref={view === 'desktop' ? menuRef : undefined}
                    className={cn(
                        optionsListClassName,
                        view === 'mobile' && mobileStyles.optionsListWrapper,
                        view === 'desktop' && styles.optionsListWrapper,
                    )}
                >
                    <OptionsList
                        {...listProps}
                        ref={view === 'desktop' ? listProps.ref : scrollableContainerRef}
                        setHighlightedIndex={view === 'desktop' ? setHighlightedIndex : undefined}
                        className={cn({ [mobileStyles.optionsList]: view === 'mobile' })}
                        scrollbarClassName={cn({ [mobileStyles.scrollbar]: view === 'mobile' })}
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
                        visibleOptions={view === 'desktop' ? visibleOptions : 0}
                        dataTestId={getDataTestId(dataTestId, 'options-list')}
                        header={renderOptionsListHeader()}
                        optionGroupClassName={cn(optionGroupClassName, {
                            [mobileStyles.optionGroup]: view === 'mobile',
                        })}
                        emptyPlaceholder={renderEmptyPlaceholder()}
                        onScroll={onScroll}
                    />
                    {view === 'desktop' && <div className={styles.optionsListBorder} />}
                </div>
            );
        };

        const renderInPopover = () => {
            if (!nativeSelect && Popover) {
                return (
                    <Popover
                        {...popoverProps}
                        open={open}
                        withTransition={false}
                        anchorElement={fieldRef.current as HTMLElement}
                        position={popoverPosition}
                        preventFlip={preventFlip}
                        popperClassName={cn(styles.popoverInner, popperClassName)}
                        update={updatePopover}
                        zIndex={zIndexPopover}
                    >
                        {renderOptionsList()}
                    </Popover>
                );
            }

            return null;
        };

        const renderInBottomSheet = () => {
            if (!nativeSelect && BottomSheet) {
                return (
                    <BottomSheet
                        dataTestId={getDataTestId(dataTestId, 'bottom-sheet')}
                        open={open}
                        className={mobileStyles.sheet}
                        contentClassName={mobileStyles.sheetContent}
                        containerClassName={mobileStyles.sheetContainer}
                        title={label || placeholder}
                        actionButton={footer}
                        stickyHeader={true}
                        hasCloser={true}
                        swipeable={swipeable}
                        initialHeight={showSearch ? 'full' : 'default'}
                        {...bottomSheetProps}
                        sheetContainerRef={menuRef}
                        scrollableContainerRef={scrollableContainerRef}
                        onClose={() => {
                            closeMenu();
                            bottomSheetProps?.onClose?.();
                        }}
                        transitionProps={{
                            ...bottomSheetProps?.transitionProps,
                            onEntered: handleEntered,
                        }}
                        bottomAddons={
                            <React.Fragment>
                                {renderSearch()}
                                {bottomSheetProps?.bottomAddons}
                            </React.Fragment>
                        }
                        containerProps={{
                            ...bottomSheetProps?.containerProps,
                            onScroll,
                        }}
                    >
                        {renderOptionsList()}
                    </BottomSheet>
                );
            }

            return null;
        };

        const renderInModalMobile = () => {
            if (!nativeSelect && ModalMobile) {
                return (
                    <ModalMobile
                        dataTestId={getDataTestId(dataTestId, 'modal')}
                        open={open}
                        hasCloser={true}
                        {...modalProps}
                        componentRef={menuRef}
                        onClose={(...args) => {
                            closeMenu();
                            modalProps?.onClose?.(...args);
                        }}
                        contentClassName={cn(
                            mobileStyles.sheetContent,
                            modalProps?.contentClassName,
                        )}
                        ref={mergeRefs([
                            scrollableContainerRef,
                            modalProps?.ref as React.Ref<HTMLDivElement>,
                        ])}
                        wrapperProps={{
                            ...modalProps?.wrapperProps,
                            onScroll,
                        }}
                        transitionProps={{
                            ...modalProps?.transitionProps,
                            onEntered: handleEntered,
                        }}
                    >
                        <ModalMobile.Header
                            hasCloser={true}
                            sticky={true}
                            {...modalHeaderProps}
                            title={undefined}
                            bottomAddons={
                                <React.Fragment>
                                    {renderSearch()}
                                    {modalHeaderProps?.bottomAddons}
                                </React.Fragment>
                            }
                        >
                            {modalHeaderProps?.title || label || placeholder}
                        </ModalMobile.Header>

                        <ModalMobile.Content flex={true} className={mobileStyles.modalContent}>
                            {renderOptionsList()}
                        </ModalMobile.Content>

                        {modalFooterProps?.children && <ModalMobile.Footer {...modalFooterProps} />}
                    </ModalMobile>
                );
            }

            return null;
        };

        return (
            <div
                {...(disabled && { 'aria-disabled': true })}
                aria-expanded={inputProps['aria-expanded']}
                aria-haspopup='listbox'
                role={inputProps.role}
                className={cn(styles.component, { [styles.block]: block }, className)}
                ref={rootRef}
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
                        ref: inputProps.ref,
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

                {view === 'desktop' && renderInPopover()}
                {view === 'mobile' && isBottomSheet && renderInBottomSheet()}
                {view === 'mobile' && !isBottomSheet && renderInModalMobile()}
            </div>
        );
    },
);
