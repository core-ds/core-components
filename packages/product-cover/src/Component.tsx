import React, { FC } from 'react';

import { Single as BaseSingle } from './single';
import { Stack } from './stack';
import { SingleProps, StackProps } from './typings';

export const Single: FC<SingleProps> = (props) => <BaseSingle {...props} />;

export const ProductCover: {
    Single: FC<SingleProps>;
    Stack: FC<StackProps>;
} = {
    Single,
    Stack,
};
