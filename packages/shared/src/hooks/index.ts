import { useCustomWebkitScrollbar } from './useCustomWebkitScrollbar';

export { useIsMounted } from './useIsMounted';

export const hooks = {
    useCustomWebkitScrollbar,
};

export * from './use-force-update';
export * from './use-ref-as-state';

export {
    type SpringOptions,
    type AnimationValues,
    type SpringHookType,
} from './animation/spring-options';
export { useAccordionSpringAnimation } from './animation/use-accordion-spring-animation';
export {
    useSpringTransition,
    type AnimationParams,
} from './animation/use-universal-modal-animation';

export { useModalSpringTransition } from './animation/use-modal-animation';
