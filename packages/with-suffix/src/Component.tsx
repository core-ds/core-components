import React, {
    type ComponentRef,
    type ComponentType,
    type FC,
    forwardRef,
    Fragment,
    type ReactNode,
    type RefAttributes,
    useState,
} from 'react';
import cn from 'classnames';

import { type InputComponentProps, type InputProps } from '@alfalab/core-components-input';
import * as inputDefaultProps from '@alfalab/core-components-input/default-props';

import defaultStyles from './default.module.css';
import styles from './index.module.css';
import invertedStyles from './inverted.module.css';

const colorsStyles = {
    default: defaultStyles,
    inverted: invertedStyles,
} as const;

export type SuffixProps = {
    /**
     * Дополнительный закрепленный текст справа от основного значения.
     * Например: value='85' suffix=' мес' -> 85 мес
     */
    suffix?: ReactNode;

    /**
     * Дополнительный класс для контейнера с суффиксом
     */
    suffixContainerClassName?: string;
};

/**
 * @deprecated
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type withSuffixProps = InputProps & SuffixProps;

export type SuffixInputComponentCustomProps = Pick<
    InputProps,
    'size' | 'colors' | 'fontWeight' | 'bold' | 'as' | 'customProps'
> &
    SuffixProps;

const SuffixInputComponent = forwardRef<
    ComponentRef<'input'>,
    InputComponentProps<SuffixInputComponentCustomProps>
>(
    (
        {
            customProps: {
                suffix,
                suffixContainerClassName,
                colors = inputDefaultProps.colors,
                fontWeight,
                size,
                as: Component = inputDefaultProps.asProp,
                customProps,
            } = {},
            ...inputProps
        },
        ref,
    ) => {
        const { value, disabled, readOnly } = inputProps;
        const colorStyles = colorsStyles[colors];

        return (
            <Fragment>
                <Component {...inputProps} customProps={customProps} ref={ref} />
                <div
                    translate='no'
                    className={cn(
                        styles.suffixContainer,
                        suffixContainerClassName,
                        styles[`size-${size}`],
                        {
                            [styles.bold]: fontWeight === 'bold',
                            [styles.medium]: fontWeight === 'medium',
                        },
                    )}
                >
                    <span className={styles.spacer}>{value}</span>
                    {suffix && (
                        <div
                            className={cn(styles.suffix, {
                                [colorStyles.disabled]: disabled,
                                [colorStyles.readOnly]: readOnly,
                            })}
                        >
                            {suffix}
                        </div>
                    )}
                </div>
            </Fragment>
        );
    },
);

export interface SuffixInputProps extends InputProps, SuffixProps {
    Input: ComponentType<InputProps & RefAttributes<ComponentRef<'input'>>>;
}

export const SuffixInput = forwardRef<ComponentRef<'input'>, SuffixInputProps>(
    (
        {
            Input,
            value: valueFromProps,
            defaultValue = '',
            onChange,
            onClear,
            className,
            suffix,
            suffixContainerClassName,
            colors = inputDefaultProps.colors,
            bold,
            fontWeight = inputDefaultProps.fontWeight(bold),
            size = inputDefaultProps.size,
            as: Component = inputDefaultProps.asProp,
            customProps: originalCustomProps,
            ...restProps
        },
        ref,
    ) => {
        const uncontrolled = valueFromProps === undefined;
        const [value, setValue] = useState(valueFromProps ?? defaultValue);

        // getDerivedStateFromProps
        if (!uncontrolled && valueFromProps !== value) {
            setValue(valueFromProps);
        }

        const handleInputChange: InputProps['onChange'] = (event, payload) => {
            onChange?.(event, payload);

            if (uncontrolled) {
                setValue(payload.value);
            }
        };

        const handleClear: InputProps['onClear'] = (event) => {
            onClear?.(event);

            if (uncontrolled) {
                setValue('');
            }
        };

        const customProps: SuffixInputComponentCustomProps = {
            size,
            colors,
            fontWeight,
            suffix,
            suffixContainerClassName,
            as: Component,
            customProps: originalCustomProps,
        };

        return (
            <Input
                ref={ref}
                value={value}
                onChange={handleInputChange}
                onClear={handleClear}
                className={cn(className, {
                    [styles.suffixVisible]: value,
                    [styles.hasSuffix]: suffix,
                })}
                colors={colors}
                bold={bold}
                fontWeight={fontWeight}
                size={size}
                as={SuffixInputComponent}
                customProps={customProps}
                {...restProps}
            />
        );
    },
);

SuffixInput.displayName = 'SuffixInput';

/**
 * @deprecated Используйте {@link SuffixInput} напрямую
 */
export const withSuffix = (Input: FC<InputProps & RefAttributes<HTMLInputElement>>) =>
    forwardRef<HTMLInputElement, withSuffixProps>((props, ref) => (
        <SuffixInput {...props} ref={ref} Input={Input} />
    ));
