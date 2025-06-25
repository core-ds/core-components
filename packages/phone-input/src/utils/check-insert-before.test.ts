import { checkInsertBefore } from './check-insert-before';

describe('checkInsertAtBeginning', () => {
    it.each`
        prevValue        | currentValue       | expectedValue
        ${undefined}     | ${''}              | ${false}
        ${''}            | ${'1'}             | ${false}
        ${''}            | ${'7666'}          | ${false}
        ${'+7 1'}        | ${'+7 12'}         | ${false}
        ${'+7 12'}       | ${'+7 123'}        | ${false}
        ${'+7 321 23'}   | ${'7666'}          | ${false}
        ${'+7 123'}      | ${'+27 123'}       | ${true}
        ${'+7 212 3'}    | ${'3+7 212 3'}     | ${true}
        ${'+7 123 '}     | ${'+1237 123'}     | ${true}
        ${'+7 123 123 '} | ${'123+7 123 123'} | ${true}
    `('should be $expectedValue', ({ prevValue, currentValue, expectedValue }) => {
        expect(checkInsertBefore(prevValue, currentValue)).toBe(expectedValue);
    });
});
