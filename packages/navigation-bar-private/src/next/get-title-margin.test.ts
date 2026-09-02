import { getUniversalModalTitleMargin, type TitleMarginParams } from './get-title-margin';

const ADDON_WIDTH = 48;

type Margin = { left: number | undefined; right: number | undefined };

type Case = {
    name: string;
    mainAlign: TitleMarginParams['mainAlign'];
    hasBackButton?: boolean;
    hasCloser?: boolean;
    leftAddons?: boolean;
    rightAddons?: boolean;
    contentMargin: { left: number; right: number };
    mainLineMargin: Margin;
};

const runCase = ({ mainAlign, hasBackButton, hasCloser, leftAddons, rightAddons }: Case) =>
    getUniversalModalTitleMargin({
        mainAlign,
        hasBackButton: Boolean(hasBackButton),
        hasCloser: Boolean(hasCloser),
        hasLeftAddons: Boolean(leftAddons),
        hasRightAddons: Boolean(rightAddons),
        leftAddonsWidth: (hasBackButton ? ADDON_WIDTH : 0) + (leftAddons ? ADDON_WIDTH : 0),
        rightAddonsWidth: (hasCloser ? ADDON_WIDTH : 0) + (rightAddons ? ADDON_WIDTH : 0),
    });

const absoluteCases: Case[] = [
    {
        name: '#1 back + closer + leftAddons + rightAddons',
        mainAlign: 'absolute',
        hasBackButton: true,
        hasCloser: true,
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#2 back + closer + leftAddons',
        mainAlign: 'absolute',
        hasBackButton: true,
        hasCloser: true,
        leftAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#3 back + closer + rightAddons',
        mainAlign: 'absolute',
        hasBackButton: true,
        hasCloser: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#4 back + closer',
        mainAlign: 'absolute',
        hasBackButton: true,
        hasCloser: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#5 back + leftAddons + rightAddons',
        mainAlign: 'absolute',
        hasBackButton: true,
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: 48 },
    },
    {
        name: '#6 back + leftAddons',
        mainAlign: 'absolute',
        hasBackButton: true,
        leftAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: 48 },
    },
    {
        name: '#7 back + rightAddons',
        mainAlign: 'absolute',
        hasBackButton: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: 48 },
    },
    {
        name: '#8 back',
        mainAlign: 'absolute',
        hasBackButton: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: 48 },
    },
    {
        name: '#9 closer + leftAddons + rightAddons',
        mainAlign: 'absolute',
        hasCloser: true,
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: 48, right: undefined },
    },
    {
        name: '#10 closer + leftAddons',
        mainAlign: 'absolute',
        hasCloser: true,
        leftAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: 48, right: undefined },
    },
    {
        name: '#11 closer + rightAddons',
        mainAlign: 'absolute',
        hasCloser: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: 48, right: undefined },
    },
    {
        name: '#12 closer',
        mainAlign: 'absolute',
        hasCloser: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: 48, right: undefined },
    },
    {
        name: '#13 leftAddons + rightAddons',
        mainAlign: 'absolute',
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#14 leftAddons',
        mainAlign: 'absolute',
        leftAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#15 rightAddons',
        mainAlign: 'absolute',
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#16 (ничего нет)',
        mainAlign: 'absolute',
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
];

