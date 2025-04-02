export type PrivateProps = {
    /**
     * Основные стили компонента.
     */
    styles?: { [key: string]: string };

    /**
     * Стили компонента для default и inverted режима.
     */
    colorStylesMap?: {
        default: {
            [key: string]: string;
        };
        inverted: {
            [key: string]: string;
        };
    };
};
