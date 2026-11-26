import { type HTMLAttributes, type ReactNode } from 'react';

export interface SpoilerProps
    extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'dangerouslySetInnerHTML' | 'color'> {
    /** Содержимое, которое нужно скрыть: текст, изображение, иконка или блок. */
    children: ReactNode;
    /** Область покрытия: строки текста или весь контейнер элемента. @default text */
    mode?: 'text' | 'element';
    /** Управляемое состояние: true скрывает содержимое частицами. */
    hide?: boolean;
    /** Скрывать ли содержимое изначально в неуправляемом режиме. @default true */
    defaultHide?: boolean;
    /** Обработчик запроса на изменение состояния скрытия. */
    onHideChange?: (hide: boolean) => void;
    /** Способ раскрытия. В manual состояние меняется только через hide. @default click */
    revealOn?: 'click' | 'manual';
    /** Раскрывает содержимое только один раз. Работает только с revealOn='click'. @default false */
    revealOnce?: boolean;
    /** Расширять облако при наведении мыши. Не влияет на отталкивание точек от курсора. @default true */
    expandOnHover?: boolean;
    /** Отталкивать частицы от курсора мыши. Не влияет на расширение облака. @default true */
    repelParticlesOnHover?: boolean;
    /** Набор цветов компонента. @default default */
    colors?: 'default' | 'inverted';
    /** Дополнительный класс корневого элемента. */
    className?: string;
    /** Идентификатор для систем автоматизированного тестирования. */
    dataTestId?: string;
}
