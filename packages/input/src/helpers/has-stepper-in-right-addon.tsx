import { Children, isValidElement, ReactNode } from 'react';

/** Позволяет узнать если в переданных элементах аддона компонент Steppers */
export const hasStepperInRightAddon = (rightAddon: ReactNode): boolean =>
    Children.toArray(rightAddon).some((child) => {
        if (isValidElement(child)) {
            const elementType = child.type as { displayName?: string };

            if (elementType.displayName === 'Steppers') {
                return true;
            }

            if (child.props && child.props.children) {
                return hasStepperInRightAddon(child.props.children);
            }
        }

        return false;
    });
