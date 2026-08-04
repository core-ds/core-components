import React, { type FC, type MouseEvent } from 'react';
import cn from 'classnames';

import { BaseModal } from '@alfalab/core-components-base-modal';

import { GalleryContext, type GalleryContext as GalleryContextValue } from '../../context';
import { type GalleryImage } from '../../types';
import { BottomButton } from '../bottom-button/Component';
import { Header } from '../header/Component';
import { HeaderMobile } from '../header-mobile/Component';
import { ImageViewer } from '../image-viewer/component';
import { Single } from '../image-viewer/single';
import { InfoBar } from '../info-bar/Component';
import { NavigationBar } from '../navigation-bar/Component';
import { Subtitles } from '../subtitles';

import styles from '../../index.module.css';

type GalleryViewProps = {
    bottomButton?: GalleryImage['bottomButton'];
    galleryContext: GalleryContextValue;
    handleBottomButtonClick: (event: MouseEvent) => void;
    handleEscapeKeyDown: () => void;
    hasPagination: boolean;
    hideNavigation: boolean;
    isCurrentVideo: boolean;
    isDesktop: boolean;
    onUnmount: () => void;
    open: boolean;
    popupClassName?: string;
    showNavigationBar: boolean;
    singleSlide: boolean;
};

const Backdrop = () => null;

export const GalleryView: FC<GalleryViewProps> = ({
    bottomButton,
    galleryContext,
    handleBottomButtonClick,
    handleEscapeKeyDown,
    hasPagination,
    hideNavigation,
    isCurrentVideo,
    isDesktop,
    onUnmount,
    open,
    popupClassName,
    showNavigationBar,
    singleSlide,
}) => (
    <GalleryContext.Provider value={galleryContext}>
        <BaseModal
            open={open}
            className={cn(styles.modal, popupClassName)}
            onEscapeKeyDown={handleEscapeKeyDown}
            Backdrop={Backdrop}
            onUnmount={onUnmount}
        >
            <div
                className={cn(styles.container, {
                    [styles.mobile]: !isDesktop,
                })}
            >
                {isDesktop ? <Header /> : <HeaderMobile />}
                {singleSlide && !hasPagination ? <Single /> : <ImageViewer />}
                <nav
                    className={cn({
                        [styles.navigationVideo]: isCurrentVideo && !isDesktop,
                        [styles.hide]: showNavigationBar && hideNavigation && !isDesktop,
                        [styles.hideInfo]: !showNavigationBar && hideNavigation && !isDesktop,
                    })}
                >
                    {!isDesktop && <Subtitles />}
                    {isCurrentVideo && !isDesktop && bottomButton && (
                        <BottomButton
                            bottomButton={bottomButton}
                            onClick={handleBottomButtonClick}
                            className={styles.bottomButton}
                        />
                    )}

                    {showNavigationBar && !galleryContext.paginationError && <NavigationBar />}
                    {!isDesktop && <InfoBar />}
                </nav>
            </div>
        </BaseModal>
    </GalleryContext.Provider>
);
