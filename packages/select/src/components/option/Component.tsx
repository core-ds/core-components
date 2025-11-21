import React, { type FC, isValidElement } from 'react';
import cn from 'classnames';

import { SIZE_TO_CLASSNAME_MAP } from '../../consts';
import { type OptionCommonProps } from '../../typings';

import checkmarkStyles from '../checkmark/index.module.css';

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
    showCheckmark = true,
}) => {
    const content = children || option.content || option.key;
    const { showCheckMark = true } = option;
    const isCheckmarkVisible = showCheckmark && showCheckMark;

    const shouldRenderSelectionMarker = !multiple && isCheckmarkVisible;

    const renderSelectionMarker = () => {
        if (!shouldRenderSelectionMarker) {
            return null;
        }

        return (
            <div
                aria-hidden='true'
                className={cn(
                    checkmarkStyles.checkmark,
                    checkmarkStyles.single,
                    checkmarkStyles.before,
                    {
                        [checkmarkStyles.selected]: selected,
                    },
                )}
            />
        );
    };

    const renderVisualCheckmark = (position: 'before' | 'after') => {
        if (!Checkmark || !isCheckmarkVisible) {
            return null;
        }

        return (
            <Checkmark
                disabled={disabled}
                selected={selected}
                multiple={multiple}
                position={position}
                showCheckmark={isCheckmarkVisible}
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
            {renderSelectionMarker()}
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
