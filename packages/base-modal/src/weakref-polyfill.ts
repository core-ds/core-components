/* eslint-disable */
// @ts-nocheck
// https://github.com/ungap/weakrefs
// https://github.com/jaenster/weakref-pollyfill

(function (global) {
    if (typeof global === 'object' && global && typeof global['WeakRef'] === 'undefined') {
        (function (WeakMap, defineProperties) {
            let wr = new WeakMap();
            function WeakRef(value) {
                wr.set(this, value);
            }
            defineProperties(WeakRef.prototype, {
                deref: {
                    value: function deref() {
                        return wr.get(this);
                    },
                },
            });

            let fg = new WeakMap();
            function FinalizationGroup(fn) {
                fg.set(this, []);
            }
            defineProperties(FinalizationGroup.prototype, {
                register: {
                    value: function register(value, name) {
                        let names = fg.get(this);
                        if (names.indexOf(name) < 0) names.push(name);
                    },
                },
                unregister: {
                    value: function unregister(value, name) {
                        let names = fg.get(this);
                        let i = names.indexOf(name);
                        if (-1 < i) names.splice(i, 1);
                        return -1 < i;
                    },
                },
                cleanupSome: {
                    value: function cleanupSome(fn) {
                        fn(fg.get(this));
                    },
                },
            });

            global.WeakRe = WeakRef;
            global.FinalizationGroup = FinalizationGroup;
        })(WeakMap, Object.defineProperties);
    }
})(
    (function () {
        switch (true) {
            case typeof globalThis === 'object' && !!globalThis:
                return globalThis;
            case typeof window === 'object' && !!window:
                return window;
            case typeof Function === 'function':
                return Function('return this')();
        }
        return null;
    })(),
);
