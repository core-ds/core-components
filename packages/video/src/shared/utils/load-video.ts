import { type RefObject } from 'react';
import type HLS from 'hls.js';

import { getNativeHlsSupport } from './get-native-hls-support';

type Props = {
    src: string;
    playerRef: RefObject<HTMLVideoElement>;
    hlsRef?: RefObject<HLS>;
    onInit?: (hls: HLS) => void;
};

export const loadVideo = ({ src, hlsRef, playerRef, onInit }: Props) => {
    const nativeAttach = () => {
        if (!playerRef?.current) {
            return;
        }

        // eslint-disable-next-line no-param-reassign
        playerRef.current.src = src;
        playerRef.current.load();
    };

    const attach = async () => {
        if (!playerRef?.current) {
            return undefined;
        }

        const { default: Hls }: { default: typeof HLS } = await import(
            /* webpackChunkName: "VideoBackgroundHLS" */
            'hls.js'
        );

        /*
         * Проверка поддержи браузером Media Source Extensions API. Необходимо для
         * динамического воспроизведения потокового видео (старые IE или какие-то мобильные браузеры)
         */
        if (!Hls.isSupported()) {
            console.error('HLS is unsupported for this browser');

            return undefined;
        }

        const hls: HLS = hlsRef?.current ?? new Hls();

        onInit?.(hls);

        hls.loadSource(src);
        hls.attachMedia(playerRef.current);

        return hls;
    };

    if (getNativeHlsSupport()) {
        nativeAttach();

        return undefined;
    }

    return attach();
};
