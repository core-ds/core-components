import React, {Fragment} from 'react';

import { UniversalDateInput } from '@alfalab/core-components-universal-date-input';
import { UniversalDateInputDesktop } from '@alfalab/core-components-universal-date-input/desktop';
import { UniversalDateInputMobile } from '@alfalab/core-components-universal-date-input/mobile';

export const Component = () => (
    <Fragment>
        <UniversalDateInput size="s" view='date' />
        <UniversalDateInput size={"s"} view='date' />
        <UniversalDateInputDesktop size="s" view='date' />
        <UniversalDateInputDesktop size={"s"} view='date' />
        <UniversalDateInputMobile size="s" view='date' />
        <UniversalDateInputMobile size={"s"} view='date' />

        <UniversalDateInput size="m" view='date' />
        <UniversalDateInput size={"m"} view='date' />
        <UniversalDateInputDesktop size="m" view='date' />
        <UniversalDateInputDesktop size={"m"} view='date' />
        <UniversalDateInputMobile size="m" view='date' />
        <UniversalDateInputMobile size={"m"} view='date' />

        <UniversalDateInput size="l" view='date' />
        <UniversalDateInput size={"l"} view='date' />
        <UniversalDateInputDesktop size="l" view='date' />
        <UniversalDateInputDesktop size={"l"} view='date' />
        <UniversalDateInputMobile size="l" view='date' />
        <UniversalDateInputMobile size={"l"} view='date' />

        <UniversalDateInput size="xl" view='date' />
        <UniversalDateInput size={"xl"} view='date' />
        <UniversalDateInputDesktop size="xl" view='date' />
        <UniversalDateInputDesktop size={"xl"} view='date' />
        <UniversalDateInputMobile size="xl" view='date' />
        <UniversalDateInputMobile size={"xl"} view='date' />
    </Fragment>
);
