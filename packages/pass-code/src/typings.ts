import { type BasePassCodeProps } from './Component';

type PropsWithUnknownLen = {
    codeLength?: never;

    /**
     * Максимально возможная длина кода
     * @default 10
     */
    maxCodeLength?: number;
};

type PropsWithLen = {
    maxCodeLength?: never;

    /**
     * Длина кода
     */
    codeLength?: number;
};

export type PassCodeProps = BasePassCodeProps & (PropsWithLen | PropsWithUnknownLen);
