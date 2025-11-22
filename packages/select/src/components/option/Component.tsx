import React, { type FC, isValidElement } from 'react';
import cn from 'classnames';

import { SIZE_TO_CLASSNAME_MAP } from '../../consts';
import { type OptionCommonProps } from '../../typings';

type OptionPrivateProps = {
    /**
     * Мобильная версия option.
     */
    mobile: boolean;
    /**
     * Стили
     */
    styles: Record<string, string>;
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

    const renderVisualCheckmark = (position: 'before' | 'after') => {
        if (!Checkmark || !showCheckMark) {
            return null;
        }

        return (
            <Checkmark
                disabled={disabled}
                selected={selected}
                multiple={multiple}
                position={position}
            />
        );
    };

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
            {checkmarkPosition === 'before' && renderVisualCheckmark('before')}

            <div
                className={cn(styles.content, {
                    [styles.textContent]: !isValidElement(content),
                })}
            >
                {content}
            </div>

            {checkmarkPosition === 'after' && renderVisualCheckmark('after')}
        </div>
    );
};
