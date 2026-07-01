import { type RefObject, useRef } from 'react';
import { GroupAnimation, spring } from 'motion';
import { animate } from 'motion/mini';

export function useStepsAnimation<T extends HTMLElement>(ref: RefObject<T | null>) {
    const animationRef = useRef<GroupAnimation | null>(null);

    const playEnter = async () => {
        const el = ref.current;

        if (!el) {
            return;
        }

        animationRef.current?.stop();

        const containerAnim = animate(
            el,
            { scale: [1, 0.5] },
            { type: spring, stiffness: 571, damping: 45, mass: 1 },
        );

        const group = new GroupAnimation([containerAnim]);

        animationRef.current = group;

        await group.finished;
    };

    const playExit = async () => {
        const el = ref.current;

        if (!el) {
            return;
        }

        animationRef.current?.stop();

        const containerAnim = animate(
            el,
            { scale: [1, 0.75] },
            { type: spring, stiffness: 571, damping: 45, mass: 1 },
        );

        const group = new GroupAnimation([containerAnim]);

        animationRef.current = group;

        await group.finished;
    };

    return { playEnter, playExit };
}
