import React, { FC, KeyboardEvent, useCallback, useState } from 'react';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

import { DefaultControlIcon } from './components';
import { useRecalculateContentHeight } from './hooks';
import { AccordionProps } from './typings';

import styles from './index.module.css';

export const Accordion: FC<AccordionProps> = ({
    expanded,
    defaultExpanded = false,
    header,
    control,
    controlPosition = 'end',
    children,
    className,
    headerClassName,
    controlClassName,
    bodyClassName,
    onExpandedChange,
    dataTestId,
}) => {
    const uncontrolled = expanded === undefined;
    const [expandedState, setExpanded] = useState(uncontrolled ? defaultExpanded : expanded);
    const isExpanded = uncontrolled ? expandedState : expanded;

    const isStartPosition = controlPosition === 'start';

    const { contentRef, contentCaseRef } = useRecalculateContentHeight(isExpanded);

    const controlContent =
        control === undefined ? (
            <DefaultControlIcon expanded={isExpanded} isStartPosition={isStartPosition} />
        ) : (
            control
        );

    const headerContent =
        typeof header === 'string' ? (
            <Typography.Text view='primary-large' weight='medium'>
                {header}
            </Typography.Text>
        ) : (
            header
        );

    const bodyContent =
        typeof children === 'string' ? (
            <Typography.Text view='primary-medium'>{children}</Typography.Text>
        ) : (
            children
        );

    const handleExpandedChange = useCallback(() => {
        if (uncontrolled) {
            setExpanded(!isExpanded);
        }

        onExpandedChange?.(!isExpanded);
    }, [isExpanded, onExpandedChange, uncontrolled]);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleExpandedChange();
        }
    };

    return (
        <div data-test-id={dataTestId} className={cn(styles.accordion, className)}>
            <div
                role='button'
                tabIndex={0}
                onClick={handleExpandedChange}
                onKeyDown={handleKeyDown}
                className={cn(styles.container)}
            >
                <div
                    className={cn(styles.header, headerClassName, {
                        [styles.endPosition]: isStartPosition,
                    })}
                >
                    {headerContent}
                </div>

                <div
                    className={cn(styles.control, controlClassName, {
                        [styles.startPosition]: isStartPosition,
                    })}
                >
                    {controlContent}
                </div>
            </div>

            <div
                ref={contentRef}
                className={cn(styles.body, bodyClassName, { [styles.expandedContent]: isExpanded })}
            >
                <div ref={contentCaseRef}>{bodyContent}</div>
            </div>
        </div>
    );
};
