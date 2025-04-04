import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { Amount } from '@balafla/core-components-amount';
import { Space } from '@balafla/core-components-space';
import { Typography } from '@balafla/core-components-typography';
import { Table } from '@balafla/core-components-table';
import {
    stylesStringToObj,
    getQueryParam,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof Table> = {
    title: 'Components/Table',
    component: Table,
    id: 'Table',
};

type Story = StoryObj<typeof Table>;

const DATA = [
    {
        id: 28,
        date: '30.06.2022',
        title: 'ООО "КОРПУС-ИТ"',
        sum: 21000000,
    },
    {
        id: 12,
        date: '30.06.2022',
        title: 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "МОБИЛСТИЛ"',
        subtitle:
            'Оказание услуг по договору № 26/09 на основании акта № 1450 от 30 июня 2020 года, в т.ч. НДС 18%',
        sum: 10002030,
    },
    {
        id: 5,
        date: '30.06.2022',
        title: 'ИП Жуков Валерий Сергеевич',
        subtitle: 'Услуги по ремонту за июнь, НДС не облагается',
        sum: 3000069,
    },
];

export const table: Story = {
    name: 'Table',
    render: () => {
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        return (
            <div style={{ backgroundColor: previewStyles.backgroundColor }}>
                <div style={previewStyles}>
                    <Table compactHorizontal={boolean('compact horizontal', false)}>
                        <Table.THead>
                            <Table.THeadCell width='122px' id='date' title='Дата'>
                                Дата
                            </Table.THeadCell>
                            <Table.THeadCell id='title' title='Контрагент'>
                                Контрагент
                            </Table.THeadCell>
                            <Table.THeadCell width='186px' id='sum' title='Сумма' textAlign='right'>
                                Сумма
                            </Table.THeadCell>
                        </Table.THead>
                        <Table.TBody>
                            {DATA.map((row) => (
                                <Table.TRow key={row.id}>
                                    <Table.TCell>
                                        <Typography.Text view='primary-small' tag='div'>
                                            {row.date}
                                        </Typography.Text>
                                    </Table.TCell>
                                    <Table.TCell>
                                        <Space size={2}>
                                            <Typography.Text view='primary-small' tag='div'>
                                                {row.title}
                                            </Typography.Text>
                                            <Typography.Text view='primary-small' color='secondary'>
                                                {row.subtitle}
                                            </Typography.Text>
                                        </Space>
                                    </Table.TCell>
                                    <Table.TCell>
                                        <Amount
                                            value={row.sum}
                                            currency='RUR'
                                            minority={100}
                                            view='withZeroMinorPart'
                                            bold='full'
                                            transparentMinor={true}
                                        />
                                    </Table.TCell>
                                </Table.TRow>
                            ))}
                        </Table.TBody>
                    </Table>
                </div>
            </div>
        );
    },
};

export default meta;
