import { useCustomWebkitScrollbar } from './useCustomWebkitScrollbar';

export { useIsMounted } from './useIsMounted';

export const hooks = {
    useCustomWebkitScrollbar,
};

export * from './use-force-update';
export * from './use-ref-as-state';

export {
    useSpringAnimation,
    useSpringTransition,
    type AnimationValues,
} from './useSpringAnimation';

export {
    type SpringOptions,
    ACCORDION_EXPAND_SPRING,
    ACCORDION_COLLAPSE_SPRING,
} from './animation/spring-options';
export {
    useAccordionSpringAnimation,
    type AccordionAnimationVariant,
} from './animation/use-accordion-spring-animation';
export { useAccordionContentAnimation } from './animation/use-accordion-content-animation';
