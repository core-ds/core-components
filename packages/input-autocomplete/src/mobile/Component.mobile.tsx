import React, { Ref, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { maskitoTransform } from '@maskito/core';
import cn from 'classnames';
import throttle from 'lodash/throttle';

import {
    SelectMobile,
    SelectMobileProps,
    SelectModalMobile,
} from '@alfalab/core-components-select/mobile';
import {
    AnyObject,
    BottomSheetSelectMobileProps,
    Footer,
    ModalSelectMobileProps,
} from '@alfalab/core-components-select/shared';
import { isMaskitoMask, isNonNullable } from '@alfalab/core-components-shared';

import { AutocompleteMobileField } from '../autocomplete-mobile-field';
import { OnInputReason } from '../enums';
import { InputAutocompleteMobileProps } from '../types';
import { searchFilterStub } from '../utils';

import styles from './mobile.module.css';

export const InputAutocompleteMobile = React.forwardRef(
    (
        {
            Input,
            value,
            name,
            Arrow = null,
            label,
            placeholder = '',
            size = 48,
            open: openProp,
            onInput,
            onOpen,
            multiple,
            inputProps,
            isBottomSheet = true,
            dataTestId,
            transitionProps,
            onCancel,
            onApply,
            title,
            success,
            virtualKeyboard = false,
            ...restProps
        }: InputAutocompleteMobileProps,
        ref,
    ) => {
        const [open, setOpen] = useState(false);
        const frozenValue = useRef<string>('');
        const searchInputRef = useRef<HTMLInputElement>(null);
        const targetRef = useRef<HTMLDivElement>(null);

        const restorePrevValue = () => onInput?.(frozenValue.current, OnInputReason.Close);

        const setModalVisibility = (isOpen: boolean) => {
            if (isOpen) {
                frozenValue.current = value || '';
            }

            if (openProp === undefined) {
                setOpen(isOpen);
            }

            onOpen?.({ open: isOpen, name });
        };

        const handleOpen: SelectMobileProps['onOpen'] = (payload) => {
            setModalVisibility(Boolean(payload.open));
        };

        const handleOptionsListTouchMove = useMemo(
            () =>
                throttle(() => {
                    const input = searchInputRef.current;

                    if (input && document.activeElement === input) {
                        input.blur();
                    }
                }, 300),
            [],
        );

        const handleApply = () => {
            setModalVisibility(false);
            onApply?.();
        };

        const handleCancel = () => {
            setModalVisibility(false);
            restorePrevValue();
            onCancel?.();
        };

        const handleExiting = (node: HTMLElement) => {
            targetRef.current?.focus();
            transitionProps?.onExiting?.(node);
        };

        const isOpen = Boolean(open || openProp);

        const Component = isBottomSheet ? SelectMobile : SelectModalMobile;

        const componentProps:
            | ModalSelectMobileProps['modalProps']
            | BottomSheetSelectMobileProps['bottomSheetProps'] = {
            title: title || label || placeholder,
            onClose: restorePrevValue,
            transitionProps: {
                ...transitionProps,
                onExiting: handleExiting,
            },
            [isBottomSheet ? 'containerProps' : 'componentDivProps']: {
                onTouchMove: handleOptionsListTouchMove,
            },
        };

        const clear = inputProps?.clear ?? false;

        const displayValue = isOpen ? frozenValue.current : value;

        const fieldValue = useMemo(() => {
            const mask = inputProps?.mask;

            return isNonNullable(displayValue) && isMaskitoMask(mask)
                ? maskitoTransform(displayValue, { mask })
                : displayValue;
        }, [displayValue, inputProps?.mask]);

        return (
            <Component
                Field={AutocompleteMobileField}
                {...restProps}
                {...(isBottomSheet
                    ? { bottomSheetProps: { ...componentProps, virtualKeyboard } }
                    : {
                          modalProps: componentProps,
                          modalHeaderProps: { title },
                      })}
                dataTestId={dataTestId}
                useWithApplyHook={false}
                showSearch={true}
                searchProps={{
                    value,
                    filterFn: searchFilterStub,
                    componentProps: {
                        leftAddons: null,
                        placeholder,
                        ...inputProps,
                        className: cn(styles.input, inputProps?.className),
                        clear,
                        ref: mergeRefs([searchInputRef, inputProps?.ref as Ref<HTMLInputElement>]),
                        onChange: (_, payload) => onInput?.(payload.value, OnInputReason.Change),
                    },
                }}
                Search={Input}
                ref={mergeRefs([targetRef, ref])}
                open={isOpen}
                onOpen={handleOpen}
                Arrow={Arrow}
                placeholder={placeholder}
                label={label}
                size={size}
                name={name}
                multiple={multiple}
                optionsListProps={{
                    footer: (
                        <Footer
                            showClear={true}
                            handleClear={handleCancel}
                            handleApply={handleApply}
                            clearText='Отмена'
                            applyText='Продолжить'
                            dataTestId={dataTestId}
                        />
                    ),
                    ...(restProps.optionsListProps as AnyObject),
                }}
                fieldProps={{
                    value: fieldValue,
                    clear,
                    onClear: clear ? inputProps?.onClear : undefined,
                    success,
                    ...(restProps.fieldProps as AnyObject),
                }}
            />
        );
    },
);
