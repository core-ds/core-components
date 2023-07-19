import React, { forwardRef } from 'react';

import { BaseCodeInput } from './components/base-code-input';
import { BaseCodeInputProps, CustomInputRef } from './typings';

import styles from './desktop.module.css';

export type CodeInputDesktopProps = Omit<BaseCodeInputProps, 'inputClassName'>;

export const CodeInputDesktop = forwardRef<CustomInputRef, CodeInputDesktopProps>(
    (restProps, ref) => <BaseCodeInput {...restProps} ref={ref} stylesInput={styles} />,
);
