import React from 'react';
import { Tag } from '@alfalab/core-components-tag';
import { Wrapper } from './Wrapper';

const TagExample = () => {
    const [checked, setChecked] = React.useState(false);
    const handleClick = () => setChecked(!checked);

    return (
        <Wrapper>
            <Tag size='s' checked={checked} onClick={handleClick}>
                Label
            </Tag>
        </Wrapper>
    );
};

export default TagExample;
