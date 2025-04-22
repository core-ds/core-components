import cn from 'classnames';

import { UniversalModalDesktopProps } from '../../types/props';

import transitions from './styles/transitions/transitions.module.css';

type Params = {
    horizontalAlign: UniversalModalDesktopProps['horizontalAlign'];
    margin: UniversalModalDesktopProps['margin'];
};

export const getDefaultTransitionProps = (params: Params) => {
    const { horizontalAlign, margin } = params;
    const isHorizontalStart = horizontalAlign === 'start';
    const isHorizontalEnd = horizontalAlign === 'end';

    const enterCn = cn({
        [transitions[`enterLeft-${margin?.left || 0}`]]: isHorizontalStart,
        [transitions[`enterRight-${margin?.right || 0}`]]: isHorizontalEnd,
    });

    const exitCn = cn({
        [transitions[`exitActiveLeft-${margin?.left || 0}`]]: isHorizontalStart,
        [transitions[`exitActiveRight-${margin?.right || 0}`]]: isHorizontalEnd,
    });

    return {
        timeout: 200,
        classNames: {
            appear: enterCn,
            enter: enterCn,
            appearActive: transitions.enterActive,
            enterActive: transitions.enterActive,
            appearDone: transitions.enterDone,
            enterDone: transitions.enterDone,
            exit: transitions.exit,
            exitActive: exitCn,
            exitDone: exitCn,
        },
    };
};
