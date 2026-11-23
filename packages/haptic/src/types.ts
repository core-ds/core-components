import { type defaultPatterns } from 'web-haptics';

export interface HapticProps {
    disabled?: boolean;
    pattern?: keyof typeof defaultPatterns;
}
