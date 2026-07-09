import React, {Fragment} from 'react';

import { FilterTag } from '@alfalab/core-components-filter-tag';
import { FilterTagDesktop } from '@alfalab/core-components-filter-tag/desktop';
import { FilterTagMobile } from '@alfalab/core-components-filter-tag/mobile';

export const Component = () => (
    <Fragment>
        <FilterTag size={32} />
        <FilterTag size={32} />
        <FilterTagDesktop size={32} />
        <FilterTagDesktop size={32} />
        <FilterTagMobile size={32} />
        <FilterTagMobile size={32} />

        <FilterTag size={40} />
        <FilterTag size={40} />
        <FilterTagDesktop size={40} />
        <FilterTagDesktop size={40} />
        <FilterTagMobile size={40} />
        <FilterTagMobile size={40} />

        <FilterTag size={48} />
        <FilterTag size={48} />
        <FilterTagDesktop size={48} />
        <FilterTagDesktop size={48} />
        <FilterTagMobile size={48} />
        <FilterTagMobile size={48} />
    </Fragment>
);
