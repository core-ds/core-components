import cn from 'classnames';

import { getMarginValues } from '../../../utils/getMarginValues';
import { ModalBySideProps } from '../../types/props';

import transitions from './styles/transitions/transitions.module.css';

type Params = {
    horizontalAlign: ModalBySideProps['horizontalAlign'];
    margin: ModalBySideProps['margin'];
};

export const getDefaultTransitionProps = (params: Params) => {
    const { horizontalAlign, margin = [0] } = params;
    const isHorizontalStart = horizontalAlign === 'start';
    const isHorizontalEnd = horizontalAlign === 'end';

    const { right, left } = getMarginValues(margin);

    const enterCn = cn({
        [transitions[`enterLeft-${left}`]]: isHorizontalStart,
        [transitions[`enterRight-${right}`]]: isHorizontalEnd,
    });

    const exitCn = cn({
        [transitions[`exitActiveLeft-${left}`]]: isHorizontalStart,
        [transitions[`exitActiveRight-${right}`]]: isHorizontalEnd,
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
