import React, {Fragment} from 'react';

import { FilterTag } from '@alfalab/core-components-filter-tag';
import { FilterTagDesktop } from '@alfalab/core-components-filter-tag/desktop';
import { FilterTagMobile } from '@alfalab/core-components-filter-tag/mobile';

export const Component = () => (
    <Fragment>
        <FilterTag size="xxs" />
        <FilterTag size={"xxs"} />
        <FilterTagDesktop size="xxs" />
        <FilterTagDesktop size={"xxs"} />
        <FilterTagMobile size="xxs" />
        <FilterTagMobile size={"xxs"} />

        <FilterTag size="xs" />
        <FilterTag size={"xs"} />
        <FilterTagDesktop size="xs" />
        <FilterTagDesktop size={"xs"} />
        <FilterTagMobile size="xs" />
        <FilterTagMobile size={"xs"} />

        <FilterTag size="s" />
        <FilterTag size={"s"} />
        <FilterTagDesktop size="s" />
        <FilterTagDesktop size={"s"} />
        <FilterTagMobile size="s" />
        <FilterTagMobile size={"s"} />
    </Fragment>
);
