import { type UrlTransform } from 'react-markdown/lib';

const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:', 'sms:'];

export const urlTransformer =
    (transformLinkUri: boolean): UrlTransform =>
    (url) => {
        if (!transformLinkUri) {
            return url;
        }

        /**
         * Backward compatibility
         * До версии @9.0.0 некорректные ссылки трансформировались в такой формат
         */
        // eslint-disable-next-line no-script-url
        const voidPath = 'javascript:void(0)';

        try {
            const { protocol } = new URL(url);

            return allowedProtocols.includes(protocol) ? url : voidPath;
        } catch {
            return voidPath;
        }
    };
