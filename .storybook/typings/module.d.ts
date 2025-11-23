declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}

interface Window {
    sp: (...arg: unknown) => void;
}
