# iOS Safari: скачок при первом фокусе на `<input>` внутри `position: fixed`

При первом фокусе на `<input>` внутри полноэкранного `position: fixed` контейнера на iOS Safari
появление клавиатуры вызывает скачок вьюпорта — известное и регрессирующее ограничение WebKit.

Повторные скачки (второй и все последующие фокусы в рамках одной сессии открытия панели)
устранены в этом PR. Остаётся только самый первый скачок — для него точечного фикса нет, и в
демонстрационном видео вместо этого применён workaround: перед открытием фиксируем скролл
страницы наверху, после закрытия возвращаем позицию обратно.

```tsx
const OPEN_DELAY_MS = 100;

const handleOpenSidePanel = () => {
    scrollPositionBeforeOpenRef.current = window.scrollY;
    window.scrollTo(0, window.scrollY);
    setTimeout(() => setOpenSidePanel(true), OPEN_DELAY_MS);
};

const handleCloseSidePanel = () => {
    window.scrollTo(0, scrollPositionBeforeOpenRef.current);
    setOpenSidePanel(false);
};

React.useEffect(() => {
    if (!openSidePanel) {
        return;
    }

    window.scrollTo(0, 0);
}, [openSidePanel]);
```

## Источники

- [WebKit Bugzilla #153224](https://bugs.webkit.org/show_bug.cgi?id=153224)
- [W3C CSSWG issue #7475](https://github.com/w3c/csswg-drafts/issues/7475)
- [floating-ui issue #3362](https://github.com/floating-ui/floating-ui/issues/3362)
- [WebKit Bugzilla #218465](https://bugs.webkit.org/show_bug.cgi?id=218465)
- [Apple Developer Forums #824765](https://developer.apple.com/forums/thread/824765)
- [Apple Developer Forums #800154](https://developer.apple.com/forums/thread/800154)

