import React, { type MouseEvent, useContext, useEffect, useRef, useState } from 'react';
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
    const { currentSlideIndex, getSwiper, singleSlide } = useContext(GalleryContext);

    useEffect(() => {
        const swiper = getSwiper();

        if ((currentSlideIndex === swiper?.activeIndex || singleSlide) && bottomButton.timeout) {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            setVisible(false);
            timer.current = setTimeout(() => setVisible(true), bottomButton.timeout * 1000);
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [bottomButton.timeout, currentSlideIndex, singleSlide]);

    return (
        <Button
            size={56}
            className={cn(
                styles.component,
                { [styles.notVisible]: !visible && bottomButton.timeout },
                className,
            )}
            onClick={onClick}
        >
            <Typography.Text color='static-primary-light'>{bottomButton.text}</Typography.Text>
        </Button>
    );
};
