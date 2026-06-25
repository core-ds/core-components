import { type RefObject, useEffect, useRef } from 'react';
import { spring } from 'motion';
import { animate } from 'motion/mini';

import { ACCORDION_COLLAPSE_SPRING, ACCORDION_EXPAND_SPRING } from './spring-options';
import { type AccordionAnimationVariant } from './use-accordion-spring-animation';

export function useAccordionContentAnimation<T extends HTMLElement>(
    ref: RefObject<T | null>,
    isExpanded: boolean,
    variant: AccordionAnimationVariant = 'css',
): void {
    const animationsRef = useRef<Array<ReturnType<typeof animate>>>([]);
    const isInitialMount = useRef(true);
    const prevIsExpanded = useRef(isExpanded);

    useEffect(() => {
        if (variant !== 'spring' || !ref.current) return;
        const el = ref.current;

        if (isInitialMount.current) {
            isInitialMount.current = false;
            prevIsExpanded.current = isExpanded;
            if (!isExpanded) {
                animate(
                    el,
                    { opacity: 0, filter: 'blur(2.5px)', translate: '0px -10px' },
                    { duration: 0 },
                );
            }

            return;
        }

        const expandedChanged = prevIsExpanded.current !== isExpanded;

        prevIsExpanded.current = isExpanded;

        if (!expandedChanged) return;

        animationsRef.current.forEach((a) => a.cancel());
        animationsRef.current = [];

        if (isExpanded) {
            animationsRef.current = [
                animate(
                    el,
                    { opacity: [0, 1] },
                    { type: spring, ...ACCORDION_EXPAND_SPRING, delay: 0.09 },
                ),
                animate(
                    el,
                    { filter: ['blur(2.5px)', 'blur(0px)'] },
                    { type: spring, ...ACCORDION_EXPAND_SPRING, delay: 0.102 },
                ),
                animate(
                    el,
                    { translate: ['0px -10px', '0px 0px'] },
                    { type: spring, ...ACCORDION_EXPAND_SPRING, delay: 0.075 },
                ),
            ];
        } else {
            animationsRef.current = [
                animate(el, { opacity: [1, 0] }, { type: spring, ...ACCORDION_COLLAPSE_SPRING }),
                animate(
                    el,
                    { filter: ['blur(0px)', 'blur(2.5px)'] },
                    { type: spring, ...ACCORDION_COLLAPSE_SPRING, delay: 0.025 },
                ),
                animate(
                    el,
                    { translate: ['0px 0px', '0px -6px'] },
                    { type: spring, ...ACCORDION_COLLAPSE_SPRING, delay: 0.012 },
                ),
            ];
        }
    }, [isExpanded, variant, ref]);

    useEffect(
        () => () => {
            animationsRef.current.forEach((a) => a.cancel());
        },
        [],
    );
}
