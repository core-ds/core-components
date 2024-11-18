import React, { FC, SVGProps } from 'react';
import cn from 'classnames';

import { type ButtonDesktopProps, ButtonDesktop } from '@alfalab/core-components-button/desktop';
import { Typography } from '@alfalab/core-components-typography';
import { type TextProps } from '@alfalab/core-components-typography';

import styles from './index.module.css';

export interface BackArrowAddonProps extends React.HTMLAttributes<HTMLButtonElement> {
    /**
     * Текст после иконки
     */
    text?: string | null;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Прозрачность текста
     */
    textOpacity?: number;

    /**
     * Обработчик клика
     */
    onClick?: () => void;
}

interface BackArrowAddonTransferProps {
    ButtonDesktopProps: Pick<ButtonDesktopProps, 'size' | 'className'>;
    iconWrapperProps: {
        className: string;
    };
    TypographyTextProps: Pick<TextProps, 'view' | 'className'>;
    Icon: FC<SVGProps<SVGSVGElement>>;
}

export interface BackArrowAddonBaseProps extends BackArrowAddonProps, BackArrowAddonTransferProps {}

export const BackArrowAddonBase = ({
    text = 'Назад',
    onClick,
    className,
    textOpacity = 1,
    ButtonDesktopProps,
    iconWrapperProps,
    TypographyTextProps,
    Icon,
    ...htmlAttributes
}: BackArrowAddonBaseProps) => (
    <ButtonDesktop
        view='text'
        onClick={onClick}
        aria-label='назад'
        {...ButtonDesktopProps}
        className={cn(ButtonDesktopProps.className, className)}
        {...htmlAttributes}
    >
        <div className={styles.flex}>
            <div {...iconWrapperProps}>
                <Icon />
            </div>
            {textOpacity > 0 && text && (
                <Typography.Text
                    weight='medium'
                    style={{ opacity: textOpacity }}
                    {...TypographyTextProps}
                >
                    {text}
                </Typography.Text>
            )}
        </div>
    </ButtonDesktop>
);
