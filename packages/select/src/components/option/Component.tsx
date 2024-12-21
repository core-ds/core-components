import React, { FC, isValidElement } from 'react';
import cn from 'classnames';

import { SIZE_TO_CLASSNAME_MAP } from '../../consts';
import { OptionCommonProps } from '../../typings';

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
    innerProps,
    dataTestId,
    styles,
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
