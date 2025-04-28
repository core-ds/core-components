import { ComponentType, ReactNode } from 'react';

export type ConfirmationProps = {
    /**
     * Экран компонента
     */
    screen: ConfirmationScreen | string;

    /**
     * Состояние компонента
     */
    state: ConfirmationState | string;

    /**
     * Мобильная версия компонента для экрана
     */
    mobile?: boolean;

    /**
     * Позиционирование контента
     */
    alignContent?: 'left' | 'center';

    /**
     * Объект с текстами
     */
    texts?: ConfirmationTexts;

    /**
     * Количество символов, которое можно ввести в поле ввода подписания до того, как произойдет автоотправка
     */
    requiredCharAmount?: number;

    /**
     * Длительность обратного отсчета на кнопке повторного запроса сообщения, в милисекундах
     */
    countdownDuration?: number;

    /**
     * Продолжительность блокировки формы (ms)
     */
    tempBlockDuration?: number;

    /**
     * Номер телефона, на который отправлен код
     */
    phone?: string;

    /**
     * Не осталось попыток ввода кода
     */
    blockSmsRetry?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Сss класс для стилизации общей обёртки
     */
    className?: string;

    /**
     * Флаг - нужно ли очищать код при возникновении ошибки
     */
    clearCodeOnError?: boolean;

    /**
     * Функция обновления состояния компонента
     */
    onChangeState: (state: ConfirmationState | string) => void;

    /**
     * Функция обновления состояния компонента
     */
    onChangeScreen: (state: ConfirmationScreen | string) => void;

    /**
     * Обработчик события завершения ввода кода подписания
     */
    onInputFinished: (code: string) => void;

    /**
     * Обработчик события нажатия на кнопку "Запросить код"
     */
    onSmsRetryClick: () => void;

    /**
     * Клик по кнопке "Понятно" на экране фатальной ошибки
     */
    onFatalErrorOkButtonClick?: () => void;

    /**
     * Временная блокировка формы закончилась
     */
    onTempBlockFinished?: () => void;

    /**
     * Возвращает объект, где ключ - название экрана (screen), значение - компонент для экрана
     */
    getScreensMap?: (defaultScreensMap: ScreensMap) => ScreensMap;

    /**
     * Дочерние элементы
     */
    children?: ReactNode;

    /**
     * Скрыть секцию с повторной отправкой кода
     * @default false
     */
    hideCountdownSection?: boolean;

    /**
     *  Слот для контента с подсказкой на главном экране
     */
    initialScreenHintSlot?: ReactNode;

    /**
     * Контрольная точка для кнопки, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Версия, которая будет использоваться при серверном рендеринге
     */
    client?: 'desktop' | 'mobile';

    /**
     * Продолжительность отображения ошибки
     * @default 1300
     */
    errorVisibleDuration?: number;
};

export type TConfirmationContext = Required<
    Pick<
        ConfirmationProps,
        | 'alignContent'
        | 'texts'
        | 'state'
        | 'screen'
        | 'requiredCharAmount'
        | 'onInputFinished'
        | 'countdownDuration'
        | 'onChangeState'
        | 'onSmsRetryClick'
        | 'onChangeScreen'
        | 'onFatalErrorOkButtonClick'
        | 'tempBlockDuration'
        | 'hideCountdownSection'
    >
> &
    Pick<
        ConfirmationProps,
        | 'phone'
        | 'blockSmsRetry'
        | 'onTempBlockFinished'
        | 'clearCodeOnError'
        | 'initialScreenHintSlot'
        | 'errorVisibleDuration'
        | 'breakpoint'
        | 'client'
    > & {
        timeLeft: number;
    };

