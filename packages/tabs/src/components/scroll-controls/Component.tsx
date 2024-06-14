import React, { forwardRef, RefObject, useEffect, useState } from 'react';
import cn from 'classnames';
import _debounce from 'lodash.debounce';

import { IconButton } from '@alfalab/core-components-icon-button';
import { ChevronLeftCompactSIcon } from '@alfalab/icons-glyph/ChevronLeftCompactSIcon';
import { ChevronRightCompactSIcon } from '@alfalab/icons-glyph/ChevronRightCompactSIcon';

import { TabsProps } from '../../typings';

import { getDisabledState, scrollIntoFirstTab, scrollIntoLastTab } from './utils';

import styles from './index.module.css';

type ScrollControlsProps = {
    className?: string;
    view: Exclude<TabsProps['view'], undefined>;
    size: TabsProps['size'];
    containerRef: RefObject<HTMLDivElement>;
};

export const ScrollControls = forwardRef<HTMLDivElement, ScrollControlsProps>(
    ({ containerRef, view, size: sizeProp, className }, ref) => {
        const container = containerRef.current;
        const [disabledState, updateDisabledState] = useState(() => getDisabledState(container));

        useEffect(() => {
            const handleScroll = _debounce(
                () => updateDisabledState(getDisabledState(container)),
                100,
                { leading: true, maxWait: 100, trailing: true },
            );

            container?.addEventListener('scroll', handleScroll);

            return () => container?.removeEventListener('scroll', handleScroll);
        }, [container]);

        const getSize = () => {
            if (view === 'primary') {
                return sizeProp === 'xl' ? 'xs' : 'xxs';
            }

            return sizeProp && ['s', 'm', 'l', 'xl'].includes(sizeProp) ? 's' : 'xs';
        };

        const handleScrollLeft = () => scrollIntoFirstTab(container);

        const handleScrollRight = () => scrollIntoLastTab(container);

        const commonButtonProps = {
            className: styles.button,
            size: getSize(),
            view: 'secondary',
        } as const;

        return (
            <div
                ref={ref}
                className={cn(
                    styles.component,
                    styles[view],
                    sizeProp && styles[sizeProp],
                    className,
                    {
                        [styles.borderVisible]: !disabledState.toRight,
                    },
                )}
            >
                <IconButton
                    {...commonButtonProps}
                    icon={ChevronLeftCompactSIcon}
                    disabled={disabledState.toLeft}
                    onClick={handleScrollLeft}
                />
                <IconButton
                    {...commonButtonProps}
                    icon={ChevronRightCompactSIcon}
                    disabled={disabledState.toRight}
                    onClick={handleScrollRight}
                />
            </div>
        );
    },
);

ScrollControls.displayName = 'ScrollControls';
