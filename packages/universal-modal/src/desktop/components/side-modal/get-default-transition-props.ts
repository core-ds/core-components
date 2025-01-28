import { RefObject } from 'react';
import { ModalBySideProps } from '../../types/props';
import { getMarginValues } from '../../../utils/getMarginValues';

type Params = {
    componentRef: RefObject<HTMLDivElement>;
    horizontalAlign: ModalBySideProps['horizontalAlign'];
    margin: ModalBySideProps['margin'];
};

export const getDefaultTransitionProps = (params: Params) => {
    const { componentRef, horizontalAlign, margin = [0] } = params;
    const isHorizontalStart = horizontalAlign === 'start';
    const isHorizontalEnd = horizontalAlign === 'end';

    const { right, left } = getMarginValues(margin);

    return {
        classNames: {},
        timeout: 200,
        onEnter: () => {
            if (componentRef.current) {
                if (isHorizontalStart) {
                    componentRef.current.style.transform = `translateX(calc(-100% - ${left}px))`;
                }
                if (isHorizontalEnd) {
                    componentRef.current.style.transform = `translateX(calc(100% + ${right}px))`;
                }
            }
        },
        onEntering: () => {
            if (componentRef.current) {
                componentRef.current.style.transform = 'translateX(0)';
                componentRef.current.style.transition = 'transform 200ms ease-in';
            }
        },
        onEntered: () => {
            if (componentRef.current) {
                componentRef.current.style.transform = 'translateX(0)';
            }
        },
        onExit: () => {
            if (componentRef.current) {
                componentRef.current.style.transform = 'translateX(0)';
            }
        },
        onExiting: () => {
            if (componentRef.current) {
                componentRef.current.style.transition = 'transform 200ms ease-out';

                if (isHorizontalStart) {
                    componentRef.current.style.transform = `translateX(calc(-100% - ${left}px))`;
                }

                if (isHorizontalEnd) {
                    componentRef.current.style.transform = `translateX(calc(100% + ${right}px))`;
                }
            }
        },
    };
};
