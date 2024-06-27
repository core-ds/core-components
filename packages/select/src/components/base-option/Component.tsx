import React, { FC, isValidElement } from 'react';
import cn from 'classnames';

import { OptionProps } from '../../typings';
import { BaseCheckmark } from '../base-checkmark';

import styles from './index.module.css';

export const BaseOption: FC<OptionProps> = ({
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
    mobile = false,
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
                [styles.mobile]: mobile,
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