const relativeCases: Case[] = [
    {
        name: '#1 back + closer + leftAddons + rightAddons',
        mainAlign: 'relative',
        hasBackButton: true,
        hasCloser: true,
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#2 back + closer + leftAddons',
        mainAlign: 'relative',
        hasBackButton: true,
        hasCloser: true,
        leftAddons: true,
        contentMargin: { left: 0, right: 48 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#3 back + closer + rightAddons',
        mainAlign: 'relative',
        hasBackButton: true,
        hasCloser: true,
        rightAddons: true,
        contentMargin: { left: 48, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#4 back + closer',
        mainAlign: 'relative',
        hasBackButton: true,
        hasCloser: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#5 back + leftAddons + rightAddons — аддоны уравновешивают друг друга, сдвигается только вся строка (заголовок не сдвигается)',
        mainAlign: 'relative',
        hasBackButton: true,
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: 48 },
    },
    {
        name: '#6 back + leftAddons',
        mainAlign: 'relative',
        hasBackButton: true,
        leftAddons: true,
        contentMargin: { left: 0, right: 96 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#7 back + rightAddons — сдвигаются одновременно и заголовок, и вся строка',
        mainAlign: 'relative',
        hasBackButton: true,
        rightAddons: true,
        contentMargin: { left: 48, right: 0 },
        mainLineMargin: { left: undefined, right: 48 },
    },
    {
        name: '#8 back',
        mainAlign: 'relative',
        hasBackButton: true,
        contentMargin: { left: 0, right: 48 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#9 closer + leftAddons + rightAddons — аддоны уравновешивают друг друга, сдвигается только вся строка (заголовок не сдвигается)',
        mainAlign: 'relative',
        hasCloser: true,
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: 48, right: undefined },
    },
    {
        name: '#10 closer + leftAddons — сдвигаются одновременно и заголовок, и вся строка',
        mainAlign: 'relative',
        hasCloser: true,
        leftAddons: true,
        contentMargin: { left: 0, right: 48 },
        mainLineMargin: { left: 48, right: undefined },
    },
    {
        name: '#11 closer + rightAddons',
        mainAlign: 'relative',
        hasCloser: true,
        rightAddons: true,
        contentMargin: { left: 96, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#12 closer',
        mainAlign: 'relative',
        hasCloser: true,
        contentMargin: { left: 48, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#13 leftAddons + rightAddons',
        mainAlign: 'relative',
        leftAddons: true,
        rightAddons: true,
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#14 leftAddons',
        mainAlign: 'relative',
        leftAddons: true,
        contentMargin: { left: 0, right: 48 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#15 rightAddons',
        mainAlign: 'relative',
        rightAddons: true,
        contentMargin: { left: 48, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
    {
        name: '#16 (ничего нет)',
        mainAlign: 'relative',
        contentMargin: { left: 0, right: 0 },
        mainLineMargin: { left: undefined, right: undefined },
    },
];

describe('getUniversalModalTitleMargin', () => {
    describe.each([
        ['absolute', absoluteCases],
        ['relative', relativeCases],
    ] as const)("mainAlign='%s'", (_mainAlign, cases) => {
        it.each(cases.map((c): [string, Case] => [c.name, c]))('%s', (_name, testCase) => {
            const result = runCase(testCase);

            expect(result.contentMargin).toEqual(testCase.contentMargin);
            expect(result.mainLineMargin?.left).toBe(testCase.mainLineMargin.left);
            expect(result.mainLineMargin?.right).toBe(testCase.mainLineMargin.right);
        });
    });

    describe("mainAlign='left' — заглушка, никаких вычислений не производится", () => {
        const leftCases: [string, Partial<TitleMarginParams>][] = [
            ['ничего нет', {}],
            [
                'back + closer + leftAddons + rightAddons',
                {
                    hasBackButton: true,
                    hasCloser: true,
                    hasLeftAddons: true,
                    hasRightAddons: true,
                },
            ],
            ['только back', { hasBackButton: true }],
            ['только closer', { hasCloser: true }],
        ];

        it.each(leftCases)('%s — contentMargin: 0/0, mainLineMargin: {}', (_name, partial) => {
            const result = getUniversalModalTitleMargin({
                mainAlign: 'left',
                hasBackButton: false,
                hasCloser: false,
                hasLeftAddons: false,
                hasRightAddons: false,
                leftAddonsWidth: 0,
                rightAddonsWidth: 0,
                ...partial,
            });

            expect(result.contentMargin).toEqual({ left: 0, right: 0 });
            expect(result.mainLineMargin).toEqual({});
        });

        it('ширина аддонов (leftAddonsWidth/rightAddonsWidth) не влияет на результат', () => {
            const result = getUniversalModalTitleMargin({
                mainAlign: 'left',
                hasBackButton: true,
                hasCloser: true,
                hasLeftAddons: true,
                hasRightAddons: true,
                leftAddonsWidth: 999,
                rightAddonsWidth: 12345,
            });

            expect(result.contentMargin).toEqual({ left: 0, right: 0 });
            expect(result.mainLineMargin).toEqual({});
        });
    });

    describe('аддон из двух элементов по 48px (суммарно 96px)', () => {
        it('mainAlign=relative, только rightAddons (96px), без back и closer — заголовок сдвигается на всю ширину аддона', () => {
            const result = getUniversalModalTitleMargin({
                mainAlign: 'relative',
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

        it('mainAlign=relative, back + rightAddons (96px) — сдвигаются одновременно и заголовок, и вся строка', () => {
            const result = getUniversalModalTitleMargin({
                mainAlign: 'relative',
                hasBackButton: true,
                hasCloser: false,
                hasLeftAddons: false,
                hasRightAddons: true,
                leftAddonsWidth: ADDON_WIDTH,
                rightAddonsWidth: ADDON_WIDTH * 2,
            });

            expect(result.contentMargin).toEqual({ left: 96, right: 0 });
            expect(result.mainLineMargin?.left).toBeUndefined();
            expect(result.mainLineMargin?.right).toBe(48);
        });

        it('mainAlign=relative, closer + leftAddons (96px) — сдвигаются одновременно и заголовок, и вся строка', () => {
            const result = getUniversalModalTitleMargin({
                mainAlign: 'relative',
                hasBackButton: false,
                hasCloser: true,
                hasLeftAddons: true,
                hasRightAddons: false,
                leftAddonsWidth: ADDON_WIDTH * 2,
                rightAddonsWidth: ADDON_WIDTH,
            });

            expect(result.contentMargin).toEqual({ left: 0, right: 96 });
            expect(result.mainLineMargin?.left).toBe(48);
            expect(result.mainLineMargin?.right).toBeUndefined();
        });
    });

    describe('аддон из двух элементов разной ширины (48 + 40 = 88px)', () => {
        /*
         * .addon имеет min-width: 48px, поэтому реальная ширина аддон-блока
         * никогда не бывает меньше 48px — 88 = 48 + 40 (два разных по
         * ширине элемента внутри одного leftAddons/rightAddons).
         */
        const UNEVEN_ADDON_WIDTH = 88;

        it('mainAlign=relative, closer + leftAddons (88px) — заголовок сдвигается ровно на реальную ширину аддона', () => {
            const result = getUniversalModalTitleMargin({
                mainAlign: 'relative',
                hasBackButton: false,
                hasCloser: true,
                hasLeftAddons: true,
                hasRightAddons: false,
                leftAddonsWidth: UNEVEN_ADDON_WIDTH,
                rightAddonsWidth: ADDON_WIDTH,
            });

            expect(result.contentMargin).toEqual({ left: 0, right: UNEVEN_ADDON_WIDTH });
            expect(result.mainLineMargin?.left).toBe(48);
            expect(result.mainLineMargin?.right).toBeUndefined();
        });

        it('mainAlign=relative, back + rightAddons (88px) — заголовок сдвигается ровно на реальную ширину аддона', () => {
            const result = getUniversalModalTitleMargin({
                mainAlign: 'relative',
                hasBackButton: true,
                hasCloser: false,
                hasLeftAddons: false,
                hasRightAddons: true,
                leftAddonsWidth: ADDON_WIDTH,
                rightAddonsWidth: UNEVEN_ADDON_WIDTH,
            });

            expect(result.contentMargin).toEqual({ left: UNEVEN_ADDON_WIDTH, right: 0 });
            expect(result.mainLineMargin?.left).toBeUndefined();
            expect(result.mainLineMargin?.right).toBe(48);
        });
    });
});
