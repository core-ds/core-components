import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { FilterTagDesktop as FilterTag } from './desktop';

describe('Snapshots tests', () => {
    it('should match snapshot', () => {
        expect(render(<FilterTag>Press me</FilterTag>)).toMatchSnapshot();
    });

    it('should match snapshot shape=rectangular', () => {
        expect(render(<FilterTag shape='rectangular'>Press me</FilterTag>)).toMatchSnapshot();
    });

    it('should match without children snapshot', () => {
        expect(render(<FilterTag />)).toMatchSnapshot();
    });

    it('should match snapshot with rectangular shape ', () => {
        expect(render(<FilterTag shape='rectangular'>Press me</FilterTag>)).toMatchSnapshot();
    });
});

describe('Classes tests', () => {
    it('should set custom class', () => {
        const className = 'custom-class';

        const { container } = render(<FilterTag className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should set size 48 as default size', () => {
        const { container } = render(<FilterTag />);

        expect(container.firstElementChild).toHaveClass('size-48');
    });

    it('should set size', () => {
        const { container } = render(<FilterTag size={40} />);

        expect(container.firstElementChild).toHaveClass('size-40');
    });

    it('should set `checked` class if prop `checked` is present', () => {
        const { container } = render(<FilterTag checked={true} />);

        expect(container.firstElementChild).toHaveClass('checked');
    });

    it('should set `open` class if prop `open` is present', () => {
        const { container } = render(<FilterTag open={true} />);

        expect(container.firstElementChild).toHaveClass('open');
    });

    it('should set `rectangular` class if prop `shape=alt`', () => {
        const { container } = render(<FilterTag shape='rectangular' />);

        expect(container.firstElementChild).toHaveClass('rectangular');
    });

    it('should set `disabled` class if prop `disabled` is present`', () => {
        const { container } = render(<FilterTag disabled={true} />);

        expect(container.firstElementChild).toHaveClass('disabled');
    });
});

describe('Attributes tests', () => {
    it('should set disabled attribute', () => {
        const { getByRole } = render(<FilterTag disabled={true} />);
        const buttonEl = getByRole('button');
        expect(buttonEl).toBeDisabled();
    });

    it('should set data-test-id attribute', () => {
        const dataTestId = 'tag-test-id';

        const { container } = render(<FilterTag disabled={true} dataTestId={dataTestId} />);

        const testIdAttr = container.firstElementChild?.getAttribute('data-test-id');

        expect(container.firstElementChild?.getAttribute('data-test-id')).toBe(testIdAttr);
    });
});

describe('Render tests', () => {
    it('should unmount without errors', () => {
        const { unmount } = render(<FilterTag>FilterTag</FilterTag>);

        expect(unmount).not.toThrow();
    });

    it('should contain children', () => {
        const text = 'filter Tag text';

        const { container, getByText } = render(<FilterTag>{text}</FilterTag>);

        expect(container.firstElementChild).toContainElement(getByText(text));
    });

    it('should render leftAddons', () => {
        const leftAddonsTestId = 'leftAddonsTestId';

        render(<FilterTag leftAddons={<div data-test-id={leftAddonsTestId}>left addons</div>} />);

        const addon = screen.queryByTestId(leftAddonsTestId);

        expect(addon).toBeInTheDocument();
    });

    it('should render leftAddons content', () => {
        const leftAddonsTestId = 'leftAddonsTestId';
        const content = 'left addons';

        render(<FilterTag leftAddons={<div data-test-id={leftAddonsTestId}>{content}</div>} />);

        const addon = screen.queryByTestId(leftAddonsTestId);

        expect(addon).toHaveTextContent(content);
    });

    it('should render chevron when unchecked', () => {
        const { container, getAllByRole } = render(<FilterTag>FilterTag</FilterTag>);

        expect(container.querySelector('.chevron')).toBeInTheDocument();
        expect(getAllByRole('button')).toHaveLength(1);
    });

    it('should render chevron and clear when checked', () => {
        const { container, getAllByRole } = render(<FilterTag checked={true}>FilterTag</FilterTag>);

        expect(container.querySelector('.chevron')).toBeInTheDocument();
        expect(container.querySelector('.clear')).toBeInTheDocument();
        expect(getAllByRole('button')).toHaveLength(2);
        expect(container.querySelector('.valueButton')).toHaveClass('withChevronAndClear');
        expect(container.firstChild).toHaveClass('withSplitControls');
    });

    it('should render chevron only when checked and showClear=false', () => {
        const { container } = render(
            <FilterTag checked={true} showClear={false}>
                FilterTag
            </FilterTag>,
        );

        expect(container.querySelector('.chevron')).toBeInTheDocument();
        expect(container.querySelector('.clear')).not.toBeInTheDocument();
    });

    it('should render clear only when checked and showArrow=false', () => {
        const { container, getAllByRole } = render(
            <FilterTag checked={true} showArrow={false}>
                FilterTag
            </FilterTag>,
        );

        expect(container.querySelector('.chevron')).not.toBeInTheDocument();
        expect(container.querySelector('.clear')).toBeInTheDocument();
        expect(container.firstChild).toHaveClass('withClearOnly');
        expect(getAllByRole('button')).toHaveLength(2);
        expect(container.querySelector('.valueButton')).not.toHaveClass('withClearOnly');
        expect(container.querySelector('.valueButton')).not.toHaveClass('withChevronAndClear');
        expect(container.firstChild).not.toHaveClass('withSplitControls');
    });

    it('should not render chevron or clear when checked and both hidden', () => {
        const { container, getAllByRole } = render(
            <FilterTag checked={true} showClear={false} showArrow={false}>
                FilterTag
            </FilterTag>,
        );

        expect(container.querySelector('.chevron')).not.toBeInTheDocument();
        expect(container.querySelector('.clear')).not.toBeInTheDocument();
        expect(getAllByRole('button')).toHaveLength(1);
    });

    it('should not render clear when showClear=false and unchecked', () => {
        const { container } = render(<FilterTag showClear={false}>FilterTag</FilterTag>);

        expect(container.querySelector('.clear')).not.toBeInTheDocument();
    });
});

describe('Interaction tests', () => {
    it('should call `onClick` prop, if filterTag not disabled', () => {
        const cb = jest.fn();
        const text = 'Press me!';
        const { getByText } = render(<FilterTag onClick={cb}>{text}</FilterTag>);

        const button = getByText(text);

        if (button) {
            fireEvent.click(button);
        }

        expect(cb).toHaveBeenCalledTimes(1);
    });

    it('should call `onClear` prop, if filterTag checked and not disabled', () => {
        const cb = jest.fn();
        const text = 'Press me!';
        const { getAllByRole } = render(
            <FilterTag checked={true} onClear={cb}>
                {text}
            </FilterTag>,
        );

        const buttons = getAllByRole('button');

        if (buttons[1]) {
            fireEvent.click(buttons[1]);
        }

        expect(cb).toHaveBeenCalledTimes(1);
    });

    it('should not call `onClick` prop, if tag is disabled', () => {
        const cb = jest.fn();
        const text = 'Press me!';

        const { getByText } = render(
            <FilterTag onClick={cb} disabled={true}>
                Press me!
            </FilterTag>,
        );
        const button = getByText(text);
        if (button) {
            fireEvent.click(button);
        }
        expect(cb).toHaveBeenCalledTimes(0);
    });

    it('should not call `onClick` prop, if tag is disabled and checked', () => {
        const cb = jest.fn();
        const text = 'Press me!';
        const { getByText } = render(
            <FilterTag onClick={cb} disabled={true} checked={true}>
                {text}
            </FilterTag>,
        );
        const button = getByText(text);
        if (button) {
            fireEvent.click(button);
        }

        expect(cb).toHaveBeenCalledTimes(0);
    });

    it('should not call onClear when showClear=false', () => {
        const onClear = jest.fn();
        const text = 'Press me!';

        const { getAllByRole, getByText } = render(
            <FilterTag checked={true} showClear={false} onClear={onClear}>
                {text}
            </FilterTag>,
        );

        expect(getAllByRole('button')).toHaveLength(1);

        fireEvent.click(getByText(text));

        expect(onClear).not.toHaveBeenCalled();
    });

    it('should call onClear when showArrow=false', () => {
        const onClear = jest.fn();
        const text = 'Press me!';

        const { getAllByRole } = render(
            <FilterTag checked={true} showArrow={false} onClear={onClear}>
                {text}
            </FilterTag>,
        );

        fireEvent.click(getAllByRole('button')[1]);

        expect(onClear).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when clear clicked', () => {
        const onClick = jest.fn();
        const onClear = jest.fn();
        const text = 'Press me!';

        const { getAllByRole } = render(
            <FilterTag checked={true} onClick={onClick} onClear={onClear}>
                {text}
            </FilterTag>,
        );

        fireEvent.click(getAllByRole('button')[1]);

        expect(onClear).toHaveBeenCalledTimes(1);
        expect(onClick).not.toHaveBeenCalled();
    });

    it('should call onClear on Enter keydown', () => {
        const onClear = jest.fn();
        const text = 'Press me!';

        const { getAllByRole } = render(
            <FilterTag checked={true} onClear={onClear}>
                {text}
            </FilterTag>,
        );

        fireEvent.keyDown(getAllByRole('button')[1], { key: 'Enter' });

        expect(onClear).toHaveBeenCalledTimes(1);
    });

    it('should not call onClear on other keys', () => {
        const onClear = jest.fn();
        const text = 'Press me!';

        const { getAllByRole } = render(
            <FilterTag checked={true} onClear={onClear}>
                {text}
            </FilterTag>,
        );

        fireEvent.keyDown(getAllByRole('button')[1], { key: 'Space' });

        expect(onClear).not.toHaveBeenCalled();
    });
});
