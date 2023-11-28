import React, { Ref, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import throttle from 'lodash.throttle';

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

import { AutocompleteMobileField } from '../autocomplete-mobile-field';
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
            size = 's',
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
            ...restProps
        }: InputAutocompleteMobileProps,
        ref,
    ) => {
        const [open, setOpen] = useState(false);
        const frozenValue = useRef<string>('');
        const searchInputRef = useRef<HTMLInputElement>(null);
        const targetRef = useRef<HTMLDivElement>(null);

        const restorePrevValue = () => onInput?.(null, { value: frozenValue.current });

        const setModalVisibility = (isOpen: boolean) => {
            if (openProp === undefined) {
                setOpen(isOpen);
            }

            if (isOpen) {
                frozenValue.current = value || '';
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
                        onChange: onInput,
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
                    ...(restProps.fieldProps as AnyObject),
                }}
            />
        );
    },
);
