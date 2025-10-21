import React, { Fragment, type ReactNode } from 'react';

import { hasMultipleChildren } from './utils';

describe('Unit/utility/function/hasMultipleChildren', () => {
    describe('SUCCESS CASES', () => {
        it.each`
            label                    | input
            ${'two simple elements'} | ${[<div key='a' />, <button key='b' />]}
            ${'elements inside Fragment'} | ${(
    <Fragment>
        <div />
        <button />
    </Fragment>
)}
        `('returns true for $label', ({ input }) => {
            expect(hasMultipleChildren(input as ReactNode)).toBe(true);
        });

        it.each`
            label                   | input
            ${'single element div'} | ${(<div />)}
        `('returns false for $label', ({ input }) => {
            expect(hasMultipleChildren(input as ReactNode)).toBe(false);
        });
    });

    describe('EDGE CASES', () => {
        it.each`
            label                  | input
            ${'null'}              | ${null}
            ${'undefined'}         | ${undefined}
            ${'empty array'}       | ${[]}
            ${'only falsy values'} | ${[null, undefined, false]}
            ${'one non-falsy'}     | ${[null, false, <div key='x' />]}
        `('returns false for $label', ({ input }) => {
            expect(hasMultipleChildren(input as ReactNode)).toBe(false);
        });

        it.each`
            label                         | input
            ${'text node with element'}   | ${['text', <div key='d' />]}
            ${'number node with element'} | ${[0, <div key='n' />]}
        `('returns true for $label', ({ input }) => {
            expect(hasMultipleChildren(input as ReactNode)).toBe(true);
        });

        it('handles deep nested Fragments correctly', () => {
            const result = hasMultipleChildren(
                <Fragment>
                    <Fragment>
                        <span />
                    </Fragment>
                    <Fragment>
                        <>text</>
                    </Fragment>
                </Fragment>,
            );

            expect(result).toBe(true);
        });

        it('returns false for deep nested single element inside Fragments', () => {
            const result = hasMultipleChildren(
                <Fragment>
                    <Fragment>
                        <Fragment>
                            <span />
                        </Fragment>
                    </Fragment>
                </Fragment>,
            );

            expect(result).toBe(false);
        });

        it('returns false for Fragment with only falsy children', () => {
            const result = hasMultipleChildren(
                <Fragment>
                    {null}
                    {false}
                    {undefined}
                </Fragment>,
            );

            expect(result).toBe(false);
        });
    });

    describe('ERROR CASES', () => {
        it('does not throw for arbitrary value (Symbol)', () => {
            const value = Symbol('child');

            const call = () => hasMultipleChildren(value as unknown as ReactNode);

            expect(call).not.toThrow();
        });
    });
});
