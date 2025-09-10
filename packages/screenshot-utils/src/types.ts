import { type MatchImageSnapshotOptions } from 'jest-image-snapshot';
import { type BrowserContext, type Page } from 'playwright';

export type EvaluateFn = (page: Page) => void;

export type ScreenshotOpts = {
    /**
     * When true, takes a screenshot of the full scrollable page, instead of the currently visible viewport.
     * Defaults to `false`.
     */
    fullPage?: boolean;

    /**
     * Hides default white background and allows capturing screenshots with transparency.
     * Not applicable to `jpeg` images. Defaults to `false`.
     */
    omitBackground?: boolean;

    clip?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
};

export type MatchHtmlParams = {
    page: Page;
    context?: BrowserContext;
    css?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect: any;
    matchImageSnapshotOptions?: MatchImageSnapshotOptions;
    screenshotOpts?: ScreenshotOpts;
    evaluate?: EvaluateFn;
    viewport?: { width: number; height: number };
};

export type ScreenshotTestingParams = Omit<
    MatchHtmlParams,
    'page' | 'css' | 'expect' | 'context'
> & {
    cases: Array<[string, string]>;
    theme?: string;
};
