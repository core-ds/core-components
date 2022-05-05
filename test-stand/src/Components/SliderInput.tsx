import React from 'react';
import { SliderInput, SliderInputProps } from '@alfalab/core-components-slider-input';
import { Wrapper } from './Wrapper';

const min = 0;
const max = 10;
const step = 1;
const steps = ['0', '5', '10'];
const normalizeValue = (value: number | '', max_: number): string =>
    value === '' ? '' : Math.min(max_, Number(value.toString().replace(/[^\d-]/g, ''))).toString();

const SliderInputExample = () => {
    const [value, setValue] = React.useState('');

    const handleChange: SliderInputProps['onChange'] = (event, { value }) =>
        setValue(normalizeValue(value, max));

    return (
        <Wrapper>
            <SliderInput
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={handleChange}
                block={true}
                steps={steps}
            />
        </Wrapper>
    );
};

export default SliderInputExample;
