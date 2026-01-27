import React, {Fragment} from 'react';

import { SliderInput } from '@alfalab/core-components-slider-input';

export const Component = () => (
    <Fragment>
        <SliderInput size="s" />
        <SliderInput size={"s"} />

        <SliderInput size="m" />
        <SliderInput size={"m"} />

        <SliderInput size="l" />
        <SliderInput size={"l"} />

        <SliderInput size="xl" />
        <SliderInput size={"xl"} />
    </Fragment>
);
