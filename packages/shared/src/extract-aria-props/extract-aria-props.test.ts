import { extractAriaProps } from './extract-aria-props';

describe('extractAriaProps', () => {
    it('should return only aria-* attributes', () => {
        const props = {
            'aria-label': 'Close button',
            'aria-hidden': true,
            'data-test-id': 'test-id',
            id: '123',
            onClick: jest.fn(),
        };

        const result = extractAriaProps(props);

        expect(result).toEqual({
            'aria-label': 'Close button',
            'aria-hidden': true,
        });
    });

    it('should return empty object', () => {
        const props = {
            id: '123',
            className: 'test',
        };

        const result = extractAriaProps(props);

        expect(result).toEqual({});
    });

    it('should not mutate the original object', () => {
        const props = { 'aria-label': 'label' };
        const copy = { ...props };

        extractAriaProps(props);

        expect(props).toEqual(copy);
    });
});
