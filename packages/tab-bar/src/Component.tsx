import React, { Children, cloneElement, forwardRef } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { Tab } from './components/tab';
import { TabBarProps } from './types';

import styles from './index.module.css';

const TabBarComponent = forwardRef<HTMLDivElement, TabBarProps>(
    (
        {
            children,
            className,
            selectedId,
            border,
            dataTestId,
            tabClassNames,
            onChange,
            accentColor = 'primary',
            bgColor = 'modal-bg-primary',
            ...restProps
        },
        ref,
    ) => {
        if (Children.count(children) > 5) {
            // eslint-disable-next-line no-console
            console.error('Компонент TabBar не может содержать больше 5 табов');
        }

        return (
            <nav
                data-test-id={dataTestId}
                {...restProps}
                ref={ref}
                className={cn(styles.component, styles[bgColor], className, {
                    [styles.border]: border,
                })}
            >
                {Children.map(children, (tab) =>
                    cloneElement(tab, {
                        bgColor,
                        accentColor,
                        selected: tab.props.id === selectedId,
                        onChange,
                        tabClassNames,
                        dataTestId: getDataTestId(dataTestId, 'tab'),
                    }),
                )}
            </nav>
        );
    },
);

TabBarComponent.displayName = 'TabBarComponent';

export const TabBar = Object.assign(TabBarComponent, { Tab });
