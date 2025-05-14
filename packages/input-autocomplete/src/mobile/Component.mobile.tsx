import React, { Ref, useEffect, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
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
import { os, useFocusBridge } from '@alfalab/core-components-shared';

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
            ...restProps
        }: InputAutocompleteMobileProps,
        ref,
    ) => {
        const [open, setOpen] = useState(false);
        const frozenValue = useRef<string>('');
        const searchInputRef = useRef<HTMLInputElement>(null);
        const targetRef = useRef<HTMLDivElement>(null);
        const timerIdRef = useRef<ReturnType<typeof setTimeout>>();
        const focusBridgeRef = useFocusBridge();

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

        useEffect(() => {
            if (open && os.isIOS()) {
                focusBridgeRef.current?.focus();
                timerIdRef.current = setTimeout(() => {
                    if (searchInputRef.current) {
                        searchInputRef.current.focus();
                    }
                }, 500);
            }

            return () => {
                if (timerIdRef.current) {
                    clearTimeout(timerIdRef.current);
                }
            };
        }, [open, focusBridgeRef]);

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
            disableFocusLock: os.isIOS(),
        };

        const clear = inputProps?.clear ?? false;

        return (
            <Component
                Field={AutocompleteMobileField}
                {...restProps}
                {...(isBottomSheet
                    ? { bottomSheetProps: componentProps }
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
                    value: isOpen ? frozenValue.current : value,
                    clear,
                    onClear: clear ? inputProps?.onClear : undefined,
                    success,
                    ...(restProps.fieldProps as AnyObject),
                }}
            />
        );
    },
);
