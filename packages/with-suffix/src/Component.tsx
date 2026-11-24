import React, {
    type ComponentProps,
    type ComponentRef,
    type ComponentType,
    type ElementType,
    type FC,
    forwardRef,
    Fragment,
    type ReactNode,
    type RefAttributes,
    useState,
} from 'react';
import cn from 'classnames';

import { type InputProps } from '@alfalab/core-components-input';
import * as inputDefaultProps from '@alfalab/core-components-input/default-props';
import {
    type ComposedPolymorphicProps,
    type PolymorphicComponentProps,
    PolymorphicInput,
} from '@alfalab/core-components-polymorphic';

import defaultStyles from './default.module.css';
import styles from './index.module.css';
import invertedStyles from './inverted.module.css';

const colorsStyles = {
    default: defaultStyles,
    inverted: invertedStyles,
} as const;

export interface SuffixProps {
    /**
     * Дополнительный закрепленный текст справа от основного значения.
     * Например: value='85' suffix=' мес' -> 85 мес
     */
    suffix?: ReactNode;

    /**
     * Дополнительный класс для контейнера с суффиксом
     */
    suffixContainerClassName?: string;
}

interface SuffixInputComponentProps
    extends ComponentProps<'input'>,
        PolymorphicComponentProps<
            ElementType<ComposedPolymorphicProps<ComponentProps<'input'>>, 'input'>,
            InputProps & SuffixProps
        > {}

const SuffixInputComponent = forwardRef<ComponentRef<'input'>, SuffixInputComponentProps>(
    (
        {
            customProps: {
                suffix,
                suffixContainerClassName,
                colors = inputDefaultProps.colors,
                bold,
                fontWeight = inputDefaultProps.fontWeight(bold),
                size = inputDefaultProps.size,
                disabled,
                readOnly,
                as: Component = PolymorphicInput,
                customProps,
            } = {},
            ...inputProps
        },
        ref,
    ) => {
        const { value } = inputProps;
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

export const SuffixInput = forwardRef<ComponentRef<'input'>, SuffixInputProps>((props, ref) => {
    const {
        Input,
        value: valueFromProps,
        defaultValue = '',
        onChange,
        onClear,
        className,
        suffix,
        suffixContainerClassName,
        ...restProps
    } = props;
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
            as={SuffixInputComponent}
            customProps={props}
            {...restProps}
        />
    );
});

SuffixInput.displayName = 'SuffixInput';

/**
 * @deprecated
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type withSuffixProps = InputProps & SuffixProps;

/**
 * @deprecated Используйте {@link SuffixInput} напрямую
 */
export const withSuffix = (Input: FC<InputProps & RefAttributes<HTMLInputElement>>) =>
    forwardRef<HTMLInputElement, withSuffixProps>((props, ref) => (
        <SuffixInput {...props} ref={ref} Input={Input} />
    ));
