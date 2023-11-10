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
                className={cn(styles.component, className, { [styles.border]: border })}
            >
                {Children.map(children, (tab) =>
                    cloneElement(tab, {
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

export const TabBar = Object.assign(TabBarComponent, { Tab });
