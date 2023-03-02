declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}

export declare global {
    interface Window {
        sp: (...arg: unknown) => void;
    }
}
