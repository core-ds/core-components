import cn from 'classnames';
import React, { lazy } from 'react';
import {
    Link as RouterLink,
    Redirect,
    Route,
    Switch as RouterSwitch,
    useLocation,
} from 'react-router-dom';

const Alert = lazy(() => import(/* webpackChunkName: "alert" */ './Components/Alert'));
const Amount = lazy(() => import(/* webpackChunkName: "amount" */ './Components/Amount'));
const AmountInput = lazy(() =>
    import(/* webpackChunkName: "amount-input" */ './Components/AmountInput'),
);
const Attach = lazy(() => import(/* webpackChunkName: "attach" */ './Components/Attach'));
const Backdrop = lazy(() => import(/* webpackChunkName: "backdrop" */ './Components/Backdrop'));
const Badge = lazy(() => import(/* webpackChunkName: "badge" */ './Components/Badge'));
const BankCard = lazy(() => import(/* webpackChunkName: "bank-card" */ './Components/BankCard'));
const BaseModal = lazy(() => import(/* webpackChunkName: "base-modal" */ './Components/BaseModal'));
const BottomSheet = lazy(() =>
    import(/* webpackChunkName: "bottom-sheet" */ './Components/BottomSheet'),
);
const Button = lazy(() => import(/* webpackChunkName: "button" */ './Components/Button'));
const Calendar = lazy(() => import(/* webpackChunkName: "calendar" */ './Components/Calendar'));
const CalendarInput = lazy(() =>
    import(/* webpackChunkName: "calendar-input" */ './Components/CalendarInput'),
);
const CalendarRange = lazy(() =>
    import(/* webpackChunkName: "calendar-range" */ './Components/CalendarRange'),
);
const CardImage = lazy(() => import(/* webpackChunkName: "card-image" */ './Components/CardImage'));
const CalendarWithSkeleton = lazy(() =>
    import(/* webpackChunkName: "calendar-with-skeleton" */ './Components/CalendarWithSkeleton'),
);
const CDNIcon = lazy(() => import(/* webpackChunkName: "cdn-icon" */ './Components/CDNIcon'));
const Checkbox = lazy(() => import(/* webpackChunkName: "checkbox" */ './Components/Checkbox'));
const CheckboxGroup = lazy(() =>
    import(/* webpackChunkName: "checkbox-group" */ './Components/CheckboxGroup'),
);
const CircularProgressBar = lazy(() =>
    import(/* webpackChunkName: "circular-progress-bar" */ './Components/CircularProgressBar'),
);
const CodeInput = lazy(() => import(/* webpackChunkName: "code-input" */ './Components/CodeInput'));
const Collapse = lazy(() => import(/* webpackChunkName: "collapse" */ './Components/Collapse'));
const Confirmation = lazy(() =>
    import(/* webpackChunkName: "confirmation" */ './Components/Confirmation'),
);
const CustomButton = lazy(() =>
    import(/* webpackChunkName: "custom-button" */ './Components/CustomButton'),
);
const DateInput = lazy(() => import(/* webpackChunkName: "date-input" */ './Components/DateInput'));
const Divider = lazy(() => import(/* webpackChunkName: "divider" */ './Components/Divider'));
const Drawer = lazy(() => import(/* webpackChunkName: "drawer" */ './Components/Drawer'));
const Dropzone = lazy(() => import(/* webpackChunkName: "dropzone" */ './Components/Dropzone'));
const FileUploadItem = lazy(() =>
    import(/* webpackChunkName: "file-upload-item" */ './Components/FileUploadItem'),
);
const FilterTag = lazy(() => import(/* webpackChunkName: "filter-tag" */ './Components/FilterTag'));
const FormControl = lazy(() =>
    import(/* webpackChunkName: "form-control" */ './Components/FormControl'),
);
const Gallery = lazy(() => import(/* webpackChunkName: "gallery" */ './Components/Gallery'));
const Grid = lazy(() => import(/* webpackChunkName: "grid" */ './Components/Grid'));
const HatchingProgressBar = lazy(() =>
    import(/* webpackChunkName: "hatching-progress-bar" */ './Components/HatchingProgressBar'),
);
const IconButton = lazy(() =>
    import(/* webpackChunkName: "icon-button" */ './Components/IconButton'),
);
const IconView = lazy(() => import(/* webpackChunkName: "icon-view" */ './Components/IconView'));
const Input = lazy(() => import(/* webpackChunkName: "input" */ './Components/Input'));
const InputAutocomplete = lazy(() =>
    import(/* webpackChunkName: "input-autocomplete" */ './Components/InputAutocomplete'),
);
const IntlPhoneInput = lazy(() =>
    import(/* webpackChunkName: "intl-phone-input" */ './Components/IntlPhoneInput'),
);
const KeyboardFocusable = lazy(() =>
    import(/* webpackChunkName: "keyboard-focusable" */ './Components/KeyboardFocusable'),
);
const Link = lazy(() => import(/* webpackChunkName: "link" */ './Components/Link'));
const List = lazy(() => import(/* webpackChunkName: "list" */ './Components/List'));
const ListHeader = lazy(() =>
    import(/* webpackChunkName: "list-header" */ './Components/ListHeader'),
);
const Loader = lazy(() => import(/* webpackChunkName: "loader" */ './Components/Loader'));
const MaskedInput = lazy(() =>
    import(/* webpackChunkName: "masked-input" */ './Components/MaskedInput'),
);
const Modal = lazy(() => import(/* webpackChunkName: "modal" */ './Components/Modal'));
const Mq = lazy(() => import(/* webpackChunkName: "mq" */ './Components/Mq'));
const Notification = lazy(() =>
    import(/* webpackChunkName: "notification" */ './Components/Notification'),
);
const NotificationManager = lazy(() =>
    import(/* webpackChunkName: "notification-manager" */ './Components/NotificationManager'),
);
const Pagination = lazy(() =>
    import(/* webpackChunkName: "pagination" */ './Components/Pagination'),
);
const PasswordInput = lazy(() =>
    import(/* webpackChunkName: "password-input" */ './Components/PasswordInput'),
);
const PhoneInput = lazy(() =>
    import(/* webpackChunkName: "phone-input" */ './Components/PhoneInput'),
);
const PickerButton = lazy(() =>
    import(/* webpackChunkName: "picker-Button" */ './Components/PickerButton'),
);
const Plate = lazy(() => import(/* webpackChunkName: "plate" */ './Components/Plate'));
const Popover = lazy(() => import(/* webpackChunkName: "popover" */ './Components/Popover'));
const Portal = lazy(() => import(/* webpackChunkName: "portal" */ './Components/Portal'));
const ProgressBar = lazy(() =>
    import(/* webpackChunkName: "progress-bar" */ './Components/ProgressBar'),
);
const PureInput = lazy(() => import(/* webpackChunkName: "pure-input" */ './Components/PureInput'));
const Radio = lazy(() => import(/* webpackChunkName: "radio" */ './Components/Radio'));
const RadioGroup = lazy(() =>
    import(/* webpackChunkName: "radio-group" */ './Components/RadioGroup'),
);
const Select = lazy(() => import(/* webpackChunkName: "select" */ './Components/Select'));
const SelectWithTags = lazy(() =>
    import(/* webpackChunkName: "select-with-tags" */ './Components/SelectWithTags'),
);
const Skeleton = lazy(() => import(/* webpackChunkName: "skeleton" */ './Components/Skeleton'));
const Slider = lazy(() => import(/* webpackChunkName: "slider" */ './Components/Slider'));
const SliderInput = lazy(() =>
    import(/* webpackChunkName: "slider-input" */ './Components/SliderInput'),
);
const Space = lazy(() => import(/* webpackChunkName: "space" */ './Components/Space'));
const Spinner = lazy(() => import(/* webpackChunkName: "spinner" */ './Components/Spinner'));
const Status = lazy(() => import(/* webpackChunkName: "status" */ './Components/Status'));
const StepperProgressBar = lazy(() =>
    import(/* webpackChunkName: "stepper-progress-bar" */ './Components/StepperProgressBar'),
);
const Switch = lazy(() => import(/* webpackChunkName: "switch" */ './Components/Switch'));
const Table = lazy(() => import(/* webpackChunkName: "table" */ './Components/Table'));
const Tabs = lazy(() => import(/* webpackChunkName: "tabs" */ './Components/Tabs'));
const Tag = lazy(() => import(/* webpackChunkName: "tag" */ './Components/Tag'));
const Textarea = lazy(() => import(/* webpackChunkName: "textarea" */ './Components/Textarea'));
const Toast = lazy(() => import(/* webpackChunkName: "toast" */ './Components/Toast'));
const ToastPlate = lazy(() =>
    import(/* webpackChunkName: "toast-plate" */ './Components/ToastPlate'),
);
const Tooltip = lazy(() => import(/* webpackChunkName: "tooltip" */ './Components/Tooltip'));
const Typography = lazy(() =>
    import(/* webpackChunkName: "typography" */ './Components/Typography'),
);
const WithSuffix = lazy(() =>
    import(/* webpackChunkName: "with-suffix" */ './Components/WithSuffix'),
);

