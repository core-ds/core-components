import React, { Fragment } from 'react';
import cn from 'classnames';

import { BottomSheet } from '@alfalab/core-components-bottom-sheet';
import { ButtonMobile } from '@alfalab/core-components-button/mobile';

import { TooltipMobileProps } from './types';

import styles from './mobile.module.css';

export const TooltipMobile: React.FC<TooltipMobileProps> = ({
    onClose,
    actionButtonTitle = 'Понятно',
    content,
    targetRef,
    onOpen,
    targetClassName,
    children,
    getPortalContainer,
    ...restProps
}) => (
    <Fragment>
        <BottomSheet
            {...restProps}
            container={getPortalContainer}
            onClose={onClose}
            actionButton={
                <ButtonMobile view='secondary' block={true} size='s' onClick={onClose}>
                    {actionButtonTitle}
                </ButtonMobile>
            }
        >
            {content}
        </BottomSheet>

        {/** TODO: проверить тултип на доступность */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
            ref={targetRef as React.Ref<HTMLDivElement>}
            onClick={onOpen}
            className={cn(styles.target, targetClassName)}
        >
            {children?.props.disabled && <div className={styles.overlap} />}
            {children}
        </div>
    </Fragment>
);
