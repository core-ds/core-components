import { type TitleMarginParams } from '@alfalab/core-components-navigation-bar-private';

import { getUniversalModalTitleMargin } from './get-title-margin';

const ADDON_WIDTH = 48;

type Margin = { left: number | undefined; right: number | undefined };

type Case = {
    name: string;
    align: TitleMarginParams['align'];
    hasBackButton?: boolean;
    hasCloser?: boolean;
    leftAddons?: boolean;
    rightAddons?: boolean;
    contentMargin: { left: number; right: number };
    mainLineMargin: Margin;
};

const runCase = ({ align, hasBackButton, hasCloser, leftAddons, rightAddons }: Case) =>
    getUniversalModalTitleMargin({
        align,
        hasBackButton: Boolean(hasBackButton),
        hasCloser: Boolean(hasCloser),
        hasLeftAddons: Boolean(leftAddons),
        hasRightAddons: Boolean(rightAddons),
        leftAddonsWidth: (hasBackButton ? ADDON_WIDTH : 0) + (leftAddons ? ADDON_WIDTH : 0),
        rightAddonsWidth: (hasCloser ? ADDON_WIDTH : 0) + (rightAddons ? ADDON_WIDTH : 0),
    });

const centerCases: Case[] = [
    {
        name: '#1 back + closer + leftAddons + rightAddons',
        align: 'center',
        hasBackButton: true,
        hasCloser: true,
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#2 back + closer + leftAddons',
        align: 'center',
        hasBackButton: true,
        hasCloser: true,
        leftAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#3 back + closer + rightAddons',
        align: 'center',
        hasBackButton: true,
        hasCloser: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#4 back + closer',
        align: 'center',
        hasBackButton: true,
        hasCloser: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#5 back + leftAddons + rightAddons',
        align: 'center',
        hasBackButton: true,
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: 48 },
    },
    {
        name: '#6 back + leftAddons',
        align: 'center',
        hasBackButton: true,
        leftAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: 48 },
    },
    {
        name: '#7 back + rightAddons',
        align: 'center',
        hasBackButton: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: 48 },
    },
    {
        name: '#8 back',
        align: 'center',
        hasBackButton: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: 48 },
    },
    {
        name: '#9 closer + leftAddons + rightAddons',
        align: 'center',
        hasCloser: true,
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: 48, right: undefined },
    },
    {
        name: '#10 closer + leftAddons',
        align: 'center',
        hasCloser: true,
        leftAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: 48, right: undefined },
    },
    {
        name: '#11 closer + rightAddons',
        align: 'center',
        hasCloser: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: 48, right: undefined },
    },
    {
        name: '#12 closer',
        align: 'center',
        hasCloser: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: 48, right: undefined },
    },
    {
        name: '#13 leftAddons + rightAddons',
        align: 'center',
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#14 leftAddons',
        align: 'center',
        leftAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#15 rightAddons',
        align: 'center',
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#16 (ничего нет)',
        align: 'center',
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
];

const leftCases: Case[] = [
    {
        name: '#1 back + closer + leftAddons + rightAddons',
        align: 'left',
        hasBackButton: true,
        hasCloser: true,
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#2 back + closer + leftAddons',
        align: 'left',
        hasBackButton: true,
        hasCloser: true,
        leftAddons: true,
        contentMargin: { left: 0, right: 48 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#3 back + closer + rightAddons',
        align: 'left',
        hasBackButton: true,
        hasCloser: true,
        rightAddons: true,
        contentMargin: { left: 48, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#4 back + closer',
        align: 'left',
        hasBackButton: true,
        hasCloser: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#5 back + leftAddons + rightAddons (статика вместо расчёта)',
        align: 'left',
        hasBackButton: true,
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: 48 },
    },
    {
        name: '#6 back + leftAddons',
        align: 'left',
        hasBackButton: true,
        leftAddons: true,
        contentMargin: { left: 0, right: 96 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#7 back + rightAddons (расчёт + статика одновременно)',
        align: 'left',
        hasBackButton: true,
        rightAddons: true,
        contentMargin: { left: 48, right: 0 },
        mainLineMargin: { left: undefined, right: 48 },
    },
    {
        name: '#8 back',
        align: 'left',
        hasBackButton: true,
        contentMargin: { left: 0, right: 48 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#9 closer + leftAddons + rightAddons (статика вместо расчёта)',
        align: 'left',
        hasCloser: true,
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: 48, right: undefined },
    },
    {
        name: '#10 closer + leftAddons (расчёт + статика одновременно)',
        align: 'left',
        hasCloser: true,
        leftAddons: true,
        contentMargin: { left: 0, right: 48 },
        mainLineMargin: { left: 48, right: undefined },
    },
    {
        name: '#11 closer + rightAddons',
        align: 'left',
        hasCloser: true,
        rightAddons: true,
        contentMargin: { left: 96, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#12 closer',
        align: 'left',
        hasCloser: true,
        contentMargin: { left: 48, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#13 leftAddons + rightAddons',
        align: 'left',
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#14 leftAddons',
        align: 'left',
        leftAddons: true,
        contentMargin: { left: 0, right: 48 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#15 rightAddons',
        align: 'left',
        rightAddons: true,
        contentMargin: { left: 48, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#16 (ничего нет)',
        align: 'left',
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
];

describe('getUniversalModalTitleMargin', () => {
    describe.each([
        ['center', centerCases],
        ['left', leftCases],
    ] as const)("align='%s'", (_align, cases) => {
        it.each(cases.map((c): [string, Case] => [c.name, c]))('%s', (_name, testCase) => {
            const result = runCase(testCase);

            expect(result.contentMargin).toEqual(testCase.contentMargin);
            expect(result.mainLineMargin?.left).toBe(testCase.mainLineMargin.left);
            expect(result.mainLineMargin?.right).toBe(testCase.mainLineMargin.right);
        });
    });

    describe('big (96px) addon', () => {
        it('align=left, только rightAddons "big" (двойной аддон, 96px) — content margin кратен 96', () => {
            const result = getUniversalModalTitleMargin({
                align: 'left',
                hasBackButton: false,
                hasCloser: false,
                hasLeftAddons: false,
                hasRightAddons: true,
                leftAddonsWidth: 0,
                rightAddonsWidth: ADDON_WIDTH * 2,
            });

            expect(result.contentMargin).toEqual({ left: 96, right: 0 });
            expect(result.mainLineMargin?.left).toBeUndefined();
            expect(result.mainLineMargin?.right).toBeUndefined();
        });

        it('align=left, back + rightAddons "big" — расчёт (коррекция B) + статика одновременно', () => {
            const result = getUniversalModalTitleMargin({
                align: 'left',
                hasBackButton: true,
                hasCloser: false,
                hasLeftAddons: false,
                hasRightAddons: true,
                leftAddonsWidth: ADDON_WIDTH,
                rightAddonsWidth: ADDON_WIDTH * 2,
            });

            expect(result.contentMargin).toEqual({ left: 144, right: 0 });
            expect(result.mainLineMargin?.left).toBeUndefined();
            expect(result.mainLineMargin?.right).toBe(48);
        });
    });
});
