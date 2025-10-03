import { type NormalComponents, type SpecialComponents } from 'react-markdown/src/ast-to-react';

export type FontType = 'styrene' | 'system' | undefined;
export type PlatformType = 'desktop' | 'mobile';

export type OverridesComponents =
    | Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
    | undefined;

export type BaseMarkdownProps = {
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

    /**
     * Трансформация ссылок неизвестных форматов
     * https://github.com/remarkjs/react-markdown/issues/537
     * @default true
     */
    transformLinkUri?: boolean;
};

export type MarkdownDesktopProps = Omit<BaseMarkdownProps, 'platform'>;

export type MarkdownMobileProps = Omit<BaseMarkdownProps, 'platform'>;

export type MarkdownResponsiveProps = Omit<BaseMarkdownProps, 'platform'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Версия, которая будет использоваться при серверном рендеринге
     */
    client?: 'desktop' | 'mobile';

    /**
     * Значение по-умолчанию для хука useMatchMedia
     * @deprecated Используйте client
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};
