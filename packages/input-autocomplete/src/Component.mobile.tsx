import React, { ChangeEvent, ElementType, RefObject, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import throttle from 'lodash.throttle';

import { BottomSheetProps } from '@alfalab/core-components-bottom-sheet';
import { ButtonMobile, ButtonMobileProps } from '@alfalab/core-components-button/mobile';
import { Input as CoreInput } from '@alfalab/core-components-input';
import { SelectMobile, SelectMobileProps } from '@alfalab/core-components-select/mobile';
import type {
    BaseSelectChangePayload,
    BaseSelectProps,
} from '@alfalab/core-components-select/shared';

import { AutocompleteMobileField } from './autocomplete-mobile-field';

import styles from './mobile.module.css';

export type InputAutocompleteMobileProps = Omit<
    BaseSelectProps,
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
     * Дополнительные пропсы компонента BottomSheet
     */
    bottomSheetProps?: Partial<BottomSheetProps>;

    /**
     * Дополнительные пропсы на слот под заголовком компонента BottomSheet
     */
    bottomSheetHeaderAddonsProps?: Record<string, unknown>;

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

const SELECTED: string[] = [];

export const InputAutocompleteMobile = React.forwardRef(
    (
        {
            Input,
            bottomSheetProps = {},
            bottomSheetHeaderAddonsProps = {},
            value = '',
            filter = '',
            name,
            Arrow = null,
            label,
            placeholder,
            size = 's',
            open: openProp,
            onFilter,
            onChange,
            onOpen,
            onCancel,
            onClearFilter,
            continueButtonProps,
            cancelButtonProps,
            selected,
            multiple,
            ...restProps
        }: InputAutocompleteMobileProps,
        ref,
    ) => {
        const [open, setOpen] = useState(false);
        const bottomSheetInputRef = useRef<HTMLInputElement>(null);
        const targetRef = useRef<HTMLDivElement>(null);

        const setBottomSheetVisibility = (isOpen: boolean) => {
            if (openProp === undefined) {
                setOpen(isOpen);
            }

            if (onOpen) {
                onOpen({ open: isOpen, name });
            }
        };

        const handleOpen: SelectMobileProps['onOpen'] = (payload) => {
            setBottomSheetVisibility(Boolean(payload.open));
        };

        const handleOptionsListTouchMove = useMemo(
            () =>
                throttle(() => {
                    const input = bottomSheetInputRef.current;

                    if (input && document.activeElement === input) {
                        input.blur();
                    }
                }, 300),
            [],
        );

        const handleApply = () => {
            setBottomSheetVisibility(false);
            onChange(filter);
        };

        const handleChange: SelectMobileProps['onChange'] = (payload) => {
            onChange(payload);

            if (multiple) {
                // После выбора опции возвращаем фокус в поле ввода.
                bottomSheetInputRef.current?.focus();
            }
        };

        const handleCancel = () => {
            setBottomSheetVisibility(false);

            if (onCancel) {
                onCancel();
            }
        };

        const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
            const input = bottomSheetInputRef.current;

            // Перед закрытием шторки снимаем фокус с инпута, чтобы предотвратить скачок шторки.
            if (
                event.relatedTarget === targetRef.current &&
                input &&
                input === document.activeElement
            ) {
                input.blur();
            }
        };

        const getBottomSheetProps = (): InputAutocompleteMobileProps['bottomSheetProps'] => {
            const Component = Input || CoreInput;

            return {
                actionButton: (
                    <div className={styles.footer}>
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
                    </div>
                ),
                title: label || placeholder,
                bottomAddons: (
                    <Component
                        block={true}
                        clear={!!onClearFilter}
                        onClear={onClearFilter}
                        value={filter}
                        onInput={onFilter}
                        placeholder={placeholder}
                        onFocus={handleInputFocus}
                        {...bottomSheetHeaderAddonsProps}
                        className={cn(
                            styles.bottomAddonInput,
                            bottomSheetHeaderAddonsProps.className as string,
                        )}
                        ref={mergeRefs([
                            bottomSheetInputRef,
                            bottomSheetHeaderAddonsProps.ref as RefObject<HTMLInputElement>,
                        ])}
                    />
                ),
                initialHeight: 'full',
                ...bottomSheetProps,
                containerProps: {
                    onTouchMove: handleOptionsListTouchMove,
                    ...bottomSheetProps.containerProps,
                },
            };
        };

        return (
            <SelectMobile
                ref={mergeRefs([targetRef, ref])}
                selected={selected || SELECTED}
                open={Boolean(open || openProp)}
                onOpen={handleOpen}
                onChange={handleChange}
                Arrow={Arrow}
                Field={AutocompleteMobileField}
                fieldProps={{ value }}
                placeholder={placeholder}
                label={label}
                size={size}
                name={name}
                multiple={multiple}
                useWithApplyHook={false}
                bottomSheetProps={getBottomSheetProps()}
                optionsListProps={{ showFooter: false }}
                {...restProps}
            />
        );
    },
);
