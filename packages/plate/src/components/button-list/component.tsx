import React, { type FC, type ReactElement, type ReactNode } from 'react';
import cn from 'classnames';

import { type ButtonProps } from '@alfalab/core-components-button';

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
                              size: 32,
                              view: index === 0 ? 'secondary' : 'transparent',
                              className: cn(button.props.className, buttonClassName),
                          })
                        : null,
                )}
            </div>
        );
    }

    return <div className={containerClassName}>{buttons}</div>;
};
