import { type BaseInputProps } from '../components/base-input/types/base-input-props';

type ResolveClearVisibleParams = Pick<BaseInputProps, 'clear' | 'disabled' | 'readOnly'> & {
    filled: boolean;
    focused?: boolean;
    hovered: boolean;
};

export const resolveClearVisible = ({
    clear,
    filled,
    disabled,
    readOnly,
    focused,
    hovered,
}: ResolveClearVisibleParams): boolean => {
    if (Boolean(clear) && filled && !disabled && !readOnly) {
        if ([true, 'always'].includes(clear ?? false)) {
            return true;
        }

        if (clear === 'auto' && (focused || hovered)) {
            return true;
        }

        return false;
    }

    return false;
};
