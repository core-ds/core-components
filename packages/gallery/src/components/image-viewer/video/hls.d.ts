declare module 'hls.js/dist/hls.light.mjs' {
    import Hls, { type ErrorData, type Events } from 'hls.js';

    export default Hls;
    export type { ErrorData, Events };
}
