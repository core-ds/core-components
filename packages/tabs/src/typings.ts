import { FC, FunctionComponentElement, MouseEvent, ReactNode, Ref } from 'react';

import { TagProps } from '@alfalab/core-components-tag';

export type SelectedId = string | number;

export type TabsProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс контейнера
     */
    containerClassName?: string;

    /**
     * Id активного таба
     */
    selectedId?: SelectedId;

    /**
     * Рендерить неактивные табы
     */
    keepMounted?: boolean;

    /**
     * Внешний вид заголовков табов
     */
    view?: 'primary' | 'secondary';

    /**
     * Высота заголовков табов
     */
    size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';

    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);

    /**
     * Мобильный вид
     */
    mobile?: boolean;

    /**
     * Рендерить заголовки табов в контейнере со скроллом
     */
    scrollable?: boolean;

    /**
     * Список табов, для контроля переноса вкладок в PickerButton
     */
    collapsedTabsIds?: string[];

    /**
     * При скроле табы будут уходить в край экрана
     */
    fullWidthScroll?: boolean;

    /**
     * Компоненты табов
     */
    children: Array<FunctionComponentElement<TabProps>>;

    /**
     * Компонент заголовков табов
     */
    TabList: FC<TabListProps>;

    /**
     * Обработчик переключения табов
     */
    onChange?: (event: MouseEvent, payload: { selectedId: SelectedId }) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Контрольная точка для тега, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Форма тега (для view secondary только)
     */
    tagShape?: TagProps['shape'];

    /**
     * Стиль тега (для view secondary только)
     */
    tagView?: TagProps['view'];
};

export type TabProps = {
    /**
     * Id таба
     */
    id: SelectedId;

    /**
     * Заголовок таба
     */
    title: string;

    /**
     * Дополнительный класс для контейнера содержимого таба
     */
    className?: string;

    /**
     * Дополнительный класс для кнопки таба
     */
    toggleClassName?: string;

    /**
     * Блокирует таб
     */
    disabled?: boolean;

    /**
     * Управление видимостью таба
     */
    hidden?: boolean;

    /**
     * Рендерить таб, если он неактивен
     */
    keepMounted?: boolean;

    /**
     * Контент таба
     */
    children?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Реф на компонент таба
     */
    ref?: Ref<HTMLDivElement>;
};

export type TabListTitle = {
    title: string;
    id: SelectedId;
    disabled?: boolean;
    rightAddons?: ReactNode;
    hidden?: boolean;
    toggleClassName?: string;
    selected?: boolean;
    collapsed?: boolean;
    dataTestId?: string;
    ref?: Ref<HTMLDivElement>;
};

export type TabListProps = Pick<
    TabsProps,
    | 'className'
    | 'containerClassName'
    | 'size'
    | 'defaultMatchMediaValue'
    | 'selectedId'
    | 'scrollable'
    | 'collapsedTabsIds'
    | 'onChange'
    | 'dataTestId'
    | 'fullWidthScroll'
    | 'tagShape'
    | 'tagView'
> & {
    /**
     * Заголовки табов
     */
    titles?: TabListTitle[];
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export type SecondaryTabListProps = TabListProps & {
    tagSize?: TagProps['size'];
    TagComponent?: FC<Omit<TagProps, 'breakpoint'>>;
};

export type UseTabsProps = TabListProps;

export type Styles = {
    styles?: { [key: string]: string };
};

export type PlatformProps = {
    platform: 'desktop' | 'mobile';
};