export type ConfirmationTexts = {
    /**
     * Экран INITIAL
     */
    title?: ReactNode; // заголовок
    codeError?: string; // ошибка проверки кода
    codeErrorExpired?: string; // код устарел, запросите новый
    codeErrorExpiredEnded?: string; // код устарел
    codeChecking?: string; // код проверяется
    codeSending?: string; // код отправляется
    codeSended?: string; // код отправлен
    buttonRetry?: string; // кнопка повторной отправки кода
    linkToHint?: string; // ссылка на экран HINT
    noAttemptsLeft?: string; // не осталось попыток запроса кода
    countdown?: string; // 'запросить повторно можно через'

    /**
     * Экран HINT
     */
    hintTitle?: string; // заголовок
    hintDescription?: string; // описание
    hintNotification?: string; // уведомление
    hintButton?: string; // кнопка 'Вернуться'
    domesticPhone?: string; // номер телефона для звонков по России
    internationalPhone?: string; // номер телефона для звонков из-за границы

    /**
     * Экран FATAL_ERROR
     */
    fatalErrorTitle?: ReactNode; // заголовок
    fatalErrorDescription?: ReactNode; // описание
    fatalErrorButton?: string; // кнопка

    /**
     * Экран TEMP_BLOCK
     */
    tempBlockTitle?: ReactNode; // заголовок
    tempBlockDescription?: ReactNode; // описание

    /**
     * Экран TEMP_BLOCK_OVER
     */
    tempBlockOverTitle?: ReactNode; // заголовок
    tempBlockOverDescription?: ReactNode; // описание
    tempBlockOverButton?: string; // кнопка
};

export type ConfirmationScreen =
    | 'INITIAL' // начальный экран
    | 'HINT' // экран "Не приходит смс?"
    | 'FATAL_ERROR' // экран критической ошибки
    | 'TEMP_BLOCK' // экран временной блокировки
    | 'TEMP_BLOCK_OVER'; // экран todo

export type ConfirmationState =
    | 'INITIAL' // начальное состояние
    | 'CODE_CHECKING' // проверка кода
    | 'CODE_SENDING' // повторная отправка кода
    | 'CODE_ERROR' // ошибка, когда ввели неверный код
    | 'CODE_EXPIRED' // ошибка, когда код устарел, но можно запросить новый
    | 'CODE_EXPIRED_ENDED'; // ошибка, когда код устарел

export type ScreensMap = {
    [key: string]: ComponentType;
};

export const defaultTexts: ConfirmationTexts = {
    title: 'Введите код из\xa0уведомления',
    codeError: 'Код не подходит, проверьте его',
    codeErrorExpired: 'Код устарел, запросите новый',
    codeErrorExpiredEnded: 'Код устарел',
    codeChecking: '',
    codeSending: '',
    buttonRetry: 'Запросить код',
    hintTitle: 'Не\xa0приходит код?',
    hintDescription: 'Если\xa0сменили номер, позвоните нам или обратитесь в\xa0любой офис банка.',
    hintNotification:
        'Если номер не\xa0меняли, попробуйте запросить код позже — возможно, перегружен сервис отправки уведомлений.',
    linkToHint: 'Не\xa0приходит код?',
    hintButton: 'Вернуться к\xa0вводу кода',
    noAttemptsLeft: 'Не\xa0осталось попыток запроса кода',
    fatalErrorTitle: 'Ввести код больше нельзя',
    fatalErrorDescription:
        'Мы ограничили следующие попытки ввода, потому\xa0что код был введён неверно больше 5 раз.',
    fatalErrorButton: 'Понятно',
    tempBlockTitle: 'Ввести код пока нельзя',
    tempBlockDescription: 'Слишком много неверных попыток. Запросите новый позже',
    tempBlockOverTitle: 'Ввод разблокирован',
    tempBlockOverDescription: 'Теперь можно запросить новый код',
    tempBlockOverButton: 'Запросить новый код',
    codeSended: 'Код отправлен',
    countdown: 'Запросить новый можно через',
    domesticPhone: '8 800 200 00 00',
    internationalPhone: '+7 495 78 888 78',
};
