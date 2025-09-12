import React, { forwardRef } from 'react';

import { BaseCodeInput } from '../components/base-code-input';
import { type BaseCodeInputProps, type CustomInputRef } from '../typings';

import styles from './desktop.module.css';

export type CodeInputDesktopProps = Omit<BaseCodeInputProps, 'stylesInput'>;

export const CodeInputDesktop = forwardRef<CustomInputRef, CodeInputDesktopProps>(
    (restProps, ref) => <BaseCodeInput {...restProps} ref={ref} stylesInput={styles} />,
);
