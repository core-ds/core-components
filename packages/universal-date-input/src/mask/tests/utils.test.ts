import {
    getValueSegments,
    padWithZeroesUntilValid,
    segmentsToPattern,
    segmentsToString,
    toDateString,
    segmentsToObj,
    countSeparatorsFromHead,
    findCursorPlace,
    shiftSegmentsData,
    replaceSegmentsData,
    validateSegments,
    formatDateToTemplate,
} from '../utils';
import { DEFAULT_MAX_DATE, DEFAULT_MIN_DATE, TEMPLATES } from '../../consts';
import { DateSegments, DateTemplate } from '../../types';

describe('utils tests', () => {
    describe('getValueSegments', () => {
        const tests = [
            [
                ['00.0', ['.', '.']],
                ['00', '0'],
            ],
            [
                ['00.00.0', ['.', '.']],
                ['00', '00', '0'],
            ],
            [
                ['00.00.0000 - ..0000', ['.', '.', ' - ', '.', '.']],
                ['00', '00', '0000', '', '', '0000'],
            ],
            [
                ['.00.0000', ['.', '.']],
                ['', '00', '0000'],
            ],
            [
                ['.00.', ['.', '.']],
                ['', '00'],
            ],
        ];

        for (const [args, result] of tests) {
            const [rawValue, separators] = args as [string, string[]];
            it(`should return ${JSON.stringify(result)}`, () => {
                expect(getValueSegments(rawValue, separators)).toEqual(result);
            });
        }
    });

    describe('segmentsToPattern', () => {
        const tests = [
            [
                [
                    ['00', '00', '0000'],
                    ['.', '.'],
                ],
                [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/],
            ],
            [
                [
                    ['', '', '0000'],
                    ['.', '.'],
                ],
                ['.', '.', /\d/, /\d/, /\d/, /\d/],
            ],
            [
                [
                    ['', '0', '0'],
                    ['.', '.'],
                ],
                ['.', /\d/, '.', /\d/],
            ],
            [
                [
                    ['00', '00', '0000', '', '', '0000'],
                    ['.', '.', ' - ', '.', '.'],
                ],
                [
                    /\d/,
                    /\d/,
                    '.',
                    /\d/,
                    /\d/,
                    '.',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    '-',
                    ' ',
                    '.',
                    '.',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                ],
            ],
        ];

        for (const [args, result] of tests) {
            const [segments, separators] = args as [string[], string[]];

            it(`should return valid pattern - ${JSON.stringify(
                result.map((r) => r.toString()),
            )}`, () => {
                expect(segmentsToPattern(segments, separators)).toEqual(result);
            });
        }
    });

    describe('segmentsToString', () => {
        const tests = [
            [
                [
                    ['00', '00', '0000'],
                    ['.', '.'],
                ],
                '00.00.0000',
            ],
            [
                [
                    ['00', '00', '', ''],
                    ['.', '.', '-'],
                ],
                '00.00',
            ],
            [
                [
                    ['dd', 'mm', '', ''],
                    ['.', '.', '-'],
                ],
                'dd.mm',
            ],
        ];

        for (const [args, result] of tests) {
            const [segments, separators] = args as [string[], string[]];
            it(`should return ${result}`, () => {
                expect(segmentsToString(segments, separators)).toEqual(result);
            });
        }
    });

    describe('toDateString', () => {
        const tests = [
            [[{ day: '09' }, 'dd.MM.yyyy'], '09..'],
            [[{ day: '12', month: '12', year: '2024' }, 'dd.MM.yyyy'], '12.12.2024'],
            [
                [
                    { day: '12', month: '12', year: '2024', hours: '12', minutes: '12' },
                    'dd.MM.yyyy, HH:mm',
                ],
                '12.12.2024, 12:12',
            ],
        ];

        for (const [args, result] of tests) {
            const [dateSegments, dateTemplate] = args as [DateSegments, string];
            it(`should return ${result}`, () => {
                expect(toDateString(dateSegments, dateTemplate)).toEqual(result);
            });
        }
    });

    describe('getAvailableSegmentValue', () => {
        const tests = [
            [['0', '31'], { prefixedZeroesCount: 0, validatedSegmentValue: '0' }],
            [['9', '31'], { prefixedZeroesCount: 1, validatedSegmentValue: '09' }],
            [['33', '31'], { prefixedZeroesCount: 0, validatedSegmentValue: '31' }],
            [['33', '9999'], { prefixedZeroesCount: 0, validatedSegmentValue: '33' }],
        ];

        for (const [args, result] of tests) {
            it(`should return ${JSON.stringify(result)}`, () => {
                const [value, maxValue] = args as [string, string];
                expect(padWithZeroesUntilValid(value, maxValue)).toEqual(result);
            });
        }
    });

    describe('segmentsToObj', () => {
        const tests = [
            [
                [['09', '12', '2024'], TEMPLATES().date.segments],
                { day: '09', month: '12', year: '2024' },
            ],
            [
                [['09', '1', '2024'], TEMPLATES().date.segments],
                { day: '09', month: '1', year: '2024' },
            ],
            [
                [['', '12', '2024'], TEMPLATES().date.segments],
                { day: '', month: '12', year: '2024' },
            ],
        ];

        for (const [args, result] of tests) {
            const [segments, templateSegments] = args as [string[], string[]];

            it(`should return ${JSON.stringify(result)}`, () => {
                expect(segmentsToObj(segments, templateSegments)).toEqual(result);
            });
        }
    });

    describe('countSeparatorsFromHead', () => {
        const tests: [string, number][] = [
            ['00.00.0000 - ..0000', 0],
            ['.00.00.0000 - ..0000', 1],
            ['..00.00.0000 - ..0000', 2],
        ];

        for (const [dateString, result] of tests) {
            it(`should return ${result}`, () => {
                expect(countSeparatorsFromHead(dateString)).toEqual(result);
            });
        }

        it('should return 3', () => {
            expect(countSeparatorsFromHead('..0.0...00..', 5)).toEqual(3);
        });
    });

    describe('findCursorPlace', () => {
        const { segments, separators } = TEMPLATES().date;

        const tests = [
            [
                [segments, segments, separators, [0, 0]],
                { segmentIdx: 0, offset: 0, beforeNext: false },
            ],
            [
                [segments, segments, separators, [1, 1]],
                { segmentIdx: 0, offset: 1, beforeNext: false },
            ],
            [
                [segments, segments, separators, [2, 2]],
                { segmentIdx: 0, offset: 2, beforeNext: true },
            ],
            [
                [segments, segments, separators, [3, 3]],
                { segmentIdx: 1, offset: 0, beforeNext: false },
            ],
            [
                [segments, segments, separators, [4, 4]],
                { segmentIdx: 1, offset: 1, beforeNext: false },
            ],
            [
                [segments, segments, separators, [5, 5]],
                { segmentIdx: 1, offset: 2, beforeNext: true },
            ],
            [
                [segments, segments, separators, [6, 6]],
                { segmentIdx: 2, offset: 0, beforeNext: false },
            ],
            [
                [segments, segments, separators, [7, 7]],
                { segmentIdx: 2, offset: 1, beforeNext: false },
            ],
            [
                [segments, segments, separators, [8, 8]],
                { segmentIdx: 2, offset: 2, beforeNext: false },
            ],
            [
                [segments, segments, separators, [9, 9]],
                { segmentIdx: 2, offset: 3, beforeNext: false },
            ],
            [
                [segments, segments, separators, [10, 10]],
                { segmentIdx: 2, offset: 4, beforeNext: true },
            ],
            [
                [
                    ['01', '01', '1900', '11', '12', '2000'],
                    TEMPLATES()['date-range'].segments,
                    TEMPLATES()['date-range'].separators,
                    [11, 11],
                ],
                { segmentIdx: 2, offset: 5, beforeNext: true },
            ],
            [
                [
                    ['01', '01', '1900', '11', '12', '2000'],
                    TEMPLATES()['date-range'].segments,
                    TEMPLATES()['date-range'].separators,
                    [12, 12],
                ],
                { segmentIdx: 2, offset: 6, beforeNext: true },
            ],
            [
                [
                    ['01', '01', '1900', '11', '12', '2000'],
                    TEMPLATES()['date-range'].segments,
                    TEMPLATES()['date-range'].separators,
                    [13, 13],
                ],
                { segmentIdx: 3, offset: 0, beforeNext: false },
            ],
            [
                [['', '', '0'], segments, separators, [0, 0]],
                { segmentIdx: 0, offset: 0, beforeNext: false },
            ],
            [
                [['', '', '0'], segments, separators, [1, 1]],
                { segmentIdx: 1, offset: 0, beforeNext: false },
            ],
        ];

        for (const [args, result] of tests) {
            const [segments, templateSegments, separators, selection] = args as [
                string[],
                string[],
                string[],
                [number, number],
            ];
            it(`should return ${JSON.stringify(result)}`, () => {
                expect(findCursorPlace(segments, templateSegments, separators, selection)).toEqual(
                    result,
                );
            });
        }
    });

    describe('shiftSegmentsData', () => {
        const templateSegments = TEMPLATES().date.segments;
        const tests = [
            [
                [['000', '00'], templateSegments],
                ['00', '00', '0'],
            ],
            [
                [['00', '0000'], templateSegments],
                ['00', '00', '00'],
            ],

            [
                [['00', '00', '00005'], TEMPLATES()['date-range'].segments],
                ['00', '00', '0000', '5'],
            ],
        ];

        for (const [args, result] of tests) {
            const [rawSegments, templateSegments] = args as [string[], string[]];

            it(`should return ${JSON.stringify(result)}`, () => {
                expect(shiftSegmentsData(rawSegments, templateSegments)).toEqual(result);
            });
        }
    });

    describe('replaceSegmentsData', () => {
        const tests = [
            [
                [['021', '01'], TEMPLATES().date, [1, 1], '2'],
                ['02', '01'],
            ],
            [
                [['201', '01'], TEMPLATES().date, [0, 0], '2'],
                ['21', '01'],
            ],
            [
                [['01', '01', '21900'], TEMPLATES().date, [6, 6], '2'],
                ['01', '01', '2900'],
            ],
        ];

        for (const [args, result] of tests) {
            const [rawSegments, template, selection, data] = args as [
                string[],
                DateTemplate,
                [number, number],
                string,
            ];

            it(`should return ${JSON.stringify(result)}`, () => {
                expect(replaceSegmentsData(rawSegments, template, selection, data)).toEqual(result);
            });
        }
    });

    describe('validateSegments', () => {
        const tests = [
            [[['9'], [0, 0]], { updatedSelection: [1, 1], validatedDateString: '09..' }],
            [
                [
                    ['09', '2'],
                    [3, 3],
                ],
                { updatedSelection: [4, 4], validatedDateString: '09.02.' },
            ],
            [
                [
                    ['33', '02'],
                    [0, 0],
                ],
                { updatedSelection: [0, 0], validatedDateString: '29.02.' },
            ],
            [
                [
                    ['29', '02', '2001'],
                    [0, 0],
                ],
                { updatedSelection: [0, 0], validatedDateString: '28.02.2001' },
            ],
            [
                [
                    ['29', '55', '2001'],
                    [0, 0],
                ],
                { updatedSelection: [0, 0], validatedDateString: '29.12.2001' },
            ],
        ];

        for (const [args, result] of tests) {
            const [segments, selection] = args as [string[], [number, number]];

            it(`should return ${JSON.stringify(result)}`, () => {
                expect(
                    validateSegments({
                        dateTemplate: 'dd.MM.yyyy',
                        templateSegments: TEMPLATES().date.segments,
                        segments,
                        selection,
                        min: new Date(DEFAULT_MIN_DATE),
                        max: new Date(DEFAULT_MAX_DATE),
                    }),
                ).toEqual(result);
            });
        }
    });

    describe('formatDateToTemplate', () => {
        const tests = [
            [['dd-MM-yyyy'], { segments: ['dd', 'MM', 'yyyy'], separators: ['-', '-'] }],
            [['yyyy-dd-MM'], { segments: ['yyyy', 'dd', 'MM'], separators: ['-', '-'] }],
            [['yyyy-dd-MM'], { segments: ['yyyy', 'dd', 'MM'], separators: ['-', '-'] }],
            [['YY.mm/DDDD'], { segments: ['YY', 'mm', 'DDDD'], separators: ['.', '/'] }],
            [['dd MM EEEE'], { segments: ['dd', 'MM', 'EEEE'], separators: [' ', ' '] }],
            [
                ['YY.mm-DDDD dd'],
                { segments: ['YY', 'mm', 'DDDD', 'dd'], separators: ['.', '-', ' '] },
            ],
            [['DDDD'], { segments: ['DDDD'], separators: [] }],
            [[''], { segments: [], separators: [] }],
        ];

        for (const [args, result] of tests) {
            const [displayFormat] = args as string[];

            it(`should return ${JSON.stringify(result)}`, () => {
                expect(formatDateToTemplate(displayFormat)).toEqual(result);
            });
        }
    });
});
