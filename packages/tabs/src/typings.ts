import {
    AriaAttributes,
    FC,
    HTMLAttributes,
    MouseEvent,
    ReactElement,
    ReactNode,
    Ref,
} from 'react';

import { SkeletonProps } from '@alfalab/core-components-skeleton';
import { TagProps } from '@alfalab/core-components-tag';

export type SelectedId = string | number;

export type TabsProps = Omit<
    HTMLAttributes<HTMLDivElement>,
    'onChange' | 'children' | 'className'
> &
    AriaAttributes & {
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
         * Стиль текста. Имеет приоритет над size. Работает только в primary табах.
         */
        textStyle?:
            | 'paragraph-primary-large'
            | 'paragraph-primary-medium'
            | 'paragraph-primary-small'
            | 'action-primary-large'
            | 'action-primary-medium'
            | 'action-primary-small'
            | 'accent-primary-large'
            | 'accent-primary-medium'
            | 'accent-primary-small'
            | 'headline-system-xlarge'
            | 'headline-system-large'
            | 'headline-system-medium'
            | 'headline-system-small'
            | 'headline-system-xsmall'
            | 'headline-xlarge'
            | 'headline-large'
            | 'headline-medium'
            | 'headline-small'
            | 'headline-xsmall';

        /**
         * Высота заголовков табов
         */
        size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';

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
        children: Array<ReactElement<TabProps>>;

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

        /**
         * Форма тега (для view secondary только)
         */
        tagShape?: TagProps['shape'];

        /**
         * Стиль тега (для view secondary только)
         */
        tagView?: TagProps['view'];

        /**
         * Дополнительные инлайн стили для враппера
         */
        style?: React.CSSProperties;

        /**
         * Показать скелетон
         */
        showSkeleton?: boolean;

        /**
         * Доп. пропсы для скелетона
         */
        skeletonProps?: Omit<SkeletonProps, 'visible'>;
    };

export type TabProps = Omit<
    HTMLAttributes<HTMLDivElement>,
    'id' | 'title' | 'className' | 'hidden' | 'children'
> & {
    /**
     * Id таба
     */
    id: SelectedId;

    /**
     * Заголовок таба
     */
    title: NonNullable<ReactNode>;

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
     * Реф для кнопки переключения таба
     */
    toggleRef?: Ref<HTMLDivElement>;
};

export type TabListTitle = {
    title: NonNullable<ReactNode>;
    id: SelectedId;
    disabled?: boolean;
    rightAddons?: ReactNode;
    hidden?: boolean;
    toggleClassName?: string;
    selected?: boolean;
    collapsed?: boolean;
    dataTestId?: string;
    toggleRef?: Ref<HTMLDivElement>;
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
    | 'textStyle'
    | 'showSkeleton'
    | 'skeletonProps'
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

    /**
     * Версия, которая будет использоваться при серверном рендеринге
     */
    client?: 'desktop' | 'mobile';

    /**
     * Дополнительные инлайн стили для заголовка
     */
    inlineStyle?: React.CSSProperties;
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
