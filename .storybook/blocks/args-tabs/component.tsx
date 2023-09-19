import React, { FC, useState, ReactNode } from 'react';
import { Tabs, Tab, TabsProps } from '@alfalab/core-components-tabs';
import { ArgTypes } from '@storybook/addon-docs';

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
            className='sb-unstyled'
            selectedId={selected}
            onChange={handleChange}
            containerClassName={styles.tabsTypes}
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
