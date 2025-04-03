import React, { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { Typography } from '@alfalab/core-components-typography';

import { GalleryContext } from '../../context';
import { type TBottomButton } from '../../types';

import styles from './index.module.css';

type Props = {
    onClick: (e: MouseEvent) => void;
    className?: string;
    bottomButton: TBottomButton;
};

export const BottomButton = ({ onClick, className, bottomButton }: Props) => {
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const [visible, setVisible] = useState<boolean>(false);
    const { currentSlideIndex, getSwiper } = useContext(GalleryContext);

    const swiper = getSwiper();

    useEffect(() => {
        if (currentSlideIndex === swiper?.activeIndex && bottomButton.timeout) {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            setVisible(false);
            timer.current = setTimeout(() => setVisible(true), bottomButton.timeout * 1000);
        }
    }, [bottomButton.timeout, currentSlideIndex, swiper?.activeIndex]);

    return (
        <Button
            size='m'
            className={cn(
                styles.component,
                { [styles.notVisible]: !visible && bottomButton.timeout },
                className,
            )}
            onClick={onClick}
            nowrap={true}
        >
            <Typography.Text color='static-primary-light'>{bottomButton.text}</Typography.Text>
        </Button>
    );
};
