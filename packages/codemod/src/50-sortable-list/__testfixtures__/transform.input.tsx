import React, {Fragment} from 'react';

import { SortableList } from '@alfalab/core-components-sortable-list';

export const Component = () => (
    <Fragment>
        <SortableList padding='3xs' items={[]} renderItem={() => <div>1</div>} />
        <SortableList padding={'3xs'} items={[]} renderItem={() => <div>1</div>} />

        <SortableList padding='2xs' items={[]} renderItem={() => <div>1</div>} />
        <SortableList padding={'2xs'} items={[]} renderItem={() => <div>1</div>} />

        <SortableList padding='xs' items={[]} renderItem={() => <div>1</div>} />
        <SortableList padding={'xs'} items={[]} renderItem={() => <div>1</div>} />

        <SortableList padding='s' items={[]} renderItem={() => <div>1</div>} />
        <SortableList padding={'s'} items={[]} renderItem={() => <div>1</div>} />

        <SortableList padding='m' items={[]} renderItem={() => <div>1</div>} />
        <SortableList padding={'m'} items={[]} renderItem={() => <div>1</div>} />

        <SortableList padding='l' items={[]} renderItem={() => <div>1</div>} />
        <SortableList padding={'l'} items={[]} renderItem={() => <div>1</div>} />

        <SortableList borderRadius='m' items={[]} renderItem={() => <div>1</div>} />
        <SortableList borderRadius={'m'} items={[]} renderItem={() => <div>1</div>} />

        <SortableList borderRadius='l' items={[]} renderItem={() => <div>1</div>} />
        <SortableList borderRadius={'l'} items={[]} renderItem={() => <div>1</div>} />

        <SortableList borderRadius='xl' items={[]} renderItem={() => <div>1</div>} />
        <SortableList borderRadius={'xl'} items={[]} renderItem={() => <div>1</div>} />
    </Fragment>
);
