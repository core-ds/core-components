import { type BaseInputProps } from '@alfalab/core-components-input/components/base-input';

export const size: NonNullable<BaseInputProps['size']> = 48;
export const colors: NonNullable<BaseInputProps['colors']> = 'default';
export const fontWeight = (bold?: boolean) => (bold ? 'bold' : 'regular');
