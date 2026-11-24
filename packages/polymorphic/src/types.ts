// used `object` type to make interfaces available in customProps
export type UnknownCustomProps = object;

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
