import { type RefObject } from 'react';
import { type TransitionProps } from 'react-transition-group/Transition';

export type Dimention = 'height' | 'width';

export interface HeadlessCollapseProps<T extends HTMLElement>
    extends Pick<TransitionProps, 'children'> {
    in?: boolean;
    nodeRef: RefObject<T>;
    getDimensionValue?: (node: T, dimention: Dimention) => void;
    dimension?: Dimention;
}
