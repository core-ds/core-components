import React, { type FC, type MouseEvent, type UIEvent } from 'react';
import cn from 'classnames';

import {
    type Button,
    type ButtonDesktop,
    type ButtonMobile,
} from '@alfalab/core-components-button';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export interface ClearButtonProps {
    disabled?: boolean;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    colors: 'default' | 'inverted';
    dataTestId?: string;
}

type ClearButtonPrivateProps = {
    Button: typeof ButtonDesktop | typeof ButtonMobile | typeof Button;
};

const preventDefault = (e: UIEvent<HTMLElement>) => e.preventDefault();

export const ClearButtonBase: FC<ClearButtonProps & ClearButtonPrivateProps> = ({
    colors,
    disabled,
    onClick,
    Button,
    dataTestId,
}) => (
    <Button
        type='button'
        view='text'
        disabled={disabled}
        aria-label='Очистить'
        className={styles.clearButton}
        onClick={onClick}
        tabIndex={-1}
        onMouseDown={preventDefault}
        dataTestId={dataTestId}
    >
        <CrossCircleMIcon className={cn(styles.clearIcon, colorStyles[colors].clearIcon)} />
    </Button>
);
