import { FC } from 'react';

import { Image } from './image';
import { Stack } from './stack';
import { ImageProps, StackProps } from './typings';

export const BankСardView: {
    Image: FC<ImageProps>;
    Stack: FC<StackProps>;
} = {
    Image,
    Stack,
};
