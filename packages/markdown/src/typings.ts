import type { NormalComponents, SpecialComponents } from 'react-markdown/src/ast-to-react';

export type FontType = 'styrene' | 'system' | undefined;
export type PlatformType = 'desktop' | 'mobile';

export type OverridesComponents =
    | Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
    | undefined;

export type MarkdownProps = {
    children: string;

    /**
     * Css класс для обертки разметки
     */
    className?: string;

    /**
     * Платформа
     */
    platform?: PlatformType;

    /**
     * Шрифт разметки
     */
    font?: FontType;

    /**
     * Переопределение компонентов для тегов разметки
     */
    overrides?: OverridesComponents;
};

export type MarkdownDesktopProps = Omit<MarkdownProps, 'platform'>;

export type MarkdownMobileProps = Omit<MarkdownProps, 'platform'>;

export type MarkdownResponsiveProps = Omit<MarkdownProps, 'platform'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};
