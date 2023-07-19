import React, { ChangeEvent, forwardRef, useCallback, useRef, useState } from 'react';

import {
    Arrow as DefaultArrow,
    BaseSelect,
    BaseSelectProps,
    Optgroup as DefaultOptgroup,
    Option as DefaultOption,
    OptionsList as DefaultOptionsList,
} from '@alfalab/core-components-select';

import { TagList } from './components';
import { SelectWithTagsProps } from './types';
import { filterOptions } from './utils';

export const SelectWithTags = forwardRef<HTMLInputElement, SelectWithTagsProps>(
    (
        {
            OptionsList = DefaultOptionsList,
            Optgroup = DefaultOptgroup,
            Option = DefaultOption,
            Arrow = DefaultArrow,
            value,
            selected,
            size = 'xl',
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
            breakpoint,
            ...restProps
        },
        ref,
    ) => {
        const controlled = Boolean(selected);

        const [selectedTags, setSelectedTags] = useState(selected || []);
        const [isPopoverOpen, setPopoverOpen] = useState<boolean | undefined>(false);
        const updatePopover = useRef(() => null);

        const resetValue = useCallback(() => {
            const event = { target: { value: '' } };

            onInput(event as ChangeEvent<HTMLInputElement>);
        }, [onInput]);

        const handleUpdatePopover = useCallback(() => {
            if (updatePopover && updatePopover.current) {
                updatePopover.current();
            }
        }, []);

        const handleDeleteTag = useCallback(
            (deletedKey: string) => {
                let tags = selected || selectedTags;

                tags = tags.filter((tag) => {
                    const key = typeof tag === 'string' ? tag : tag.key;

                    return deletedKey !== key;
                });

                if (onChange) {
                    onChange({ selectedMultiple: tags });
                }

                if (!controlled) {
                    setSelectedTags(tags);
                }
            },
            [controlled, onChange, selected, selectedTags],
        );

        const handleChange = useCallback<Required<BaseSelectProps>['onChange']>(
            ({ selectedMultiple, name, initiator }) => {
                if (onChange) {
                    onChange({ selectedMultiple, name, initiator });
                }

                if (!controlled) {
                    setSelectedTags(selectedMultiple);
                }

                if (value) {
                    resetValue();
                }
            },
            [onChange, controlled, value, resetValue],
        );

        const handleOpen = useCallback<Required<BaseSelectProps>['onOpen']>(
            (payload) => {
                const { open } = payload;

                if (!open && value) {
                    resetValue();
                }
                setPopoverOpen(open);

                if (onOpen) onOpen(payload);
            },
            [onOpen, resetValue, value],
        );

        const filteredOptions = filterOptions(options, value, match);

        const isAutocomplete = autocomplete || Boolean(match);

        return (
            <BaseSelect
                {...restProps}
                ref={ref}
                Option={Option}
                Field={TagList}
                Optgroup={Optgroup}
                OptionsList={OptionsList}
                Arrow={Arrow}
                multiple={true}
                updatePopover={updatePopover}
                allowUnselect={allowUnselect}
                showEmptyOptionsList={true}
                fieldProps={{
                    value,
                    autocomplete: isAutocomplete,
                    onInput,
                    handleDeleteTag,
                    Tag,
                    collapseTagList,
                    moveInputToNewLine,
                    transformCollapsedTagText,
                    transformTagText,
                    handleUpdatePopover,
                    isPopoverOpen,
                    breakpoint,
                }}
                selected={selected || selectedTags}
                autocomplete={isAutocomplete}
                size={size}
                options={filteredOptions}
                onChange={handleChange}
                onOpen={handleOpen}
            />
        );
    },
);
