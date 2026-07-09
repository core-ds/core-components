import React, {Fragment} from 'react';

import { SegmentedControl, Segment } from '@alfalab/core-components-segmented-control';

export const Component = () => (
    <Fragment>
        <SegmentedControl size='xxs' selectedId={1} onChange={() => {}}>
            <Segment id={1} title='Label' />
            <Segment id={2} title='Label' />
        </SegmentedControl>
        <SegmentedControl size={'xxs'} selectedId={1} onChange={() => {}}>
            <Segment id={1} title='Label' />
            <Segment id={2} title='Label' />
        </SegmentedControl>

        <SegmentedControl size='xs' selectedId={1} onChange={() => {}}>
            <Segment id={1} title='Label' />
            <Segment id={2} title='Label' />
        </SegmentedControl>
        <SegmentedControl size={'xs'} selectedId={1} onChange={() => {}}>
            <Segment id={1} title='Label' />
            <Segment id={2} title='Label' />
        </SegmentedControl>
    </Fragment>
);
