import { type UrlTransform } from 'react-markdown/lib';

const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:', 'sms:'];

export const urlTransformer =
    (transformLinkUri: boolean): UrlTransform =>
    (url) => {
        const { protocol } = new URL(url);

        if (allowedProtocols.includes(protocol) || !transformLinkUri) {
            return url;
        }

        /**
         * Backward compatibility
         * До версии @9.0.0 некорректные ссылки трансформировались в такой формат
         */
        // eslint-disable-next-line no-script-url
        return 'javascript:void(0)';
    };
