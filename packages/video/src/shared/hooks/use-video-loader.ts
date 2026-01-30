import { useEffect, useRef, useState } from 'react';
import type Hls from 'hls.js';

import { type ErrorData, Events, type HLS } from '../../hls-types';
import { loadVideo } from '../utils/load-video';

type Props = {
    src: string;
    onFatalError: () => void;
};

export const useVideoLoader = ({ src, onFatalError }: Props) => {
    const playerRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<HLS>();
    const [isReady, setIsReady] = useState(false);
    const [hasAudio, setHasAudio] = useState(false);
    const [error, setError] = useState<ErrorData>();
    const [isLoading, setIsLoading] = useState(true);
    const [levels, setLevels] = useState<Hls['levels']>([]);

    useEffect(() => {
        const videoEl = playerRef.current;

        if (!videoEl) {
            return undefined;
        }

        const handleWaiting = () => setIsLoading(true);
        const handleCanPlay = () => setIsLoading(false);

        videoEl.addEventListener('waiting', handleWaiting);
        videoEl.addEventListener('canplay', handleCanPlay);

        (async () => {
            hlsRef.current = await loadVideo({
                src,
                playerRef,
                onInit: (hlsInstance) => {
                    hlsInstance.on(Events.MANIFEST_PARSED, (_, data) => {
                        setHasAudio(data.levels.some((l) => l.audioCodec));
                        setIsReady(true);
                        setLevels(hlsInstance.levels);
                    });

                    /*
                     * ориентируясь на данные события получаем статус загрузки true
                     * даже когда видео уже загрузилось и начало воспроизводится
                     * (из-за загрузки последующих сегментов)
                     * hlsInstance.on(Events.FRAG_LOADING, () => setIsLoading(true));
                     * hlsInstance.on(Events.FRAG_LOADED, () => setIsLoading(false));
                     */

                    hlsInstance.on(Events.ERROR, (_, data) => {
                        if (data.fatal) {
                            setError(data);
                            setIsReady(true);
                            onFatalError?.();
                        }
                    });
                },
            });
        })();

        return () => {
            videoEl.removeEventListener('waiting', handleWaiting);
            videoEl.removeEventListener('canplay', handleCanPlay);

            setError(undefined);
            hlsRef.current?.destroy();
        };
    }, [onFatalError, src]);

    return {
        playerRef,
        levels,
        hlsRef,
        isReady,
        isLoading,
        hasAudio,
        error,
        setIsReady,
        setIsLoading,
    };
};
