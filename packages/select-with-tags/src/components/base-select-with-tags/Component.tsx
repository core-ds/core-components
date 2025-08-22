import React, {
    ChangeEvent,
    FC,
    forwardRef,
    ForwardRefExoticComponent,
    Ref,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';

import type { BottomSheetProps } from '@alfalab/core-components-bottom-sheet';
import type { FormControlProps } from '@alfalab/core-components-form-control';
import type { PopoverProps } from '@alfalab/core-components-popover';
import {
    AnyObject,
    Arrow as DefaultArrow,
    BaseSelect,
    BaseSelectProps,
    FieldProps,
    Footer,
    Optgroup as DefaultOptgroup,
    Option as DefaultOption,
    OptionShape,
    OptionsList as DefaultOptionsList,
    Search,
} from '@alfalab/core-components-select/shared';

import { SelectWithTagsProps } from '../../types';
import { filterOptions } from '../../utils';
import { TagList } from '../tag-list';

type BaseSelectWithTagsProps = SelectWithTagsProps & {
    view: 'mobile' | 'desktop';
    FormControlComponent: ForwardRefExoticComponent<FormControlProps>;
    Popover?: ForwardRefExoticComponent<PopoverProps>;
    BottomSheet?: ForwardRefExoticComponent<BottomSheetProps>;
};

export const BaseSelectWithTags = forwardRef<HTMLInputElement, BaseSelectWithTagsProps>(
    (
        {
            OptionsList = DefaultOptionsList,
            Optgroup = DefaultOptgroup,
            Option = DefaultOption,
            Arrow = DefaultArrow,
            value,
            selected: selectedProp,
            size = 72,
            onOpen,
            onInput,
            onChange,
            options,
            autocomplete = true,
            match,
            allowUnselect = true,
            collapseTagList = false,
            moveInputToNewLine = true,
            transformCollapsedTagText,
            transformTagText,
            Tag,
            view,
            FormControlComponent,
            dataTestId,
            open: openProp,
            searchProps,
            ...restProps
        },
        ref,
    ) => {
        const controlled = Boolean(selectedProp);

        const [selectedTags, setSelectedTags] = useState(selectedProp || []);
        const [open, setOpen] = useState<boolean | undefined>(false);
        const updatePopover = useRef(() => null);
        const inputRef = useRef<HTMLInputElement>(null);
        const frozenValue = useRef<Array<string | OptionShape>>([]);

        const selected = selectedProp || selectedTags;
        const isAutocomplete = autocomplete || Boolean(match);

        const resetValue = () => {
            if (value) {
                const event = { target: { value: '' } };

                if (onInput) {
                    onInput(event as ChangeEvent<HTMLInputElement>);
                }
            }
        };

        const handleUpdatePopover = useCallback(() => {
            if (updatePopover && updatePopover.current) {
                requestAnimationFrame(() => updatePopover.current?.());
            }
        }, []);

        const updateSelectedTags: SelectWithTagsProps['onChange'] = (payload) => {
            onChange?.(payload);

            if (!controlled) {
                setSelectedTags(payload.selectedMultiple);
            }
        };

        const handleDeleteTag = (deletedKey: string) => {
            const tags = selected.filter((tag) => {
                const key = typeof tag === 'string' ? tag : tag.key;

                return deletedKey !== key;
            });

            updateSelectedTags({ selectedMultiple: tags });
        };

        const handleChange: Required<BaseSelectProps>['onChange'] = (payload) => {
            updateSelectedTags(payload);
            resetValue();
        };

        const handleOpen: Required<BaseSelectProps>['onOpen'] = (payload) => {
            const { open: isOpen } = payload;

            if (isOpen) {
                frozenValue.current = selected;
            } else {
                resetValue();
            }

            onOpen?.(payload);
            setOpen(isOpen);
        };

        const filteredOptions = useMemo(
            () => filterOptions(options, value ?? '', match),
            [options, value, match],
        );

        const isOpen = Boolean(openProp ?? open);

        return (
            <BaseSelect
                {...restProps}
                open={isOpen}
                dataTestId={dataTestId}
                view={view}
                ref={ref}
                Option={Option}
                Field={TagList as FC<FieldProps>}
                Optgroup={Optgroup}
                OptionsList={OptionsList}
                Arrow={Arrow}
                multiple={true}
                updatePopover={updatePopover}
                allowUnselect={allowUnselect}
                showEmptyOptionsList={true}
                fieldProps={{
                    value,
                    isOpen,
                    autocomplete: view === 'desktop' && isAutocomplete,
                    onInput,
                    handleDeleteTag,
                    Tag,
                    collapseTagList,
                    moveInputToNewLine,
                    transformCollapsedTagText,
                    transformTagText,
                    handleUpdatePopover,
                    FormControlComponent,
                    ...(view === 'mobile' && isOpen
                        ? { selectedMultiple: frozenValue.current }
                        : null),
                }}
                selected={selected}
                autocomplete={view === 'desktop' && isAutocomplete}
                size={size}
                options={filteredOptions}
                onChange={handleChange}
                onOpen={handleOpen}
                {...(view === 'mobile'
                    ? (() => {
                          const handleApply = () => {
                              setOpen(false);
                              resetValue();
                          };

                          const handleClear = () => {
                              setOpen(false);
                              updateSelectedTags({ selectedMultiple: [] });
                              resetValue();
                          };

                          const handleClose = () => {
                              updateSelectedTags({ selectedMultiple: frozenValue.current });
                          };

                          const handleOptionsListTouchMove = () => {
                              const input = inputRef.current;

                              if (input && document.activeElement === input) {
                                  input.blur();
                              }
                          };

                          return {
                              showSearch: isAutocomplete,
                              Search,
                              searchProps: {
                                  filterFn: () => true,
                                  ...searchProps,
                                  value,
                                  componentProps: {
                                      leftAddons: null,
                                      clear: true,
                                      onClear: resetValue,
                                      ...searchProps?.componentProps,
                                      ref: mergeRefs([
                                          inputRef,
                                          searchProps?.componentProps?.ref as Ref<HTMLInputElement>,
                                      ]),
                                      onChange: onInput,
                                  },
                              },
                              bottomSheetProps: {
                                  showFooter: false,
                                  showSwipeMarker: false,
                                  onClose: handleClose,
                                  containerProps: {
                                      onTouchMove: handleOptionsListTouchMove,
                                  },
                              },
                              optionsListProps: {
                                  footer: (
                                      <Footer
                                          showClear={true}
                                          handleClear={handleClear}
                                          handleApply={handleApply}
                                          dataTestId={dataTestId}
                                      />
                                  ),
                                  ...(restProps.optionsListProps as AnyObject),
                              },
                          };
                      })()
                    : null)}
            />
        );
    },
);
