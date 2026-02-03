import React, {Fragment} from 'react';

import { SortableList } from '@alfalab/core-components-sortable-list';

export const Component = () => (
    <Fragment>
        <SortableList padding={2} items={[]} renderItem={() => <div>1</div>} />
        <SortableList padding={2} items={[]} renderItem={() => <div>1</div>} />

        <SortableList padding={4} items={[]} renderItem={() => <div>1</div>} />
        <SortableList padding={4} items={[]} renderItem={() => <div>1</div>} />

        <SortableList padding={8} items={[]} renderItem={() => <div>1</div>} />
        <SortableList padding={8} items={[]} renderItem={() => <div>1</div>} />

        <SortableList padding={12} items={[]} renderItem={() => <div>1</div>} />
        <SortableList padding={12} items={[]} renderItem={() => <div>1</div>} />

        <SortableList padding={16} items={[]} renderItem={() => <div>1</div>} />
        <SortableList padding={16} items={[]} renderItem={() => <div>1</div>} />

        <SortableList padding={20} items={[]} renderItem={() => <div>1</div>} />
        <SortableList padding={20} items={[]} renderItem={() => <div>1</div>} />

        <SortableList borderRadius={8} items={[]} renderItem={() => <div>1</div>} />
        <SortableList borderRadius={8} items={[]} renderItem={() => <div>1</div>} />

        <SortableList borderRadius={12} items={[]} renderItem={() => <div>1</div>} />
        <SortableList borderRadius={12} items={[]} renderItem={() => <div>1</div>} />

        <SortableList borderRadius={16} items={[]} renderItem={() => <div>1</div>} />
        <SortableList borderRadius={16} items={[]} renderItem={() => <div>1</div>} />
    </Fragment>
);
