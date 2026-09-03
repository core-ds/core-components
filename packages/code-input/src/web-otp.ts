/**
 * Единый Web OTP-овнер.
 *
 * Web OTP — одна системная интеракция на страницу (в Chromium новый
 * Navigator.credentials.get вытесняет предыдущий запрос). Поэтому вместо того,
 * чтобы каждый CodeInput запускал собственный get, держим ровно один активный
 * запрос и раздаём полученный код всем живым подписчикам.
 *
 * Важно: овнер НЕ вызывает AbortController.abort() при отписке. Преждевременный
 * abort на незавершённой OTP-интеракции ломает Mojo-контракт
 * (WebOTPService::Abort() при callback_ == null → bad Mojo message) и роняет
 * render-процесс в Chromium/Яндекс Браузере. Вместо этого просто убираем
 * подписчика из списка: полученный код и так не будет применён к нему.
 */
import { type CredentialOtp, type CredentialRequestOtpOptions } from './typings';

type OtpSubscriber = (code: string) => void;

const subscribers = new Set<OtpSubscriber>();

/**
 * Подписывает компонент на результат единого Web OTP-запроса.
 * Полученный код будет передан всем живым подписчикам.
 * При отписке общий запрос не абортим — просто игнорируем дальнейшие вызовы.
 */
export function subscribeWebOtp(onCode: OtpSubscriber): () => void {
    const isOtpSupported = 'OTPCredential' in window && Boolean(navigator?.credentials?.get);

    if (!isOtpSupported) {
        return () => undefined;
    }

    subscribers.add(onCode);
    startOtpRequest();

    return () => {
        subscribers.delete(onCode);
    };
}

let requestStarted = false;

async function startOtpRequest(): Promise<void> {
    if (requestStarted) {
        return;
    }

    requestStarted = true;

    const options: CredentialRequestOtpOptions = {
        otp: { transport: ['sms'] },
    };

    try {
        const otp: CredentialOtp | null = await navigator.credentials.get(options);
        const code = otp?.code;

        if (typeof code !== 'string') {
            return;
        }

        subscribers.forEach((subscriber) => {
            try {
                subscriber(code);
            } catch {
                // Игнорируем ошибки отдельных подписчиков.
            }
        });
    } catch {
        // Отклонение запроса (таймаут/отмена браузером) — игнорируем.
    } finally {
        /*
         * Запрос завершён: позволяем переиспользовать объект
         * для последующей подписки (новый цикл SMS).
         */
        requestStarted = false;
    }
}
