import React from 'react';
import { Slider, SliderProps } from '@alfalab/core-components-slider';
import { Wrapper } from './Wrapper';

const SliderExample = () => {
    const [value, setValue] = React.useState(50);

    const handleChange: SliderProps['onChange'] = (event, { value }) => setValue(value);

    return (
        <Wrapper>
            <Slider value={value} onChange={handleChange} />
        </Wrapper>
    );
};

export default SliderExample;
