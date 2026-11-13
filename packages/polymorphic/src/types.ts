export type UnknownCustomProps = Record<string, unknown>;

export type ComposedPolymorphicProps<T> = T & { customProps?: UnknownCustomProps };

export interface PolymorphicComponentProps<T, P = UnknownCustomProps> {
    /**
     * Кастомный компонент
     */
    as?: T;
    /**
     * Кастомные пропы
     */
    customProps?: P;
}
