import { MutableRefObject, useEffect } from 'react';

/** Устанавливает боковой модал вертикально по центру (transform приводит к артефактам из-за CSSTransition) */
export const useCenterTop = (
    verticalAlign: string,
    open: boolean,
    componentRef: MutableRefObject<HTMLDivElement | null>,
) => {
    const ref = componentRef;

    useEffect(() => {
        if (verticalAlign === 'center' && ref.current) {
            const { offsetHeight } = ref.current;

            ref.current.style.top = `calc(50% - ${offsetHeight / 2}px)`;
        }
    }, [open, verticalAlign, ref]);
};
