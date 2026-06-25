import { type RefObject, useEffect, useRef } from 'react';
import { spring } from 'motion';
import { animate } from 'motion/mini';

import { ACCORDION_COLLAPSE_SPRING, ACCORDION_EXPAND_SPRING } from './spring-options';

export type AccordionAnimationVariant = 'spring' | 'css';

const BODY_MARGIN_TOP = 12;
const CLOSE_DELAY = 0.075;

export function useAccordionSpringAnimation<T extends HTMLElement>(
    ref: RefObject<T | null>,
    isExpanded: boolean,
    contentHeight: number,
    variant: AccordionAnimationVariant = 'css',
): void {
    const animationRef = useRef<ReturnType<typeof animate> | null>(null);
    const isInitialMount = useRef(true);
    const prevIsExpanded = useRef(isExpanded);
    const isExpandedRef = useRef(isExpanded);

    isExpandedRef.current = isExpanded;

    useEffect(() => {
        if (variant !== 'spring' || !ref.current) return;
        const el = ref.current;

        if (isInitialMount.current) {
            isInitialMount.current = false;
            prevIsExpanded.current = isExpanded;

            if (isExpanded) {
                el.style.visibility = 'visible';
                el.style.height = 'auto';
                el.style.marginTop = `${BODY_MARGIN_TOP}px`;
            } else {
                el.style.visibility = 'hidden';
                el.style.height = '0px';
                el.style.marginTop = '0px';
            }

            return;
        }

        const expandedChanged = prevIsExpanded.current !== isExpanded;

        prevIsExpanded.current = isExpanded;

        if (!expandedChanged) {
            if (isExpanded && !animationRef.current) {
                el.style.height = `${contentHeight}px`;
            }

            return;
        }

        const currentHeight = el.offsetHeight;
        const currentMarginTop = parseFloat(el.style.marginTop) || 0;

        animationRef.current?.cancel();
        el.style.height = `${currentHeight}px`;
        el.style.marginTop = `${currentMarginTop}px`;
        animationRef.current = null;

        if (isExpanded) {
            el.style.visibility = 'visible';
            animationRef.current = animate(
                el,
                { height: contentHeight, marginTop: BODY_MARGIN_TOP },
                { type: spring, ...ACCORDION_EXPAND_SPRING },
            );
            animationRef.current.then(() => {
                animationRef.current = null;
            });
        } else {
            animationRef.current = animate(
                el,
                { height: 0, marginTop: 0 },
                { type: spring, ...ACCORDION_COLLAPSE_SPRING, delay: CLOSE_DELAY },
            );
            animationRef.current.then(() => {
                animationRef.current = null;
                if (!isExpandedRef.current && el) {
                    el.style.visibility = 'hidden';
                }
            });
        }
    }, [isExpanded, contentHeight, variant, ref]);

    useEffect(
        () => () => {
            animationRef.current?.cancel();
        },
        [],
    );
}
