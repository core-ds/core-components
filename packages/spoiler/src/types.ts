import { type HTMLAttributes, type ReactNode } from 'react';

export type SpoilerProps = Omit<
    HTMLAttributes<HTMLElement>,
    'children' | 'dangerouslySetInnerHTML' | 'color'
> & {
    /** Содержимое, которое нужно скрыть: текст, изображение, иконка или блок. */
    children: ReactNode;
    /** Область покрытия: строки текста или весь контейнер элемента. @default text */
    mode?: 'text' | 'element';
    /** Управляемое состояние: true раскрывает содержимое. */
    revealed?: boolean;
    /** Начальное состояние неуправляемого компонента. @default false */
    defaultRevealed?: boolean;
    /** Обработчик запроса на изменение раскрытия содержимого. */
    onRevealedChange?: (revealed: boolean) => void;
    /** Способ раскрытия. В manual состояние меняется только через revealed. @default click */
    revealOn?: 'click' | 'manual';
    /** Раскрывает содержимое только один раз. Работает только с revealOn='click'. @default false */
    revealOnce?: boolean;
    /** Набор цветов компонента. @default default */
    colors?: 'default' | 'inverted';
    /** Дополнительный класс корневого элемента. */
    className?: string;
    /** Идентификатор для систем автоматизированного тестирования. */
    dataTestId?: string;
};
