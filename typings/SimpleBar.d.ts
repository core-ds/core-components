declare module 'simplebar/dist/simplebar-core.esm' {
    import SimpleBar from 'simplebar';

    class SimpleBarJs extends SimpleBar {
        static defaultOptions: SimpleBar.Options;

        constructor(
            element: HTMLElement,
            options?: SimpleBar.Options & {
                scrollableNode?: HTMLElement | null;
                contentNode?: HTMLElement | null;
            },
        ) {
            super();
        }
    }

    export = SimpleBarJs;
}
