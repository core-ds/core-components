import React from 'react';
import { Amount } from '@alfalab/core-components-amount';
import { Table } from '@alfalab/core-components-table';
import { Space } from '@alfalab/core-components-space';
import { Typography } from '@alfalab/core-components-typography';
import { Wrapper } from './Wrapper';

const data = [
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

const TableExample = () => {
    return (
        <Wrapper>
            <div style={{ margin: '24px 0 40px' }}>
                <Table>
                    <Table.THead>
                        <Table.THeadCell title='Дата'>Дата</Table.THeadCell>

                        <Table.THeadCell title='Контрагент'>Контрагент</Table.THeadCell>

                        <Table.THeadCell title='Сумма' textAlign='right' width={268}>
                            Сумма
                        </Table.THeadCell>
                    </Table.THead>
                    <Table.TBody>
                        {data.map(row => (
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
                                    />
                                </Table.TCell>
                            </Table.TRow>
                        ))}
                    </Table.TBody>
                </Table>
            </div>
        </Wrapper>
    );
};

export default TableExample;
