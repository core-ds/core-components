import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { object, boolean, select, text } from '@storybook/addon-knobs';
import { Button } from '@balafla/core-components-button';
import { ButtonDesktop } from '@balafla/core-components-button/desktop';
import { ButtonMobile } from '@balafla/core-components-button/mobile';

import { UniversalModalDesktop } from '../desktop';
import { UniversalModalMobile } from '../mobile';
import { UniversalModal } from '../Component.responsive';

const meta: Meta<typeof UniversalModal> = {
    title: 'Components/UniversalModal',
    component: UniversalModal,
    id: 'UniversalModal',
};

type Story = StoryObj<typeof UniversalModal>;

const Text = () => (
    <p style={{ margin: '0 0 16px' }}>
        Сейчас много говорят об отказах банков в проведении операций, блокировках интернет-банка.
        Это связано с тем, что Центральный банк РФ обязывает банки выявлять операции своих клиентов,
        потенциально нарушающие требования Федерального закона «О противодействии легализации
        (отмыванию) доходов, полученных преступным путем, и финансированию терроризма» — 115-ФЗ
    </p>
);

const Content = () => {
    const [showMore, setShowMore] = React.useState(false);
    return (
        <>
            <Text />
            {(showMore || boolean('showMore')) && (
                <>
                    <Text />
                    <Text />
                    <Text />
                    <Text />
                    <Text />
                </>
            )}
            <Button size='xs' type='Button' onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Скрыть' : 'Показать еще'}
            </Button>
        </>
    );
};

export const modal: Story = {
    name: 'Modal',
    render: () => {
        const [isOpen, setOpen] = useState(false);

        const verticalAlign = select('verticalAlign', ['top', 'center', 'bottom'], 'center');
        const width = text('width', '500');
        const height = text('height', '500');
        const overlay = boolean('overlay', true);
        const header = boolean('header', true);
        const headerTitle = text('header.title', '');
        const headerAlign = select('header.align', ['left', 'center'], 'left');
        const stickyHeader = boolean('header.sticky', false);
        const stickyFooter = boolean('footer.sticky', false);
        const footerLayout = select(
            'footer.layout',
            ['start', 'center', 'space-between', 'column'],
            'start',
        );
        const bigTitle = boolean('bigTitle', false);
        const margin = object('margin', {});
        const open = boolean('open', false);

        return (
            <div style={{ display: 'inline-block', background: 'transparent' }}>
                <Button type='button' size='xs' onClick={() => setOpen(true)}>
                    Открыть
                </Button>
                <UniversalModalDesktop
                    open={isOpen || open}
                    horizontalAlign='center'
                    verticalAlign={verticalAlign}
                    width={width}
                    height={height}
                    overlay={overlay}
                    margin={margin}
                    onClose={() => setOpen(false)}
                >
                    {header && (
                        <UniversalModalDesktop.Header
                            sticky={stickyHeader}
                            title={headerTitle}
                            align={headerAlign}
                            bigTitle={bigTitle}
                        />
                    )}
                    <UniversalModalDesktop.Content>
                        <Content />
                    </UniversalModalDesktop.Content>

                    {stickyFooter && (
                        <UniversalModalDesktop.Footer sticky={stickyFooter} layout={footerLayout}>
                            <ButtonDesktop size={48} view='primary'>
                                Сохранить
                            </ButtonDesktop>
                            <ButtonDesktop size={48} view='secondary'>
                                Отмена
                            </ButtonDesktop>
                        </UniversalModalDesktop.Footer>
                    )}
                </UniversalModalDesktop>
            </div>
        );
    },
};

export const side_panel: Story = {
    name: 'SidePanel',
    render: () => {
        const [isOpen, setOpen] = useState(false);

        const horizontalAlign = select('horizontalAlign', ['start', 'end'], 'start');
        const verticalAlign = select('verticalAlign', ['top', 'center', 'bottom'], 'center');
        const width = text('width', '500');
        const height = text('height', '500');
        const overlay = boolean('overlay', true);
        const header = boolean('header', true);
        const headerTitle = text('header.title', '');
        const headerAlign = select('header.align', ['left', 'center'], 'left');
        const stickyHeader = boolean('header.sticky', false);
        const stickyFooter = boolean('footer.sticky', false);
        const footerLayout = select(
            'footer.layout',
            ['start', 'center', 'space-between', 'column'],
            'start',
        );
        const bigTitle = boolean('bigTitle', false);
        const margin = object('margin', {});
        const open = boolean('open', false);

        return (
            <div style={{ display: 'inline-block', background: 'transparent' }}>
                <Button type='button' size='xs' onClick={() => setOpen(true)}>
                    Открыть
                </Button>
                <UniversalModalDesktop
                    open={isOpen || open}
                    horizontalAlign={horizontalAlign}
                    verticalAlign={verticalAlign}
                    width={width}
                    height={height}
                    overlay={overlay}
                    margin={margin}
                    onClose={() => setOpen(false)}
                >
                    {header && (
                        <UniversalModalDesktop.Header
                            sticky={stickyHeader}
                            title={headerTitle}
                            align={headerAlign}
                            bigTitle={bigTitle}
                        />
                    )}
                    <UniversalModalDesktop.Content>
                        <Content />
                    </UniversalModalDesktop.Content>

                    {stickyFooter && (
                        <UniversalModalDesktop.Footer sticky={stickyFooter} layout={footerLayout}>
                            <ButtonDesktop size={48} view='primary'>
                                Сохранить
                            </ButtonDesktop>
                            <ButtonDesktop size={48} view='secondary'>
                                Отмена
                            </ButtonDesktop>
                        </UniversalModalDesktop.Footer>
                    )}
                </UniversalModalDesktop>
            </div>
        );
    },
};

export const mobile: Story = {
    name: 'Mobile',
    render: () => {
        const [isOpen, setOpen] = useState(false);

        const header = boolean('header', true);
        const headerTitle = text('header.title', '');
        const headerAlign = select('header.align', ['left', 'center'], 'left');
        const stickyHeader = boolean('header.sticky', false);
        const stickyFooter = boolean('footer.sticky', false);
        const footerLayout = select(
            'footer.layout',
            ['start', 'center', 'space-between', 'column'],
            'start',
        );
        const bigTitle = boolean('bigTitle', false);
        const open = boolean('open', false);
        const appearance = select('appearance', ['bottom', 'right'], 'bottom');

        return (
            <div style={{ display: 'inline-block', background: 'transparent' }}>
                <Button type='button' size='xs' onClick={() => setOpen(true)}>
                    Открыть
                </Button>
                <UniversalModalMobile
                    open={isOpen || open}
                    appearance={appearance}
                    onClose={() => setOpen(false)}
                >
                    {header && (
                        <UniversalModalDesktop.Header
                            sticky={stickyHeader}
                            title={headerTitle}
                            align={headerAlign}
                            bigTitle={bigTitle}
                        />
                    )}
                    <UniversalModalDesktop.Content>
                        <Content />
                    </UniversalModalDesktop.Content>

                    {stickyFooter && (
                        <UniversalModalDesktop.Footer sticky={stickyFooter} layout={footerLayout}>
                            <ButtonMobile size={56} view='primary'>
                                Сохранить
                            </ButtonMobile>
                            <ButtonMobile size={56} view='secondary'>
                                Отмена
                            </ButtonMobile>
                        </UniversalModalDesktop.Footer>
                    )}
                </UniversalModalMobile>
            </div>
        );
    },
};

export default meta;
