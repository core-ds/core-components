import { measureText, mergeRects } from './particle-utils';

describe('Геометрия Spoiler', () => {
    afterEach(() => jest.restoreAllMocks());

    it('объединяет фрагменты строки и сохраняет промежуток между строками', () => {
        expect(
            mergeRects([
                { x: 20, y: 0, width: 30, height: 18 },
                { x: 0, y: 24, width: 60, height: 18 },
                { x: 0, y: 0, width: 20, height: 18 },
                { x: 0, y: 0, width: 0, height: 0 },
            ]),
        ).toEqual([
            { x: 0, y: 0, width: 50, height: 18 },
            { x: 0, y: 24, width: 60, height: 18 },
        ]);
    });

    it('считает координаты строк относительно якоря, включая строку левее первого фрагмента', () => {
        const content = document.createElement('span');
        const strong = document.createElement('strong');
        const anchor = document.createElement('span');
        strong.textContent = 'Важный текст';
        content.append(strong, document.createTextNode(' с переносом'));
        jest.spyOn(anchor, 'getBoundingClientRect').mockReturnValue({
            left: 100,
            top: 20,
        } as DOMRect);
        const range = {
            selectNodeContents: jest.fn(),
            getClientRects: jest
                .fn()
                .mockReturnValueOnce([{ left: 100, top: 20, width: 80, height: 18 }])
                .mockReturnValueOnce([{ left: 20, top: 44, width: 160, height: 18 }]),
        };
        jest.spyOn(document, 'createRange').mockReturnValue(range as unknown as Range);

        expect(measureText(content, anchor)).toEqual([
            { x: 0, y: 3, width: 80, height: 12 },
            { x: -80, y: 27, width: 160, height: 12 },
        ]);
        expect(range.selectNodeContents).toHaveBeenCalledTimes(2);
        jest.restoreAllMocks();
    });

    it.each([
        [14, 18, 10],
        [14, 20, 10],
        [16, 20, 12],
        [16, 24, 12],
        [18, 22, 12],
        [20, 28, 14],
        [22, 26, 16],
        [26, 32, 18],
        [30, 36, 22],
        [34, 40, 24],
        [40, 48, 28],
        [48, 52, 34],
    ])(
        'маска для %i/%i имеет высоту %ipx и центрируется по вертикали',
        (fontSize, lineHeight, height) => {
            const content = document.createElement('span');
            const anchor = document.createElement('span');
            content.style.fontSize = `${fontSize}px`;
            content.style.lineHeight = `${lineHeight}px`;
            content.textContent = 'Скрытый текст';
            jest.spyOn(document, 'createRange').mockReturnValue({
                selectNodeContents: jest.fn(),
                getClientRects: () => [{ left: 0, top: 0, width: 280, height: lineHeight }],
            } as unknown as Range);
            expect(measureText(content, anchor)).toEqual([
                { x: 0, y: (lineHeight - height) / 2, width: 280, height },
            ]);
        },
    );

    it('учитывает вложенный размер шрифта и читает стиль каждого элемента только один раз', () => {
        const content = document.createElement('span');
        const nested = document.createElement('strong');
        nested.style.fontSize = '30px';
        content.style.fontSize = '14px';
        nested.append('Сумма', document.createTextNode(' ₽'));
        content.append(nested, document.createTextNode(' в месяц'));
        const style = jest.spyOn(window, 'getComputedStyle');
        jest.spyOn(document, 'createRange').mockReturnValue({
            selectNodeContents: jest.fn(),
            getClientRects: jest
                .fn()
                .mockReturnValueOnce([{ left: 0, top: 0, width: 100, height: 36 }])
                .mockReturnValueOnce([{ left: 100, top: 0, width: 20, height: 36 }])
                .mockReturnValueOnce([{ left: 120, top: 18, width: 60, height: 18 }]),
        } as unknown as Range);
        expect(measureText(content, document.createElement('span'))).toEqual([
            { x: 0, y: 7, width: 120, height: 22 },
            { x: 120, y: 22, width: 60, height: 10 },
        ]);
        expect(style).toHaveBeenCalledTimes(2);
    });
});
