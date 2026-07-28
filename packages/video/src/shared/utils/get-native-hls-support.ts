const HLS_MIME_TYPES = ['application/vnd.apple.mpegURL', 'audio/mpegurl'];

declare const window: { chrome: boolean };

// Функция для проверки нативной поддержки HLS в браузере (Safari / iOS)
export const getNativeHlsSupport = () => {
    const video = document.createElement('video');

    return HLS_MIME_TYPES.some((type) => video.canPlayType(type)) && !window.chrome;
};
