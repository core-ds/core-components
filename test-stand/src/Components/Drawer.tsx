import React from 'react';
import { DrawerContext, Drawer } from '@alfalab/core-components-drawer';
import { Button } from '@alfalab/core-components-button';
import { Wrapper } from './Wrapper';

function Content() {
    const { contentRef } = React.useContext(DrawerContext);
    const [showMore, setShowMore] = React.useState(false);
    const Text = () => (
        <p>
            Сейчас много говорят об отказах банков в проведении операций, блокировках
            интернет-банка. Это связано с тем, что Центральный банк РФ обязывает банки выявлять
            операции своих клиентов, потенциально нарушающие требования Федерального закона «О
            противодействии легализации (отмыванию) доходов, полученных преступным путем, и
            финансированию терроризма» — 115-ФЗ
        </p>
    );
    return (
        <div style={{ padding: '16px 32px' }} ref={contentRef as React.RefObject<HTMLDivElement>}>
            <Text />
            {showMore && (
                <React.Fragment>
                    <Text />
                    <Text />
                    <Text />
                </React.Fragment>
            )}
            <Button size='xs' type='button' onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Скрыть' : 'Показать еще'}
            </Button>
        </div>
    );
}

const DrawerExample = () => {
    const [open, setOpen] = React.useState(false);

    const handleModalOpen = () => setOpen(!open);

    return (
        <Wrapper>
            <Button size='xs' onClick={handleModalOpen}>
                Открыть Drawer
            </Button>
            <Drawer open={open} onClose={handleModalOpen}>
                <Content />
            </Drawer>
        </Wrapper>
    );
};

export default DrawerExample;
