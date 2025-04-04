import React, {
    FC,
    useState,
    useMemo,
    useCallback,
    ReactNode,
    isValidElement,
    ReactElement,
} from 'react';
import { Tabs as TabsResponsive, Tab, TabsProps } from '@balafla/core-components-tabs';
import { Changelog } from '../changelog';
import styles from './index.module.css';

enum TabName {
    DESCRIPTION = 'DESCRIPTION',
    PROPS = 'PROPS',
    CSS_VARS = 'CSS_VARS',
    CHANGELOG = 'CHANGELOG',
    DEVELOPMENT = 'DEVELOPMENT',
}

const TabTitle = {
    [TabName.DESCRIPTION]: 'Описание',
    [TabName.PROPS]: 'Свойства',
    [TabName.CSS_VARS]: 'CSS-переменные',
    [TabName.CHANGELOG]: 'Обновления',
    [TabName.DEVELOPMENT]: 'Разработчику',
};

type Props = {
    description: ReactNode;
    props: ReactNode;
    cssVars?: ReactNode;
    changelog?: string;
    defaultSelected?: TabName;
    development?: ReactNode;
};

export const Tabs: FC<Props> = ({
    description,
    props,
    cssVars,
    changelog,
    defaultSelected = TabName.DESCRIPTION,
    development,
}) => {
    const [selected, setSelected] = useState(defaultSelected);

    const handleChange = useCallback<Required<TabsProps>['onChange']>((_, { selectedId }) => {
        setSelected(selectedId as TabName);
    }, []);

    const renderTabs = (): TabsProps['children'] => {
        return [
            <Tab title={TabTitle[TabName.DESCRIPTION]} id={TabName.DESCRIPTION} key='description'>
                {description}
            </Tab>,
            props ? (
                <Tab title={TabTitle[TabName.PROPS]} id={TabName.PROPS} key='props'>
                    {props}
                </Tab>
            ) : null,
            cssVars ? (
                <Tab title={TabTitle[TabName.CSS_VARS]} id={TabName.CSS_VARS} key='css-vars'>
                    {cssVars}
                </Tab>
            ) : null,
            development ? (
                <Tab
                    title={TabTitle[TabName.DEVELOPMENT]}
                    id={TabName.DEVELOPMENT}
                    key='development'
                >
                    {development}
                </Tab>
            ) : null,
            changelog ? (
                <Tab title={TabTitle[TabName.CHANGELOG]} id={TabName.CHANGELOG} key='changelog'>
                    <div style={{ marginTop: '32px' }}>
                        <Changelog content={changelog} />
                    </div>
                </Tab>
            ) : null,
        ].filter(isValidElement) as ReactElement[];
    };

    const tabs = useMemo(() => renderTabs(), [description, props, cssVars]);

    return (
        <TabsResponsive
            className='sb-unstyled'
            selectedId={selected}
            onChange={handleChange}
            containerClassName={styles.tabs}
        >
            {tabs}
        </TabsResponsive>
    );
};
