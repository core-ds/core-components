declare module 'hls.js/dist/hls.light.mjs' {
    import Hls, { ErrorData, Events } from 'hls';

    export default Hls;
    export { ErrorData, Events };
}
