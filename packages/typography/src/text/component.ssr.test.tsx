import React from 'react';
import { renderToString } from 'react-dom/server';

import { Text } from './index';

describe('Text SSR', () => {
    describe('Success cases', () => {
        it('should render skeleton if `showSkeleton` is true', () => {
            const html = renderToString(
                <Text
                    dataTestId='text-skeleton'
                    showSkeleton={true}
                    skeletonProps={{ rows: 1, width: '100%' }}
                >
                    Content
                </Text>,
            );

            expect(html).toContain('data-test-id="text-skeleton"');
            expect(html).toContain('skeletonText');
            expect(html).toContain('width:100%');
            expect(html).not.toContain('Content');
        });
    });

    describe('Edge cases', () => {
        it('should render fallback skeleton without `skeletonProps`', () => {
            const html = renderToString(
                <Text dataTestId='text-skeleton' showSkeleton={true}>
                    Content
                </Text>,
            );

            expect(html).toContain('data-test-id="text-skeleton"');
            expect(html).toContain('skeletonText');
            expect(html).toContain('padding:4px 0');
            expect(html).toContain('height:16px');
            expect(html).not.toContain('Content');
        });

        it('should render content if `showSkeleton` is false', () => {
            const html = renderToString(
                <Text dataTestId='text-skeleton' showSkeleton={false}>
                    Content
                </Text>,
            );

            expect(html).toContain('data-test-id="text-skeleton"');
            expect(html).toContain('Content');
            expect(html).not.toContain('skeletonText');
        });
    });

    describe('Error cases', () => {
        it('should not throw without DOM APIs if `showSkeleton` is true', () => {
            expect(() => {
                renderToString(
                    <Text dataTestId='text-skeleton' showSkeleton={true}>
                        Content
                    </Text>,
                );
            }).not.toThrow();
        });
    });
});
