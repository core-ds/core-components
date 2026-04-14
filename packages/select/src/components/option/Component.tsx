import React, { type FC, isValidElement } from 'react';
import cn from 'classnames';

import { type OptionCommonProps } from '../../typings';

import type stylesDesktop from './desktop/index.module.css';
import type stylesMobile from './mobile/index.module.css';

type OptionPrivateProps = {
    /**
     * Мобильная версия option.
     */
    mobile: boolean;
    /**
     * Стили
     */
    styles: typeof stylesDesktop | typeof stylesMobile;
};

export const OptionBase: FC<OptionCommonProps & OptionPrivateProps> = ({
    size = 48,
    className,
    option,
    children,
    selected,
    highlighted,
    disabled,
    multiple,
    mobile,
    Checkmark,
    checkmarkPosition = multiple ? 'before' : 'after',
    innerProps,
    dataTestId,
    styles,
}) => {
    const content = children || option.content || option.key;
    const { showCheckMark = true } = option;

    const renderCheckmark = (position: 'before' | 'after') =>
        Checkmark &&
        showCheckMark && (
            <Checkmark
                disabled={disabled}
                selected={selected}
                multiple={multiple}
                position={position}
            />
        );

    return (
        <div
            {...innerProps}
            className={cn(styles.option, styles[`size-${size}`], className, {
                [styles.highlighted]: !mobile && highlighted,
                [styles.selected]: selected,
                [styles.disabled]: disabled,
            })}
            data-test-id={dataTestId}
        >
            {checkmarkPosition === 'before' && renderCheckmark('before')}

            <div
                className={cn(styles.content, {
                    [styles.textContent]: !isValidElement(content),
                })}
            >
                {content}
            </div>

            {checkmarkPosition === 'after' && renderCheckmark('after')}
        </div>
    );
};
