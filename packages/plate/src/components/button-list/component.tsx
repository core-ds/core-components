import React, { FC, ReactElement, ReactNode } from 'react';
import { ButtonProps } from '@balafla/core-components-button';
import cn from 'classnames';

export type ButtonListProps = {
    /**
     * Кнопки для рендера
     */
    buttons: ReactNode;

    /**
     * Дополнительный класс для контейнера
     */
    containerClassName?: string;

    /**
     * Дополнительный класс для кнопок
     */
    buttonClassName?: string;
};

export const ButtonList: FC<ButtonListProps> = ({
    buttons,
    buttonClassName,
    containerClassName,
}) => {
    const buttonsIsArray = Array.isArray(buttons) && buttons.length > 0;

    if (buttonsIsArray) {
        return (
            <div className={containerClassName}>
                {(buttons as Array<ReactElement<ButtonProps>>).map((button, index) =>
                    button
                        ? React.cloneElement(button, {
                              // eslint-disable-next-line react/no-array-index-key
                              key: index,
                              size: 'xxs',
                              view: index === 0 ? 'secondary' : 'link',
                              className: cn(button.props.className, buttonClassName),
                          })
                        : null,
                )}
            </div>
        );
    }

    return <div className={containerClassName}>{buttons}</div>;
};
