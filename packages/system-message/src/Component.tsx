import React, { isValidElement, useMemo } from 'react';
import cn from 'classnames';

import { SystemMessageContext } from './Context';
import type { SystemMessageBaseProps } from './types';

import desktopStyles from './desktop.module.css';
import styles from './index.module.css';
import mobileStyles from './mobile.module.css';

const isControlsElement = (obj: JSX.Element) =>
    typeof obj === 'object' && obj.type.displayName === 'Controls';

export const SystemMessage: React.FC<SystemMessageBaseProps> = ({
    view,
    dataTestId,
    children,
    fullHeight,
    className,
}) => {
    const contextValue = useMemo(
        () => ({ dataTestId, view, fullHeight }),
        [view, dataTestId, fullHeight],
    );

    const renderChildrenWithFullHeight = () => {
        const renderCloned = (child: JSX.Element, extraClassName: string) =>
            React.cloneElement(child, {
                ...child.props,
                className: cn(child.props.className, extraClassName),
            });

        const childrenArray = React.Children.toArray(children);
        const childrenCount = childrenArray.length;

        return childrenArray.map((child, idx) => {
            const isFirstElement = idx === 0;
            const isLastElement = idx + 1 === childrenCount;

            if (isFirstElement && isValidElement(child)) {
                if (isLastElement) {
                    return renderCloned(child, styles.both);
                }

                return renderCloned(child, styles.first);
            }

            if (isLastElement && isValidElement(child)) {
                return renderCloned(
                    child,
                    isControlsElement(child) ? styles.controls : styles.last,
                );
            }

            return child;
        });
    };

    return (
        <SystemMessageContext.Provider value={contextValue}>
            <div
                data-test-id={dataTestId}
                className={cn(styles.component, className, {
                    [mobileStyles.component]: view === 'mobile',
                    [desktopStyles.component]: view === 'desktop',
                    [styles.fullHeight]: fullHeight,
                })}
            >
                {fullHeight ? renderChildrenWithFullHeight() : children}
            </div>
        </SystemMessageContext.Provider>
    );
};
