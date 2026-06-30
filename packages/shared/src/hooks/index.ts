import { useCustomWebkitScrollbar } from './useCustomWebkitScrollbar';

export { useIsMounted } from './useIsMounted';

export const hooks = {
    useCustomWebkitScrollbar,
};

export * from './use-force-update';
export * from './use-ref-as-state';

export { useSpringAnimation } from './useSpringAnimation';

export { type SpringOptions, type AnimationValues } from './animation/spring-options';
export { useAccordionSpringAnimation } from './animation/use-accordion-spring-animation';
export {
    useSpringTransition,
    type AnimationParams,
} from './animation/use-universal-modal-animation';
