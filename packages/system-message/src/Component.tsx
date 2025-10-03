import React, { isValidElement, useMemo } from 'react';
import cn from 'classnames';

import { createPaddingStyle } from '@alfalab/core-components-shared';

import { SystemMessageContext } from './Context';
import { type SystemMessageBaseProps } from './types';

import styles from './index.module.css';

const isControlsElement = (obj: JSX.Element) =>
    typeof obj === 'object' && obj.type.displayName === 'Controls';

const DEFAULT_DESKTOP_PADDING = { left: 40, right: 40, bottom: 24 };

const DEFAULT_MOBILE_PADDING = undefined;

export const SystemMessage: React.FC<SystemMessageBaseProps> = ({
    view,
    dataTestId,
    children,
    fullHeight,
    padding: paddingProp,
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

    const padding =
        paddingProp ?? (view === 'desktop' ? DEFAULT_DESKTOP_PADDING : DEFAULT_MOBILE_PADDING);

    return (
        <SystemMessageContext.Provider value={contextValue}>
            <div
                data-test-id={dataTestId}
                className={cn(styles.component, className, {
                    [styles.fullHeight]: fullHeight,
                })}
                style={createPaddingStyle(padding)}
            >
                {fullHeight ? renderChildrenWithFullHeight() : children}
            </div>
        </SystemMessageContext.Provider>
    );
};
