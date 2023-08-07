import React, { forwardRef } from 'react';

import { BaseCodeInput } from './components/base-code-input';
import { BaseCodeInputProps, CustomInputRef } from './typings';

import styles from './mobile.module.css';

export type CodeInputMobileProps = Omit<BaseCodeInputProps, 'inputClassName'>;

export const CodeInputMobile = forwardRef<CustomInputRef, CodeInputMobileProps>(
    (restProps, ref) => <BaseCodeInput {...restProps} ref={ref} stylesInput={styles} />,
);
