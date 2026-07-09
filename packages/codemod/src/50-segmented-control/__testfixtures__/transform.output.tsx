import React, {Fragment} from 'react';

import { SegmentedControl, Segment } from '@alfalab/core-components-segmented-control';

export const Component = () => (
    <Fragment>
        <SegmentedControl size={32} selectedId={1} onChange={() => {}}>
            <Segment id={1} title='Label' />
            <Segment id={2} title='Label' />
        </SegmentedControl>
        <SegmentedControl size={32} selectedId={1} onChange={() => {}}>
            <Segment id={1} title='Label' />
            <Segment id={2} title='Label' />
        </SegmentedControl>

        <SegmentedControl size={40} selectedId={1} onChange={() => {}}>
            <Segment id={1} title='Label' />
            <Segment id={2} title='Label' />
        </SegmentedControl>
        <SegmentedControl size={40} selectedId={1} onChange={() => {}}>
            <Segment id={1} title='Label' />
            <Segment id={2} title='Label' />
        </SegmentedControl>
    </Fragment>
);
