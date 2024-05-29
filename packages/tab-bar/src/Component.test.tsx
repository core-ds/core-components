import { fireEvent, render } from '@testing-library/react';
import React, { forwardRef } from 'react';
import { getTabBarTestIds } from './utils';
import { TabBar, TabBarProps, TabProps } from '.';

const dti = 'tab-bar';

const TabBarComponent = ({
    tabProps,
    ...restProps
}: Partial<TabBarProps> & { tabProps?: Partial<TabProps> }) => {
    const [selectedId, setSelectedId] = React.useState('1');

    return (
        <TabBar selectedId={selectedId} onChange={setSelectedId} dataTestId={dti} {...restProps}>
            <TabBar.Tab id='1' label='TabName1' icon='icon1' {...tabProps} />
            <TabBar.Tab id='2' label='TabName2' icon='icon2' {...tabProps} />
        </TabBar>
    );
};

describe('TagBar', () => {
    describe('snapshot test', () => {
        it('should match snapshot', () => {
            const { container } = render(<TabBarComponent />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('attributes tests', () => {
        it('should set `data-test-id` attribute', () => {
            const { container, getAllByTestId } = render(<TabBarComponent />);

            const testIds = getTabBarTestIds(dti);

            expect(getAllByTestId(testIds.tabBar).length).toBe(1);
            expect(getAllByTestId(testIds.tab).length).toBe(2);
        });

        it('should set `className` attribute', () => {
            const { getByTestId } = render(<TabBarComponent className='tab-bar' />);

            expect(getByTestId(dti)).toHaveClass('tab-bar');
        });

        it('should set `border` className if border={true} ', () => {
            const { getByTestId } = render(<TabBarComponent border={true} />);

            expect(getByTestId(dti)).toHaveClass('border');
        });

        it('should set `modal-bg-alt-primary` className if bgColor=`modal-bg-alt-primary`', () => {
            const { getByTestId } = render(<TabBarComponent bgColor='modal-bg-alt-primary' />);

            expect(getByTestId(dti)).toHaveClass('modal-bg-alt-primary');
        });

        it('should set `secondary` className if accentColor=`secondary`', () => {
            const { getAllByTestId } = render(<TabBarComponent accentColor='secondary' />);

            expect(getAllByTestId(`${dti}-tab`)[0]).toHaveClass('secondary');
        });

        it('should set classes for every tab if tabClassNames specified', () => {
            const { getAllByTestId } = render(
                <TabBarComponent
                    tabClassNames={{
                        className: 'tab-class',
                        iconClassName: 'icon-class',
                        selectedClassName: 'selected-class',
                        labelClassName: 'label-class',
                    }}
                />,
            );

            getAllByTestId(`${dti}-tab`).forEach((tab) => expect(tab).toHaveClass('tab-class'));
            getAllByTestId(`${dti}-tab`).forEach((tab) => {
                const icon = tab.querySelector('.icon');
                expect(icon).toHaveClass('icon-class');
            });
            getAllByTestId(`${dti}-tab`).forEach((tab) => {
                const label = tab.querySelector('.label');
                expect(label).toHaveClass('label-class');
            });
            expect(getAllByTestId(`${dti}-tab`)[0]).toHaveClass('selected-class');
            expect(getAllByTestId(`${dti}-tab`)[1]).not.toHaveClass('selected-class');
        });

        it('should set `className` attribute for tab', () => {
            const { container } = render(<TabBarComponent tabProps={{ className: 'tab' }} />);

            expect(container.querySelectorAll('.tab').length).toBe(2);
        });

        it('should set `iconClassName` attribute for tab', () => {
            const { container } = render(
                <TabBarComponent tabProps={{ iconClassName: 'icon-class' }} />,
            );

            expect(container.querySelectorAll('.icon-class').length).toBe(2);
        });

        it('should set `labelClassName` attribute for tab', () => {
            const { container } = render(
                <TabBarComponent tabProps={{ labelClassName: 'label-class' }} />,
            );

            expect(container.querySelectorAll('.label-class').length).toBe(2);
        });

        it('should set `selectedClassName` attribute for tab', () => {
            const { container } = render(
                <TabBarComponent tabProps={{ selectedClassName: 'selected-class' }} />,
            );

            expect(container.querySelectorAll('.selected-class').length).toBe(1);
        });

        it('should set `id` attribute for tab', () => {
            const { container } = render(<TabBarComponent tabProps={{ id: 'tab-id' }} />);

            expect(container.querySelectorAll('#tab-id').length).toBe(2);
        });
    });

    describe('render tests', () => {
        it('should render icon component', () => {
            const Icon = () => <span>icon</span>;

            const { container } = render(<TabBarComponent tabProps={{ icon: <Icon /> }} />);

            container.querySelectorAll('.icon').forEach((icon) => {
                expect(icon).toHaveTextContent('icon');
            });
        });

        it('should render label component', () => {
            const Label = () => <span>label</span>;

            const { container } = render(<TabBarComponent tabProps={{ label: <Label /> }} />);

            container.querySelectorAll('.label').forEach((label) => {
                expect(label).toHaveTextContent('label');
            });
        });

        it('should render indicator', () => {
            const { container } = render(<TabBarComponent tabProps={{ showIndicator: true }} />);

            expect(container.querySelectorAll('.indicator').length).toBe(2);
        });

        it('should use custom component', () => {
            const cb = jest.fn();
            cb.mockReturnValue(null);
            const to = { path: '/test' };

            render(<TabBarComponent tabProps={{ Component: forwardRef(cb), to }} />);

            expect(cb).toBeCalled();

            const props = cb.mock.calls[0][0];
            expect(props.to).toBe(to);
        });
    });

    describe('callback tests', () => {
        it('should call `onChange` callback', () => {
            const onChange = jest.fn();
            const { getAllByRole } = render(<TabBarComponent onChange={onChange} />);

            const tab2 = getAllByRole('button')[1];
            fireEvent.click(tab2);

            expect(onChange).toBeCalledTimes(1);
            expect(onChange).toBeCalledWith('2');
        });
    });
});
