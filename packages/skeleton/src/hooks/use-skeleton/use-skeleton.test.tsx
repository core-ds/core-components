import React from 'react';
import { useSkeleton } from './use-skeleton';
import { TextSkeletonProps } from '../../types/text-skeleton-props';
import { render } from '@testing-library/react';

const Skeleton = (props: TextSkeletonProps) => {
    const { renderSkeleton, textRef } = useSkeleton(true, props);

    const skeleton = renderSkeleton({});

    if (skeleton) return skeleton;

    return <span ref={textRef} />;
};

Object.defineProperty(window, 'getComputedStyle', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
        fontSize: '16px',
        lineHeight: '24px',
    })),
});

describe('useSkeleton tests', () => {
    it('should set `wrapperClassName`', () => {
        const wrapperClassName = 'wrapperClassName';
        const { container } = render(<Skeleton wrapperClassName={wrapperClassName} rows={10} />);

        expect(container.firstElementChild).toHaveClass(wrapperClassName);
    });

    it('should set `width`', () => {
        const { container } = render(<Skeleton rows={10} width={[100, 200]} />);

        const rows = container.firstElementChild!.children;

        expect((rows[0] as HTMLDivElement).style.width).toBe('100px');
        expect((rows[1] as HTMLDivElement).style.width).toBe('200px');
        expect((rows[2] as HTMLDivElement).style.width).toBe('');
    });

    it.each`
        align       | expectValue
        ${'left'}   | ${`left`}
        ${'center'} | ${`center`}
        ${'right'}  | ${`right`}
    `('should set align className $align', ({ align, expectValue }) => {
        const { container } = render(<Skeleton align={align} rows={10} />);

        expect(container.firstElementChild).toHaveClass(expectValue);
    });
});
