import { defaultComputeTitleMargin } from './default-title-margin';

describe('defaultComputeTitleMargin', () => {
    describe("align='center'", () => {
        it('без разницы ширин — компенсации нет', () => {
            const result = defaultComputeTitleMargin({
                align: 'center',
                hasBackButton: true,
                hasCloser: true,
                hasLeftAddons: true,
                hasRightAddons: true,
                leftAddonsWidth: 48,
                rightAddonsWidth: 48,
            });

            expect(result.contentMargin).toEqual({ left: 0, right: 0 });
        });

        it('rightAddonsWidth больше leftAddonsWidth — компенсация слева', () => {
            const result = defaultComputeTitleMargin({
                align: 'center',
                hasBackButton: false,
                hasCloser: false,
                hasLeftAddons: false,
                hasRightAddons: true,
                leftAddonsWidth: 0,
                rightAddonsWidth: 48,
            });

            expect(result.contentMargin).toEqual({ left: 48, right: 0 });
        });

        it('leftAddonsWidth больше rightAddonsWidth — компенсация справа', () => {
            const result = defaultComputeTitleMargin({
                align: 'center',
                hasBackButton: false,
                hasCloser: false,
                hasLeftAddons: true,
                hasRightAddons: false,
                leftAddonsWidth: 96,
                rightAddonsWidth: 0,
            });

            expect(result.contentMargin).toEqual({ left: 0, right: 96 });
        });

        it('не зависит от hasBackButton/hasCloser — только от реальных ширин', () => {
            const withControls = defaultComputeTitleMargin({
                align: 'center',
                hasBackButton: true,
                hasCloser: false,
                hasLeftAddons: false,
                hasRightAddons: false,
                leftAddonsWidth: 48,
                rightAddonsWidth: 0,
            });

            const withoutControls = defaultComputeTitleMargin({
                align: 'center',
                hasBackButton: false,
                hasCloser: false,
                hasLeftAddons: false,
                hasRightAddons: false,
                leftAddonsWidth: 48,
                rightAddonsWidth: 0,
            });

            expect(withControls.contentMargin).toEqual({ left: 0, right: 48 });
            expect(withoutControls.contentMargin).toEqual({ left: 0, right: 48 });
        });

        it('не возвращает mainLineMargin', () => {
            const result = defaultComputeTitleMargin({
                align: 'center',
                hasBackButton: true,
                hasCloser: false,
                hasLeftAddons: false,
                hasRightAddons: false,
                leftAddonsWidth: 48,
                rightAddonsWidth: 0,
            });

            expect(result.mainLineMargin).toBeUndefined();
        });
    });

    describe("align='left'", () => {
        it('всегда {0, 0}, независимо от ширин/back/closer', () => {
            const result = defaultComputeTitleMargin({
                align: 'left',
                hasBackButton: true,
                hasCloser: true,
                hasLeftAddons: true,
                hasRightAddons: true,
                leftAddonsWidth: 200,
                rightAddonsWidth: 0,
            });

            expect(result.contentMargin).toEqual({ left: 0, right: 0 });
            expect(result.mainLineMargin).toBeUndefined();
        });
    });
});
