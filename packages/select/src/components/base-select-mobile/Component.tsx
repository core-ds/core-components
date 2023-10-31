import React, {
    FocusEvent,
    forwardRef,
    KeyboardEvent,
    MouseEvent,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import {
    useCombobox,
    useMultipleSelection,
    UseMultipleSelectionProps,
    UseMultipleSelectionState,
} from 'downshift';

import { BottomSheet, BottomSheetProps } from '@alfalab/core-components-bottom-sheet';
import { ModalMobile } from '@alfalab/core-components-modal/mobile';
import { getDataTestId } from '@alfalab/core-components-shared';

import {
    AnyObject,
    BaseSelectProps,
    OptionProps,
    OptionShape,
    OptionsListProps,
} from '../../typings';
import { defaultAccessor, defaultFilterFn, processOptions } from '../../utils';
import { Arrow as DefaultArrow } from '../arrow';
import { Field as DefaultField } from '../field';
import { Optgroup as DefaultOptgroup } from '../optgroup';
import { Option as DefaultOption } from '../option';
import { OptionsList as DefaultOptionsList } from '../options-list';
import { Search as DefaultSearch } from '../search';

import styles from './index.module.css';

export type SelectMobileProps = Omit<BaseSelectProps, 'Checkmark' | 'onScroll'> & {
    /**
     * Футер
     * @deprecated Используйте bottomSheetProps.actionButton
     */
    footer?: ReactNode;

    /**
     * Будет ли свайпаться шторка
     * @deprecated Используйте bottomSheetProps.swipeable
     */
    swipeable?: boolean;

    /**
     * Отображать в BottomSheet
     */
    isBottomSheet?: boolean;

    /**
     * Дополнительные пропсы шторки
     */
    bottomSheetProps?: Partial<BottomSheetProps>;

    /**
     *  Дополнительные пропсы модалки
     */
    modalProps?: Partial<React.ComponentProps<typeof ModalMobile>>;

    /**
     *  Дополнительные пропсы шапки модалки
     */
    modalHeaderProps?: Partial<React.ComponentProps<typeof ModalMobile.Header>>;

    /**
     *  Дополнительные пропсы футера модалки
     */
    modalFooterProps?: Partial<React.ComponentProps<typeof ModalMobile.Footer>>;
};

export const BaseSelectMobile = forwardRef(
    (
        {
            dataTestId,
            className,
            fieldClassName,
            optionsListClassName,
            optionClassName,
            optionGroupClassName,
            optionsListProps,
            options = [],
            autocomplete = false,
            multiple = false,
            allowUnselect = false,
            disabled = false,
            closeOnSelect = !multiple,
            circularNavigation = false,
            defaultOpen = false,
            open: openProp,
            optionsListWidth = 'content',
            name,
            id,
            selected = [],
            size = 'm',
            optionsSize = 'm',
            error,
            hint,
            block,
            label,
            labelView,
            placeholder,
            fieldProps = {},
            optionProps = {},
            searchProps = {},
            showSearch = false,
            valueRenderer,
            onChange,
            onOpen,
            onFocus,
            onBlur,
            Arrow = DefaultArrow,
            Field = DefaultField,
            Optgroup = DefaultOptgroup,
            Option = DefaultOption,
            OptionsList = DefaultOptionsList,
            Search = DefaultSearch,
            swipeable,
            footer,
            isBottomSheet,
            bottomSheetProps,
            modalProps,
            modalHeaderProps,
            modalFooterProps,
            showEmptyOptionsList = false,
        }: SelectMobileProps,
        ref,
    ) => {
        const rootRef = useRef<HTMLLabelElement>(null);
        const fieldRef = useRef<HTMLInputElement>(null);
        const listRef = useRef<HTMLDivElement>(null);
        const initiatorRef = useRef<OptionShape | null>(null);
        const alreadyClickedRef = useRef<boolean>(false);
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

        const scrollableContainerRef = useRef<HTMLDivElement>(null);

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
            defaultHighlightedIndex: -1,
            onIsOpenChange: ({ isOpen }) => {
                if (onOpen) {
                    /**
                     *  Вызываем обработчик асинхронно.
                     *
                     * Иначе при клике вне открытого селекта сначала сработает onOpen, который закроет селект,
                     * А затем сработает onClick кнопки открытия\закрытия с open=false и в итоге селект откроется снова.
                     */
                    setTimeout(() => {
                        onOpen({
                            open: isOpen,
                            name,
                        });
                    }, 0);
                }

                if (showSearch) {
                    if (isOpen) {
                        setTimeout(() => {
                            searchRef.current?.focus();
                            // BottomSheet transition duration
                        }, 500);
                    } else {
                        setSearch?.('');
                    }
                }
            },
            stateReducer: (state, actionAndChanges) => {
                const { type, changes } = actionAndChanges;
                const { selectedItem } = changes;

                switch (type) {
                    case useCombobox.stateChangeTypes.InputBlur:
                        return state;
                    case useCombobox.stateChangeTypes.InputKeyDownEnter:
                    case useCombobox.stateChangeTypes.ItemClick:
                        initiatorRef.current = selectedItem;

                        if (selectedItem && !selectedItem.disabled && !alreadyClickedRef.current) {
                            // TODO!!! Проблема downshift + React 18. ItemClick срабатывает дважды. См https://github.com/downshift-js/downshift/issues/1384
                            if (React.version.indexOf('18') === 0) {
                                alreadyClickedRef.current = true;
                                setTimeout(() => {
                                    alreadyClickedRef.current = false;
                                });
                            }
                            const alreadySelected = selectedItems.includes(selectedItem);
                            const allowRemove =
                                allowUnselect || (multiple && selectedItems.length > 1);

                            if (alreadySelected && allowRemove) {
                                if (multiple) {
                                    removeSelectedItem(selectedItem);
                                } else {
                                    setSelectedItems([]);
                                }
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
                            isOpen: !closeOnSelect || multiple,
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
            if (!open && onBlur) onBlur(event);
        };

        const handleFieldKeyDown = (event: KeyboardEvent<HTMLDivElement | HTMLInputElement>) => {
            inputProps.onKeyDown(event);

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

        const getOptionProps = (option: OptionShape, index: number): OptionProps => {
            const selectedItem = selectedItems.some(({ key }) => key === option.key);

            return {
                ...(optionProps as object),
                mobile: true,
                className: cn(styles.option, optionClassName),
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
                selected: selectedItem,
                dataTestId: getDataTestId(dataTestId, 'option'),
            };
        };

        useEffect(() => {
            if (defaultOpen) openMenu();
        }, [defaultOpen, openMenu]);

        useEffect(() => {
            if (openProp) {
                openMenu();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const handleClose = () => {
            toggleMenu();
        };

        const renderValue = () =>
            selectedItems.map((option) => (
                <input type='hidden' name={name} value={option.key} key={option.key} />
            ));

        const renderSearch = () =>
            showSearch && (
                <Search
                    {...searchProps?.componentProps}
                    value={search}
                    onChange={(_, payload) => setSearch?.(payload.value)}
                    dataTestId={getDataTestId(dataTestId, 'search')}
                    onClear={() => setSearch?.('')}
                    className={styles.search}
                    ref={searchRef}
                />
            );

        const { emptyPlaceholder } = optionsListProps as OptionsListProps;

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

            return (
                <div {...menuProps} className={cn(styles.optionsListWrapper, optionsListClassName)}>
                    <OptionsList
                        {...(optionsListProps as OptionsListProps)}
                        ref={scrollableContainerRef}
                        className={styles.optionsList}
                        scrollbarClassName={styles.scrollbar}
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
                        visibleOptions={0}
                        dataTestId={getDataTestId(dataTestId, 'options-list')}
                        optionGroupClassName={cn(styles.optionGroup, optionGroupClassName)}
                        emptyPlaceholder={renderEmptyPlaceholder()}
                    />
                </div>
            );
        };

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
                        tabIndex: disabled ? -1 : 0,
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

                {name && renderValue()}

                {isBottomSheet ? (
                    <BottomSheet
                        open={open}
                        onClose={handleClose}
                        className={styles.sheet}
                        contentClassName={styles.sheetContent}
                        containerClassName={styles.sheetContainer}
                        title={label || placeholder}
                        actionButton={footer}
                        stickyHeader={true}
                        hasCloser={true}
                        swipeable={swipeable}
                        scrollableContainerRef={scrollableContainerRef}
                        initialHeight={showSearch ? 'full' : 'default'}
                        {...bottomSheetProps}
                        bottomAddons={
                            <React.Fragment>
                                {renderSearch()}
                                {bottomSheetProps?.bottomAddons}
                            </React.Fragment>
                        }
                    >
                        {renderOptionsList()}
                    </BottomSheet>
                ) : (
                    <ModalMobile
                        open={open}
                        hasCloser={true}
                        {...modalProps}
                        onClose={(...args) => {
                            handleClose();
                            modalProps?.onClose?.(...args);
                        }}
                        contentClassName={cn(styles.sheetContent, modalProps?.contentClassName)}
                        ref={mergeRefs([
                            scrollableContainerRef,
                            modalProps?.ref as React.Ref<HTMLDivElement>,
                        ])}
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

                        <ModalMobile.Content flex={true} className={styles.modalContent}>
                            {renderOptionsList()}
                        </ModalMobile.Content>

                        {modalFooterProps?.children && <ModalMobile.Footer {...modalFooterProps} />}
                    </ModalMobile>
                )}
            </div>
        );
    },
);