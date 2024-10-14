import React, { forwardRef, Fragment } from 'react';
import cn from 'classnames';
import SimpleBar, { Props as SimpleBarProps } from 'simplebar-react';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

type PrivateScrollbarRef = React.ComponentRef<typeof SimpleBar>;

interface NodeProps {
    className?: string;
    ref?: React.Ref<HTMLElement | undefined>;
}

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
} as const;

export interface PrivateScrollbarProps extends Pick<SimpleBarProps, 'tabIndex'> {
    children:
        | ((props: {
              scrollableNodeProps?: NodeProps;
              contentNodeProps?: NodeProps;
          }) => React.ReactNode)
        | React.ReactNode;
    style?: React.CSSProperties;
    /**
     * @default false
     */
    native?: boolean;
    /**
     * @default default
     */
    colors?: 'default' | 'inverted';
}

export const PrivateScrollbar = forwardRef<PrivateScrollbarRef, PrivateScrollbarProps>(
    ({ children, native = false, style, colors = 'default', tabIndex }, ref) => {
        if (native) {
            return (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <Fragment>
                    {typeof children === 'function'
                        ? children({ scrollableNodeProps: { className: styles.nativeScrollbar } })
                        : children}
                </Fragment>
            );
        }

        return (
            <SimpleBar
                ref={ref}
                style={style}
                className={cn(styles.component, colorStyles[colors].component)}
                tabIndex={tabIndex}
            >
                {children}
            </SimpleBar>
        );
    },
);
