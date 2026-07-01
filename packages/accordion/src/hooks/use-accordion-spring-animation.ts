import { type RefObject, useRef } from 'react';
import { GroupAnimation, spring } from 'motion';
import { animate } from 'motion/mini';

export function useAccordionSpringAnimation<T extends HTMLElement>(
    ref: RefObject<T | null>,
    refContent: RefObject<T | null>,
) {
    const animationRef = useRef<GroupAnimation | null>(null);

    const playEnter = () => {
        const el = ref.current;

        if (!el) {
            return;
        }

        animationRef.current?.stop();

        const containerAnim = animate(
            el,
            // scrollHeight даёт реальную высоту контента даже когда элемент height:0
            { height: el.scrollHeight },
            { type: spring, stiffness: 426, damping: 41, mass: 1 },
        );

        const contentTranslateAnim = animate(
            refContent.current,
            { translate: ['0px -10px', '0px 0px'] },
            { type: spring, stiffness: 426, damping: 41, mass: 1, delay: 0.075 },
        );

        const contentOpacityAnim = animate(
            refContent.current,
            { opacity: [0, 1] },
            { type: spring, stiffness: 426, damping: 41, mass: 1, delay: 0.09 },
        );

        const contentBlurAnim = animate(
            refContent.current,
            { filter: ['blur(2.5px)', 'blur(0px)'] },
            { type: spring, stiffness: 426, damping: 41, mass: 1, delay: 0.1 },
        );

        const group = new GroupAnimation([
            containerAnim,
            contentTranslateAnim,
            contentOpacityAnim,
            contentBlurAnim,
        ]);

        animationRef.current = group;

        // После завершения ставим auto, чтобы контент мог менять размер
        group.finished.then(() => {
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

        const containerAnim = animate(
            el,
            { height: 0 },
            { type: spring, stiffness: 743, damping: 49, mass: 1, delay: 0.075 },
        );

        const contentTranslateAnim = animate(
            refContent.current,
            { translate: ['0px 0px', '0px -10px'] },
            { type: spring, stiffness: 743, damping: 49, mass: 1 },
        );

        const contentOpacityAnim = animate(
            refContent.current,
            { opacity: [1, 0] },
            { type: spring, stiffness: 743, damping: 49, mass: 1 },
        );

        const contentBlurAnim = animate(
            content,
            { filter: ['blur(0px)', 'blur(2.5px)'] },
            { type: spring, stiffness: 743, damping: 49, mass: 1, delay: 0.012 },
        );

        const group = new GroupAnimation([
            containerAnim,
            contentTranslateAnim,
            contentOpacityAnim,
            contentBlurAnim,
        ]);

        animationRef.current = group;

        group.finished.then(() => {
            if (refContent.current) {
                refContent.current.removeAttribute('style');
            }
        });
    };

    return { playEnter, playExit };
}
