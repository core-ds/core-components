import { createContext, type Dispatch, type SetStateAction } from 'react';

import { type SeekIndicator } from './types';

type SetStateActionGeneric<T> = Dispatch<SetStateAction<T>>;

export type VideoContext = {
    isDesktop: boolean;
    duration: number;
    currentTime: number;
    isPaused: boolean;
    isMuted: boolean;
    volume: number;
    skipForwardStep?: number;
    skipBackwardStep?: number;
    playbackRate: number;
    isLoading: boolean;
    currentLevel: number | null;
    fullscreen: boolean;
    seekIndicator: SeekIndicator;
    seekTime: number;
    buffer: number;
    isAutoQuality: boolean;
    qualities: Array<{
        index: number;
        height: number;
    }>;
    skipForward: () => void;
    skipBackward: () => void;
    toggleFullscreen: () => void;
    exitFullscreen: () => void;
    enterFullscreen: () => void;
    setAutoQuality: () => void;
    toggleMute: () => void;
    setVolume: SetStateActionGeneric<number>;
    setIsMuted: SetStateActionGeneric<boolean>;
    setCurrentTime: SetStateActionGeneric<number>;
    setPlaybackRate: SetStateActionGeneric<number>;
    setSeekTime: SetStateActionGeneric<number>;
    togglePause: (force?: boolean) => void;
    handleSeek: (value: number) => void;
    setQuality: (levelIndex: number) => void;
    showSeekIndicator: (direction: 'forward' | 'backward', amount: number) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const VideoContext = createContext<VideoContext>({
    isDesktop: true,
    duration: 0,
    currentTime: 0,
    isPaused: true,
    isMuted: true,
    volume: 50,
    playbackRate: 1,
    skipForwardStep: 0,
    skipBackwardStep: 0,
    isLoading: true,
    fullscreen: false,
    currentLevel: -1,
    seekTime: 0,
    buffer: 0,
    isAutoQuality: true,
    seekIndicator: {
        direction: 'forward',
        amount: 0,
        visible: false,
    },
    qualities: [
        {
            index: 0,
            height: 0,
        },
    ],
    togglePause: () => {},
    showSeekIndicator: () => {},
    skipForward: () => {},
    skipBackward: () => {},
    toggleFullscreen: () => {},
    exitFullscreen: () => {},
    enterFullscreen: () => {},
    handleSeek: () => {},
    toggleMute: () => {},
    setVolume: () => {},
    setIsMuted: () => {},
    setCurrentTime: () => {},
    setPlaybackRate: () => {},
    setQuality: () => {},
    setAutoQuality: () => {},
    setSeekTime: () => {},
});
