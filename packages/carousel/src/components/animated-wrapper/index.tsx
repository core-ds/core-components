import React, {
    cloneElement,
    type ComponentProps,
    forwardRef,
    isValidElement,
    type ReactElement,
    type ReactNode,
    useMemo,
    useRef,
} from 'react';
import cn from 'classnames';

import { useForceUpdate } from '@alfalab/core-components-shared';

import styles from './index.module.css';

function onlyElements(children: ReactNode): ReactElement[] {
    return React.Children.toArray(children).filter(isValidElement);
}

type ComponentKey = NonNullable<ReactElement['key']>;

function getChildKey(child: ReactElement): ComponentKey {
    return child.key!;
}

export const AnimatedWrapper = forwardRef<React.ElementRef<'div'>, ComponentProps<'div'>>(
    ({ children: childrenFromProps, ...restProps }, ref) => {
        const children = useMemo(() => onlyElements(childrenFromProps), [childrenFromProps]);
        const keys = useMemo(() => new Set(children.map(getChildKey)), [children]);
        const forceUpdate = useForceUpdate();
        const latestChildrenRef = useRef(children);
        const latestChildren = latestChildrenRef.current;
        const nextChildren = [...children];

        for (let index = 0; index < latestChildren.length; index++) {
            const child = latestChildren[index];
            const key = getChildKey(child);

            if (!keys.has(key)) {
                nextChildren.splice(index, 0, child);
            }
        }

        latestChildrenRef.current = nextChildren;

        return (
            <div {...restProps} ref={ref}>
                {latestChildrenRef.current.map((child: ReactElement<ComponentProps<'div'>>) => {
                    const key = getChildKey(child);

                    return keys.has(key)
                        ? child
                        : cloneElement<ComponentProps<'div'>>(child, {
                              ...child.props,
                              key,
                              className: cn(child.props.className, styles.remove),
                              onAnimationEnd: (event) => {
                                  child.props?.onAnimationEnd?.(event);
                                  // TODO somehow call in useEffect
                                  latestChildrenRef.current = latestChildrenRef.current.filter(
                                      (c) => getChildKey(c) !== key,
                                  );
                                  forceUpdate();
                              },
                          });
                })}
            </div>
        );
    },
);
