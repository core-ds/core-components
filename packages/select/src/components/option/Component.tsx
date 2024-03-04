import React, { FC, isValidElement } from 'react';
import cn from 'classnames';

import { SIZE_TO_CLASSNAME_MAP } from '../../consts';
import { OptionProps } from '../../typings';
import { Checkmark as DefaultCheckMark } from '../checkmark';
import { Checkmark as DefaultMobileCheckmark } from '../checkmark-mobile';

import styles from './index.module.css';

export const Option: FC<OptionProps> = ({
    size = 48,
    className,
    option,
    children,
    selected,
    highlighted,
    disabled,
    multiple,
    mobile,
    Checkmark = mobile ? DefaultMobileCheckmark : DefaultCheckMark,
    innerProps,
    dataTestId,
}) => {
    const content = children || option.content || option.key;
    const { showCheckMark = true } = option;

    return (
        <div
            {...innerProps}
            className={cn(styles.option, styles[SIZE_TO_CLASSNAME_MAP[size]], className, {
                [styles.highlighted]: !mobile && highlighted,
                [styles.selected]: selected,
                [styles.disabled]: disabled,
            })}
            data-test-id={dataTestId}
        >
            {Checkmark && showCheckMark && (
                <Checkmark
                    disabled={disabled}
                    selected={selected}
                    multiple={multiple}
                    position='before'
                />
            )}

            <div
                className={cn(styles.content, {
                    [styles.textContent]: !isValidElement(content),
                })}
            >
                {content}
            </div>

            {/** Workaround чтобы для клика показывать отметку справа и всегда в виде иконки */}
            {Checkmark && showCheckMark && (
                <Checkmark
                    disabled={disabled}
                    selected={selected}
                    multiple={multiple}
                    position='after'
                />
            )}
        </div>
    );
};
