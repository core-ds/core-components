import {
    MouseEventHandler,
    SyntheticEvent,
    useCallback,
    useContext,
    useEffect,
    useRef,
} from 'react';
import elementClosest from 'element-closest';

import { GalleryContext } from '../../context';

import styles from './index.module.css';

export const useHandleImageViewer = () => {
    const { view, onClose, setImageMeta } = useContext(GalleryContext);

    const leftArrowRef = useRef<HTMLDivElement>(null);
    const rightArrowRef = useRef<HTMLDivElement>(null);

    const isMobile = view === 'mobile';

    const handleLoad = (event: SyntheticEvent<HTMLImageElement>, index: number) => {
        const target = event.currentTarget;

        const { naturalWidth, naturalHeight } = target;

        setImageMeta({ width: naturalWidth, height: naturalHeight }, index);
    };

    const handleLoadError = (index: number) => {
        setImageMeta({ width: 0, height: 0, broken: true }, index);
    };

    const handleWrapperClick = useCallback<MouseEventHandler>(
        (event) => {
            const eventTarget = event.target as HTMLElement;

            const isArrow =
                leftArrowRef.current?.contains(eventTarget) ||
                rightArrowRef.current?.contains(eventTarget);

            const isPlaceholder = Boolean(eventTarget.closest(`.${styles.placeholder}`));

            const isContentArea = Boolean(eventTarget.closest('[data-content-area]'));

            // Закрываем галерею только при клике вне элементов контента и только на desktop
            if (!isPlaceholder && !isArrow && !isContentArea && !isMobile) {
                onClose();
            }
        },
        [isMobile, onClose],
    );

    useEffect(() => {
        elementClosest(window);
    }, []);

    return {
        handleLoad,
        handleLoadError,
        handleWrapperClick,
        isMobile,
        leftArrowRef,
        rightArrowRef,
    };
};
