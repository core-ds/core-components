import React, { FC, MutableRefObject } from 'react';
import cn from 'classnames';

import { IconButton, IconButtonProps } from '@alfalab/core-components-icon-button';
import { useIsDesktop } from '@alfalab/core-components-mq';
import { TooltipDesktop } from '@alfalab/core-components-tooltip/desktop';
import { ArrowLeftMIcon } from '@alfalab/icons-glyph/ArrowLeftMIcon';
import { ArrowsInwardMIcon } from '@alfalab/icons-glyph/ArrowsInwardMIcon';
import { ArrowsOutwardMIcon } from '@alfalab/icons-glyph/ArrowsOutwardMIcon';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';
import { PauseCompactMIcon } from '@alfalab/icons-glyph/PauseCompactMIcon';
import { PlayCompactMIcon } from '@alfalab/icons-glyph/PlayCompactMIcon';
import { PointerDownMIcon } from '@alfalab/icons-glyph/PointerDownMIcon';
import { ShareMIcon } from '@alfalab/icons-glyph/ShareMIcon';
import { SoundCrossMIcon } from '@alfalab/icons-glyph/SoundCrossMIcon';
import { SoundMIcon } from '@alfalab/icons-glyph/SoundMIcon';

import { downloadFile, isVideo } from '../../utils';

import styles from './index.module.css';

type Props = Omit<IconButtonProps, 'icon' | 'colors'> & {
    buttonRef?: MutableRefObject<HTMLButtonElement | null>;
    download?: string | boolean;
};

export const Fullscreen: FC<Props> = ({ buttonRef, ...restProps }) => {
    const isDesktop = useIsDesktop();

    const iconButton = (
        <IconButton
            {...restProps}
            ref={buttonRef}
            icon={ArrowsOutwardMIcon}
            aria-label='Открыть в полноэкранном режиме'
            className={styles.iconButton}
        />
    );

    return isDesktop ? (
        <TooltipDesktop
            view='hint'
            colors='inverted'
            trigger='hover'
            position='bottom'
            content='Открыть в полноэкранном режиме'
            fallbackPlacements={['bottom-end']}
        >
            {iconButton}
        </TooltipDesktop>
    ) : (
        iconButton
    );
};

export const BackArrow: FC<Props> = ({ buttonRef, ...restProps }) => (
    <IconButton
        {...restProps}
        ref={buttonRef}
        icon={ArrowLeftMIcon}
        aria-label='Вернуться назад'
        className={styles.iconButton}
    />
);

export const Play: FC<Props> = ({ buttonRef, className, ...restProps }) => (
    <IconButton
        {...restProps}
        ref={buttonRef}
        icon={PlayCompactMIcon}
        aria-label='Проиграть видео'
        className={cn(styles.iconButton, className)}
    />
);

export const Pause: FC<Props> = ({ buttonRef, className, ...restProps }) => (
    <IconButton
        {...restProps}
        ref={buttonRef}
        icon={PauseCompactMIcon}
        aria-label='Поставить паузу на видео'
        className={cn(styles.iconButton, className)}
    />
);

export const ExitFullscreen: FC<Props> = ({ buttonRef, ...restProps }) => {
    const isDesktop = useIsDesktop();

    const iconButton = (
        <IconButton
            {...restProps}
            ref={buttonRef}
            icon={ArrowsInwardMIcon}
            aria-label='Выйти из полноэкранного режима'
            className={styles.iconButton}
        />
    );

    return isDesktop ? (
        <TooltipDesktop
            view='hint'
            colors='inverted'
            trigger='hover'
            position='bottom'
            content='Выйти из полноэкранного режима'
            fallbackPlacements={['bottom-end']}
        >
            {iconButton}
        </TooltipDesktop>
    ) : (
        iconButton
    );
};

export const MuteVideo: FC<Props> = ({ buttonRef, className, ...restProps }) => {
    const isDesktop = useIsDesktop();

    const iconButton = (
        <IconButton
            {...restProps}
            ref={buttonRef}
            icon={SoundMIcon}
            aria-label='Выключить звук'
            className={styles.iconButton}
        />
    );

    return isDesktop ? (
        <TooltipDesktop
            view='hint'
            colors='inverted'
            trigger='hover'
            position='bottom'
            content='Выключить звук'
            fallbackPlacements={['bottom-end']}
            targetClassName={className}
        >
            {iconButton}
        </TooltipDesktop>
    ) : (
        iconButton
    );
};

export const UnmuteVideo: FC<Props> = ({ buttonRef, className, ...restProps }) => {
    const isDesktop = useIsDesktop();

    const iconButton = (
        <IconButton
            {...restProps}
            ref={buttonRef}
            icon={SoundCrossMIcon}
            aria-label='Включить звук'
            className={styles.iconButton}
        />
    );

    return isDesktop ? (
        <TooltipDesktop
            view='hint'
            colors='inverted'
            trigger='hover'
            position='bottom'
            content='Включить звук'
            fallbackPlacements={['bottom-end']}
            targetClassName={className}
        >
            {iconButton}
        </TooltipDesktop>
    ) : (
        iconButton
    );
};

export const Download: FC<Props & { href?: string }> = ({ href, ...props }) => {
    const isDesktop = useIsDesktop();

    const handleMobileVideoDownload = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!href) return;

        const fileName = props.download?.toString() || 'video';
        const fileType = isVideo(href) ? 'video/*' : undefined;

        await downloadFile({
            url: href,
            fileName,
            fileType,
        });
    };

    const iconButtonProps = {
        ...props,
        icon: PointerDownMIcon,
        'aria-label': 'Скачать' as const,
        className: styles.iconButton,
    };

    const iconButton =
        !isDesktop && isVideo(href) ? (
            <IconButton {...iconButtonProps} onClick={handleMobileVideoDownload} />
        ) : (
            <IconButton {...iconButtonProps} href={href} />
        );

    return isDesktop ? (
        <TooltipDesktop
            view='hint'
            colors='inverted'
            trigger='hover'
            position='bottom'
            content='Скачать'
            fallbackPlacements={['bottom-end']}
        >
            {iconButton}
        </TooltipDesktop>
    ) : (
        iconButton
    );
};

export const Share: FC<Props> = (props) => {
    const isDesktop = useIsDesktop();

    const iconButton = (
        <IconButton
            {...props}
            icon={ShareMIcon}
            aria-label='Поделиться'
            className={styles.iconButton}
        />
    );

    return isDesktop ? (
        <TooltipDesktop
            view='hint'
            colors='inverted'
            trigger='hover'
            position='bottom'
            content='Поделиться'
            fallbackPlacements={['bottom-end']}
        >
            {iconButton}
        </TooltipDesktop>
    ) : (
        iconButton
    );
};

export const Exit: FC<Props> = (props) => (
    <IconButton {...props} icon={CrossMIcon} aria-label='Закрыть' className={styles.iconButton} />
);
