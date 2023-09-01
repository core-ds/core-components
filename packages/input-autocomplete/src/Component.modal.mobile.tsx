import React, { ChangeEvent, ElementType, RefObject, useEffect, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import throttle from 'lodash.throttle';

import { ButtonMobile, ButtonMobileProps } from '@alfalab/core-components-button/mobile';
import { Input as CoreInput } from '@alfalab/core-components-input';
import {
    SelectMobileProps,
    SelectModalMobile,
    SelectModalMobileProps,
} from '@alfalab/core-components-select/mobile';
import type { BaseSelectChangePayload } from '@alfalab/core-components-select/shared';

import { AutocompleteMobileField } from './autocomplete-mobile-field';

import styles from './mobile.module.css';

export type InputAutocompleteModalMobileProps = Omit<
    SelectModalMobileProps,
    'OptionsList' | 'Checkmark' | 'onScroll' | 'nativeSelect' | 'autocomplete' | 'valueRenderer'
> & {
    /**
     * Обработчик выбора
     */
    onChange: (payload: string | BaseSelectChangePayload) => void;

    /**
     * Обработчик ввода фильтра.
     */
    onFilter: (event: ChangeEvent<HTMLInputElement>) => void;

    /**
     * Значение поля ввода
     */
    value?: string;

    /**
     * Значение фильтра.
     */
    filter?: string;

    /**
     * Обработчик нажатия на кнопку "Отмена".
     */
    onCancel?: () => void;

    /**
     * Обработчик нажатия на крестик в инпуте фильтра.
     */
    onClearFilter?: () => void;

    /**
     * Дополнительные пропсы на слот под заголовком
     */
    bottomAddonProps?: Record<string, unknown>;

    /**
     * Дополнительные пропсы на кнопку "продолжить"
     */
    continueButtonProps?: ButtonMobileProps;

    /**
     * Дополнительные пропсы на кнопку "отмена"
     */
    cancelButtonProps?: ButtonMobileProps;

    /**
     * Кастомный инпут
     */
    Input?: ElementType;
};

export const InputAutocompleteModalMobile = React.forwardRef<
    HTMLDivElement,
    InputAutocompleteModalMobileProps
>(
    (
        {
            open: openProp,
            onOpen,
            name,
            size = 's',
            Input = CoreInput,
            Arrow = null,
            onClearFilter,
            filter = '',
            onFilter,
            placeholder,
            bottomAddonProps,
            multiple,
            onChange,
            onCancel,
            value,
            cancelButtonProps,
            continueButtonProps,
            modalProps,
            modalHeaderProps,
            modalFooterProps,
            ...restProps
        }: InputAutocompleteModalMobileProps,
        ref,
    ) => {
        const [open, setOpen] = React.useState(false);
        const targetRef = useRef<HTMLDivElement>(null);
        const modalScrollableRef = useRef<HTMLDivElement>(null);
        const bottomAddonRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            const modalContentNode = modalScrollableRef.current;

            const handleListTouchMove = throttle(() => {
                const input = bottomAddonRef.current;

                if (input && document.activeElement === input) {
                    input.blur();
                }
            }, 300);

            modalContentNode?.addEventListener('touchmove', handleListTouchMove);

            return () => modalContentNode?.removeEventListener('touchmove', handleListTouchMove);
        }, [open]);

        const setOpenModalSelect = (isOpen: boolean) => {
            if (openProp === undefined) {
                setOpen(isOpen);
            }

            onOpen?.({ open: isOpen, name });
        };

        const handleOpen: SelectMobileProps['onOpen'] = (payload) => {
            setOpenModalSelect(Boolean(payload.open));
        };

        const handleApply = () => {
            setOpenModalSelect(false);
            onChange(filter);
        };

        const handleCancel = () => {
            setOpenModalSelect(false);
            onCancel?.();
        };

        const handleChange: SelectMobileProps['onChange'] = (payload) => {
            onChange(payload);

            if (multiple) {
                // После выбора опции возвращаем фокус в поле ввода.
                bottomAddonRef.current?.focus();
            }
        };

        const renderBottomAddon = () => (
            <Input
                block={true}
                clear={!!onClearFilter}
                onClear={onClearFilter}
                value={filter}
                onInput={onFilter}
                placeholder={placeholder}
                {...bottomAddonProps}
                className={cn(styles.bottomAddonInput, bottomAddonProps?.className as string)}
                ref={mergeRefs([
                    bottomAddonRef,
                    bottomAddonProps?.ref as RefObject<HTMLInputElement>,
                ])}
            />
        );

        const renderFooter = () => (
            <React.Fragment>
                <ButtonMobile
                    block={true}
                    view='secondary'
                    size='m'
                    onClick={handleCancel}
                    {...cancelButtonProps}
                >
                    Отмена
                </ButtonMobile>
                <ButtonMobile
                    block={true}
                    view='primary'
                    size='m'
                    onClick={handleApply}
                    {...continueButtonProps}
                >
                    Продолжить
                </ButtonMobile>
            </React.Fragment>
        );

        return (
            <SelectModalMobile
                Field={AutocompleteMobileField}
                useWithApplyHook={false}
                {...restProps}
                ref={mergeRefs([ref, targetRef])}
                Arrow={Arrow}
                onOpen={handleOpen}
                onChange={handleChange}
                multiple={multiple}
                open={openProp ?? open}
                size={size}
                fieldProps={{ value, ...(restProps.fieldProps as Record<string, unknown>) }}
                placeholder={placeholder}
                name={name}
                modalProps={{
                    ...modalProps,
                    componentRef: modalScrollableRef,
                }}
                modalHeaderProps={{
                    ...modalHeaderProps,
                    bottomAddons: renderBottomAddon(),
                }}
                modalFooterProps={{
                    sticky: true,
                    ...modalFooterProps,
                    children: renderFooter(),
                }}
            />
        );
    },
);
