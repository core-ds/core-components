import React from 'react';
import { Tab } from '@alfalab/core-components-tabs';
import {
    TabsDesktop,
    TabsDesktopProps,
} from '@alfalab/core-components-tabs/src/components/tabs/Component.desktop';
import { Wrapper } from './Wrapper';

const TabsExample = () => {
    const [selectedId, setSelectedId] = React.useState<string | number>('tab-1');

    const handleChange: TabsDesktopProps['onChange'] = (event, { selectedId }) =>
        setSelectedId(selectedId);

    return (
        <Wrapper>
            <TabsDesktop selectedId={selectedId} onChange={handleChange}>
                <Tab title='Таб 1' id='tab-1'>
                    Таб 1
                </Tab>
                <Tab title='Таб 2' id='tab-2'>
                    Таб 2
                </Tab>
                <Tab title='Таб 3' id='tab-3'>
                    Таб 3
                </Tab>
                <Tab title='Таб 4' id='tab-4'>
                    Таб 4
                </Tab>
                <Tab title='Таб 5' id='tab-5'>
                    Таб 5
                </Tab>
            </TabsDesktop>
        </Wrapper>
    );
};

export default TabsExample;
