import { type TagProps } from '@alfalab/core-components-tag';

import { type TabsProps } from './typings';

export function tabSizeToTagSize(size: TabsProps['size']): TagProps['size'] {
    return size && ({ xxs: 32, xs: 40, s: 48, m: 56, l: 64, xl: 72 } as const)[size];
}
