import React from 'react';
import { Button } from '@alfalab/core-components-button';
import { Typography } from '@alfalab/core-components-typography';
import { ModalDesktop } from '@alfalab/core-components-modal/src/Component.desktop';
import { Wrapper } from './Wrapper';

const ModalExample = () => {
    const [open, setOpen] = React.useState(false);

    const handleModalOpen = () => setOpen(!open);

    return (
        <Wrapper>
            <Button type='button' size='xs' onClick={handleModalOpen}>
                Открыть модалку
            </Button>
            <ModalDesktop open={open} onClose={handleModalOpen} size='m'>
                <ModalDesktop.Header hasCloser={true} />
                <ModalDesktop.Content>
                    <Typography.Title tag='div' view='small'>
                        Почему банк проверяет мои операции?
                    </Typography.Title>
                    <br />
                    <Typography.Text tag='p'>
                        Сейчас много говорят об отказах банков в проведении операций, блокировках
                        интернет-банка. Это связано с тем, что Центральный банк РФ обязывает банки
                        выявлять операции своих клиентов, потенциально нарушающие требования
                        Федерального закона 115-ФЗ «О противодействии легализации (отмыванию)
                        доходов, полученных преступным путем, и финансированию терроризма».
                    </Typography.Text>
                    <br />
                    <Typography.Text tag='p'>
                        Ознакомиться с требованиями ЦБ РФ можно на официальном сайте. Банки обязаны
                        предотвращать проведение таких операций и поэтому могут запросить
                        дополнительную информацию и документы, ограничить доступ к платежам через
                        интернет-банк или даже отказать в исполнении платежа.
                    </Typography.Text>
                </ModalDesktop.Content>
                <ModalDesktop.Footer>
                    <Button view='primary' size='s' onClick={handleModalOpen}>
                        Понятно
                    </Button>
                </ModalDesktop.Footer>
            </ModalDesktop>
        </Wrapper>
    );
};

export default ModalExample;
