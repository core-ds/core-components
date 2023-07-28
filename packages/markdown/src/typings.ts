import { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { NormalComponents } from 'react-markdown/lib/complex-types';

export type FontType = 'styrene' | 'system' | undefined;
export type PlatformType = 'desktop' | 'mobile';
export type PaddingsMarkdownType =
    | number
    | {
          paddingTop?: number;
          paddingBottom?: number;
          paddingLeft?: number;
          paddingRight?: number;
      };

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

    /**
     * Переопределение отступов для разметки
     */
    paddings?: PaddingsMarkdownType;
};