interface RouteConfig {
    route: string;
    linkName: string;
    renderComponent: () => JSX.Element;
}

const CONFIG: RouteConfig[] = [
    {
        route: '/alert',
        linkName: 'Alert',
        renderComponent: () => <Alert />,
    },
    {
        route: '/amount',
        linkName: 'Amount',
        renderComponent: () => <Amount />,
    },
    {
        route: '/amount-input',
        linkName: 'AmountInput',
        renderComponent: () => <AmountInput />,
    },
    {
        route: '/attach',
        linkName: 'Attach',
        renderComponent: () => <Attach />,
    },
    {
        route: '/backdrop',
        linkName: 'Backdrop',
        renderComponent: () => <Backdrop />,
    },
    {
        route: '/badge',
        linkName: 'Badge',
        renderComponent: () => <Badge />,
    },
    {
        route: '/bank-card',
        linkName: 'BankCard',
        renderComponent: () => <BankCard />,
    },
    {
        route: '/base-modal',
        linkName: 'BaseModal',
        renderComponent: () => <BaseModal />,
    },
    {
        route: '/bottom-sheet',
        linkName: 'BottomSheet',
        renderComponent: () => <BottomSheet />,
    },
    {
        route: '/button',
        linkName: 'Button',
        renderComponent: () => <Button />,
    },
    {
        route: '/calendar',
        linkName: 'Calendar',
        renderComponent: () => <Calendar />,
    },
    {
        route: '/calendar-input',
        linkName: 'CalendarInput',
        renderComponent: () => <CalendarInput />,
    },
    {
        route: '/calendar-range',
        linkName: 'CalendarRange',
        renderComponent: () => <CalendarRange />,
    },
    {
        route: '/card-image',
        linkName: 'CardImage',
        renderComponent: () => <CardImage />,
    },
    {
        route: '/calendar-with-skeleton',
        linkName: 'CalendarWithSkeleton',
        renderComponent: () => <CalendarWithSkeleton />,
    },
    {
        route: '/cdn-icon',
        linkName: 'CDNIcon',
        renderComponent: () => <CDNIcon />,
    },
    {
        route: '/checkbox',
        linkName: 'Checkbox',
        renderComponent: () => <Checkbox />,
    },
    {
        route: '/checkbox-group',
        linkName: 'CheckboxGroup',
        renderComponent: () => <CheckboxGroup />,
    },
    {
        route: '/circular-progress-bar',
        linkName: 'CircularProgressBar',
        renderComponent: () => <CircularProgressBar />,
    },
    {
        route: '/code-input',
        linkName: 'CodeInput',
        renderComponent: () => <CodeInput />,
    },
    {
        route: '/collapse',
        linkName: 'Collapse',
        renderComponent: () => <Collapse />,
    },
    {
        route: '/confirmation',
        linkName: 'Confirmation',
        renderComponent: () => <Confirmation />,
    },
    {
        route: '/custom-button',
        linkName: 'CustomButton',
        renderComponent: () => <CustomButton />,
    },
    {
        route: '/date-input',
        linkName: 'DateInput',
        renderComponent: () => <DateInput />,
    },
    {
        route: '/divider',
        linkName: 'Divider',
        renderComponent: () => <Divider />,
    },
    {
        route: '/drawer',
        linkName: 'Drawer',
        renderComponent: () => <Drawer />,
    },
    {
        route: '/dropzone',
        linkName: 'Dropzone',
        renderComponent: () => <Dropzone />,
    },
    {
        route: '/file-upload-item',
        linkName: 'FileUploadItem',
        renderComponent: () => <FileUploadItem />,
    },
    {
        route: '/filter-tag',
        linkName: 'FilterTag',
        renderComponent: () => <FilterTag />,
    },
    {
        route: '/form-control',
        linkName: 'FormControl',
        renderComponent: () => <FormControl />,
    },
    {
        route: '/gallery',
        linkName: 'Gallery',
        renderComponent: () => <Gallery />,
    },
    {
        route: '/grid',
        linkName: 'Grid',
        renderComponent: () => <Grid />,
    },
    {
        route: '/hatching-progress-bar',
        linkName: 'HatchingProgressBar',
        renderComponent: () => <HatchingProgressBar />,
    },
    {
        route: '/icon-button',
        linkName: 'IconButton',
        renderComponent: () => <IconButton />,
    },
    {
        route: '/icon-view',
        linkName: 'IconView',
        renderComponent: () => <IconView />,
    },
    {
        route: '/input',
        linkName: 'Input',
        renderComponent: () => <Input />,
    },
    {
        route: '/input-autocomplete',
        linkName: 'InputAutocomplete',
        renderComponent: () => <InputAutocomplete />,
    },
    {
        route: '/intl-phone-input',
        linkName: 'IntlPhoneInput',
        renderComponent: () => <IntlPhoneInput />,
    },
    {
        route: '/keyboard-focusable',
        linkName: 'KeyboardFocusable',
        renderComponent: () => <KeyboardFocusable />,
    },
    {
        route: '/link',
        linkName: 'Link',
        renderComponent: () => <Link />,
    },
    {
        route: '/list',
        linkName: 'List',
        renderComponent: () => <List />,
    },
    {
        route: '/list-header',
        linkName: 'ListHeader',
        renderComponent: () => <ListHeader />,
    },
    {
        route: '/loader',
        linkName: 'Loader',
        renderComponent: () => <Loader />,
    },
    {
        route: '/masked-input',
        linkName: 'MaskedInput',
        renderComponent: () => <MaskedInput />,
    },
    {
        route: '/modal',
        linkName: 'Modal',
        renderComponent: () => <Modal />,
    },
    {
        route: '/mq',
        linkName: 'Mq',
        renderComponent: () => <Mq />,
    },
    {
        route: '/notification',
        linkName: 'Notification',
        renderComponent: () => <Notification />,
    },
    {
        route: '/notification-manager',
        linkName: 'NotificationManager',
        renderComponent: () => <NotificationManager />,
    },
    {
        route: '/pagination',
        linkName: 'Pagination',
        renderComponent: () => <Pagination />,
    },
    {
        route: '/password-input',
        linkName: 'PasswordInput',
        renderComponent: () => <PasswordInput />,
    },
    {
        route: '/phone-input',
        linkName: 'PhoneInput',
        renderComponent: () => <PhoneInput />,
    },
    {
        route: '/picker-button',
        linkName: 'PickerButton',
        renderComponent: () => <PickerButton />,
    },
    {
        route: '/plate',
        linkName: 'Plate',
        renderComponent: () => <Plate />,
    },
    {
        route: '/popover',
        linkName: 'Popover',
        renderComponent: () => <Popover />,
    },
    {
        route: '/portal',
        linkName: 'Portal',
        renderComponent: () => <Portal />,
    },
    {
        route: '/progress-bar',
        linkName: 'ProgressBar',
        renderComponent: () => <ProgressBar />,
    },
    {
        route: '/pure-input',
        linkName: 'PureInput',
        renderComponent: () => <PureInput />,
    },
    {
        route: '/radio',
        linkName: 'Radio',
        renderComponent: () => <Radio />,
    },
    {
        route: '/radio-group',
        linkName: 'RadioGroup',
        renderComponent: () => <RadioGroup />,
    },
    {
        route: '/select',
        linkName: 'Select',
        renderComponent: () => <Select />,
    },
    {
        route: '/select-with-tags',
        linkName: 'SelectWithTags',
        renderComponent: () => <SelectWithTags />,
    },
    {
        route: '/skeleton',
        linkName: 'Skeleton',
        renderComponent: () => <Skeleton />,
    },
    {
        route: '/slider',
        linkName: 'Slider',
        renderComponent: () => <Slider />,
    },
    {
        route: '/slider-input',
        linkName: 'SliderInput',
        renderComponent: () => <SliderInput />,
    },
    {
        route: '/space',
        linkName: 'Space',
        renderComponent: () => <Space />,
    },
    {
        route: '/spinner',
        linkName: 'Spinner',
        renderComponent: () => <Spinner />,
    },
    {
        route: '/status',
        linkName: 'Status',
        renderComponent: () => <Status />,
    },
    {
        route: '/stepper-progress-bar',
        linkName: 'StepperProgressBar',
        renderComponent: () => <StepperProgressBar />,
    },
    {
        route: '/switch',
        linkName: 'Switch',
        renderComponent: () => <Switch />,
    },
    {
        route: '/table',
        linkName: 'Table',
        renderComponent: () => <Table />,
    },
    {
        route: '/tabs',
        linkName: 'Tabs',
        renderComponent: () => <Tabs />,
    },
    {
        route: '/tag',
        linkName: 'Tag',
        renderComponent: () => <Tag />,
    },
    {
        route: '/textarea',
        linkName: 'Textarea',
        renderComponent: () => <Textarea />,
    },
    {
        route: '/toast',
        linkName: 'Toast',
        renderComponent: () => <Toast />,
    },
    {
        route: '/toast-plate',
        linkName: 'ToastPlate',
        renderComponent: () => <ToastPlate />,
    },
    {
        route: '/tooltip',
        linkName: 'Tooltip',
        renderComponent: () => <Tooltip />,
    },
    {
        route: '/typography',
        linkName: 'Typography',
        renderComponent: () => <Typography />,
    },
    {
        route: '/with-suffix',
        linkName: 'WithSuffix',
        renderComponent: () => <WithSuffix />,
    },
];

export const App: React.VFC = () => {
    const location = useLocation();

    return (
        <div className='page-wrapper'>
            <nav className='sidebar'>
                <img
                    src='https://alfabank.ru/api/files/mail_designer/mailz/core-components.svg'
                    alt='brand'
                    className='brand'
                />
                {CONFIG.map(({ linkName, route }) => {
                    return (
                        <RouterLink
                            key={route}
                            to={route}
                            className={cn('link', { selected: route === location.pathname })}
                        >
                            {linkName}
                        </RouterLink>
                    );
                })}
            </nav>
            <div className='content'>
                <div className='container-outer'>
                    <div className='container-inner'>
                        <React.Suspense fallback={<React.Fragment />}>
                            <RouterSwitch>
                                {CONFIG.map(({ route, renderComponent }) => (
                                    <Route key={route} path={route} render={renderComponent} />
                                ))}
                                <Redirect to={CONFIG[0].route} />
                            </RouterSwitch>
                        </React.Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};
