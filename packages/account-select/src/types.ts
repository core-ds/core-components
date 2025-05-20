import { FormControlProps } from '@alfalab/core-components-form-control';
import { SelectProps } from '@alfalab/core-components-select';

export type AccountSelectProps = Omit<SelectProps, 'label' | 'error' | 'hint' | 'block' | 'size'> &
    Pick<FormControlProps, 'label' | 'error' | 'hint' | 'block' | 'size'>;
