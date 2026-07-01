import { type RefObject, useRef } from 'react';
import { GroupAnimation, spring } from 'motion';
import { animate } from 'motion/mini';

export function useStepsAnimation<T extends HTMLElement>(ref: RefObject<T | null>) {
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

        const group = new GroupAnimation([containerAnim]);

        animationRef.current = group;
    };

    const playExit = () => {
        const el = ref.current;

        if (!el) {
            return;
        }

        animationRef.current?.stop();

        const containerAnim = animate(
            el,
            { height: 0 },
            { type: spring, stiffness: 743, damping: 49, mass: 1, delay: 0.075 },
        );

        const group = new GroupAnimation([containerAnim]);

        animationRef.current = group;
    };

    return { playEnter, playExit };
}
