import React, { FC, useState, ReactNode } from 'react';
import { Tabs, Tab, TabsProps } from '@balafla/core-components-tabs';
import { ArgTypes } from '@storybook/addon-docs';
import cn from 'classnames';

import styles from './index.module.css';

type Props = {
    components: Record<string, ReactNode>;
};

export const ArgsTabs: FC<Props> = ({ components }) => {
    const [selected, setSelected] = useState(0);

    const handleChange: TabsProps['onChange'] = (_, { selectedId }) => {
        setSelected(selectedId as number);
    };

    const keys = Object.keys(components);

    return (
        <Tabs
            className={cn(styles.tabsTypes, 'sb-unstyled')}
            selectedId={selected}
            onChange={handleChange}
            view='secondary'
            size='xxs'
            scrollable={true}
        >
            {keys.map((key, index) => (
                <Tab key={key} id={index} title={key}>
                    {components[key] ? (
                        <ArgTypes of={components[key]} />
                    ) : (
                        <div className={styles.error}>Что-то пошло не так </div>
                    )}
                </Tab>
            ))}
        </Tabs>
    );
};
