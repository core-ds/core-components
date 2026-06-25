import { type RefObject, useRef } from 'react';
import { spring } from 'motion';
import { animate } from 'motion/mini';

export function useAccordionSpringAnimation<T extends HTMLElement>(
    ref: RefObject<T | null>,
    refContent: RefObject<T | null>,
) {
    const animationRef = useRef<ReturnType<typeof animate> | null>(null);

    const playEnter = () => {
        const el = ref.current;

        if (!el) {
            return;
        }

        animationRef.current?.stop();

        const content = refContent.current;

        if (content) {
            animate(
                content,
                { filter: ['blur(2.5px)', 'blur(0px)'] },
                { type: spring, stiffness: 315, damping: 30, mass: 0.74 },
            );
        }

        // scrollHeight даёт реальную высоту контента даже когда элемент height:0
        const targetHeight = el.scrollHeight;

        animationRef.current = animate(
            el,
            { height: targetHeight },
            { type: spring, stiffness: 315, damping: 30, mass: 1.74 },
        );

        // После завершения ставим auto, чтобы контент мог менять размер
        animationRef.current.then(() => {
            el.style.height = 'auto';
        });
    };

    const playExit = () => {
        const el = ref.current;

        if (!el) {
            return;
        }

        animationRef.current?.stop();

        // Если высота auto — фиксируем пиксели перед анимацией
        if (el.style.height === 'auto' || el.style.height === '') {
            el.style.height = `${el.offsetHeight}px`;
        }

        const content = refContent.current;

        if (content) {
            animate(
                content,
                { filter: ['blur(0px)', 'blur(2.5px)'] },
                { type: spring, stiffness: 315, damping: 30, mass: 0.74 },
            );
        }

        animationRef.current = animate(
            el,
            { height: 0 },
            { type: spring, stiffness: 315, damping: 30, mass: 0.74 },
        );
    };

    return { playEnter, playExit };
}
