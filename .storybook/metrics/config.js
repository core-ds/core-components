import { decodeBase64 } from '../../tools/decode-base-64';

const domain = decodeBase64('bWV0cmljcy5hbGZhYmFuay5ydQ==');

export const setMetricConfig = () => {
    (function (p, l, o, w, i, n, g) {
        if (!p[i]) {
            p.GlobalSnowplowNamespace = p.GlobalSnowplowNamespace || [];
            p.GlobalSnowplowNamespace.push(i);
            p[i] = function () {
                (p[i].q = p[i].q || []).push(arguments);
            };
            p[i].q = p[i].q || [];
            n = l.createElement(o);
            g = l.getElementsByTagName(o)[0];
            n.async = 1;
            n.src = w;
            g.parentNode.insertBefore(n, g);
        }
    })(window, document, 'script', `https://${domain}/metrica/sp.js`, 'sp');

    function getMetricUrl() {
        const { hostname } = window.location;

        switch (hostname) {
            case 'core-ds.github.io': {
                return `${domain}/metrica/intra`;
            }
            default: {
                return '';
            }
        }
    }

    const metricUrl = getMetricUrl();

    if (metricUrl) {
        sp('newTracker', 'ab', `${metricUrl}`, {
            appId: `ds_core_components`,
            platform: 'web',
            discoverRootDomain: true,
            forceSecureTracker: true,
        });
    }

    sp('enableActivityTracking', 30, 10);
    sp('trackPageView');
};
