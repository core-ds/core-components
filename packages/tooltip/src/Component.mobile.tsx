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
    targetTag: TargetTag = 'div',
    ...restProps
}) => (
    <Fragment>
        <BottomSheet
            actionButton={
                <ButtonMobile view='secondary' block={true} size='s' onClick={onClose}>
                    {actionButtonTitle}
                </ButtonMobile>
            }
            {...restProps}
            container={getPortalContainer}
            onClose={onClose}
        >
            {content}
        </BottomSheet>

        {/** TODO: проверить тултип на доступность */}
        <TargetTag
            ref={targetRef as React.Ref<HTMLDivElement>}
            onClick={onOpen}
            className={cn(styles.target, targetClassName)}
        >
            {children?.props.disabled && <div className={styles.overlap} />}
            {children}
        </TargetTag>
    </Fragment>
);
