import React, { FC, isValidElement } from 'react';
import cn from 'classnames';

import { OptionCommonProps } from '../../typings';
import { BaseCheckmark } from '../base-checkmark';

import type stylesDesktop from './desktop/index.module.css'
import type stylesMobile from './mobile/index.module.css'

type OptionPrivateProps = {
    /**
     * Мобильная версия option.
     */
    mobile: boolean;
    /**
     * Стили
     */
    styles: typeof stylesDesktop | typeof stylesMobile;
}

export const BaseOptionCommon: FC<OptionCommonProps & OptionPrivateProps> = ({
    className,
    option,
    children,
    selected,
    highlighted,
    disabled,
    multiple,
    Checkmark = BaseCheckmark,
    checkmarkPosition = multiple ? 'before' : 'after',
    align = 'center',
    innerProps,
    dataTestId,
    mobile,
    styles
}) => {
    const content = children || option.content || option.key;
    const { showCheckMark = true } = option;

    const isTextContent = !isValidElement(content);

    const renderCheckmark = () => {
        if (Checkmark && showCheckMark) {
            return (
                <Checkmark
                    className={cn({
                        [styles.checkmarkBeforeContent]: checkmarkPosition === 'before',
                        [styles.checkmarkAfterContent]: checkmarkPosition === 'after',
                    })}
                    disabled={disabled}
                    selected={selected}
                    multiple={multiple}
                    align={align}
                />
            );
        }

        return null;
    };

    return (
        <div
            {...innerProps}
            className={cn(styles.option, className, {
                [styles.highlighted]: !mobile && highlighted,
                [styles.selected]: selected,
                [styles.disabled]: disabled,
                [styles.textContent]: isTextContent,
                [styles.checkmarkAfter]: !isTextContent && checkmarkPosition === 'after',
                [styles.checkmarkBefore]: !isTextContent && checkmarkPosition === 'before',
            })}
            data-test-id={dataTestId}
        >
            {checkmarkPosition === 'before' && renderCheckmark()}

            <div className={cn(styles.content)}>{content}</div>

            {checkmarkPosition === 'after' && renderCheckmark()}
        </div>
    );
};
