import { buildIconUrl } from './utils';

describe('buildIconUrl', () => {
    const baseUrl = 'https://alfabank.servicecdn.ru/icons';

    describe('SUCCESS', () => {
        it.each([
            'face_smiling-heart-eyes',
            'object_money-with-wings',
            'glyph_chevron_forward_extra_m',
            'emoji/72/glyph_user_m',
            'emoji/72/glyph_house_m',
            'logo_new_beeline__xl',
        ])('should build url for valid name: "%s"', (name) => {
            expect(buildIconUrl(name, baseUrl)).toBe(`${baseUrl}/${name}.svg`);
        });
    });

    describe('EDGE', () => {
        it.each(['', '   ', '-', '.', '_', '--', '__', '...'])(
            'should return null for invalid name: "%s"',
            (name) => {
                expect(buildIconUrl(name, baseUrl)).toBeNull();
            },
        );
    });

    describe('ERROR', () => {
        it.each([
            0,
            42,
            true,
            false,
            null,
            undefined,
            {},
            [],
            () => 'icon',
        ])('should return null for non-string value: %p', (value) => {
            expect(buildIconUrl(value as unknown as string, baseUrl)).toBeNull();
        });
    });
});
