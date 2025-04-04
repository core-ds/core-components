import type { CornersRadiusType, UnderlayBorderRadius } from '../types';

import styles from '../index.module.css';

export const getBorderCorners = (
    borderRadius: UnderlayBorderRadius | CornersRadiusType | undefined,
) => {
    const bordersSize =
        typeof borderRadius === 'string'
            ? {
                  bottomRight: borderRadius,
                  bottomLeft: borderRadius,
                  topRight: borderRadius,
                  topLeft: borderRadius,
              }
            : borderRadius;

    return (
        bordersSize && {
            [styles[`border-bottom-right-${bordersSize.bottomRight}`]]: bordersSize.bottomRight,
            [styles[`border-bottom-left-${bordersSize.bottomLeft}`]]: bordersSize.bottomLeft,
            [styles[`border-top-right-${bordersSize.topRight}`]]: bordersSize.topRight,
            [styles[`border-top-left-${bordersSize.topLeft}`]]: bordersSize.topLeft,
        }
    );
};
