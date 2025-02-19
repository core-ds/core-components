import { TransitionProps } from 'react-transition-group/Transition';

import { BackdropProps } from '@alfalab/core-components-backdrop';
import { exhaustiveCheck } from '@alfalab/core-components-shared';

import { UniversalModalDesktopProps } from '../types/props';

import fullSizeBackdropTransitions from '../styles/transitions/full-size-backdrop-transitions.module.css';
import fullSizeVerticalBottomTransitions from '../styles/transitions/full-size-vertical-bottom-transitions.module.css';
import fullSizeVerticalCenterTransitions from '../styles/transitions/full-size-vertical-center-transitions.module.css';
import fullSizeVerticalTopTransitions from '../styles/transitions/full-size-vertical-top-transitions.module.css';

type Params = {
    verticalAlign: Exclude<UniversalModalDesktopProps['verticalAlign'], undefined>;
    width: UniversalModalDesktopProps['width'];
    height: UniversalModalDesktopProps['height'];
};

type ReturnType = {
    isFullSizeModal: boolean;
    backdropTransitions: Partial<BackdropProps>;
    componentTransitions: Partial<TransitionProps>;
};

export const getFullSizeModalTransitions = (params: Params): ReturnType => {
    const { verticalAlign, width, height } = params;

    const isFullSizeModal = width === 'fullWidth' && height === 'fullHeight';

    const backdropTransitions = {
        timeout: {
            enter: 0,
            exit: 400,
        },
        transitionClassNames: fullSizeBackdropTransitions,
    };

    const getContentTransitionsClassNames = () => {
        switch (verticalAlign) {
            case 'top':
                return fullSizeVerticalTopTransitions;
            case 'bottom':
                return fullSizeVerticalBottomTransitions;
            case 'center':
                return fullSizeVerticalCenterTransitions;
            default:
                return exhaustiveCheck(verticalAlign);
        }
    };

    const componentTransitions = {
        timeout: {
            enter: 200,
            exit: 400,
        },
        classNames: getContentTransitionsClassNames(),
    };

    return {
        isFullSizeModal,
        backdropTransitions,
        componentTransitions,
    };
};
