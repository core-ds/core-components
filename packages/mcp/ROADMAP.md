# ROADMAP

## Стандартизировать entry point для каждого компонента

Сейчас встречаются такие варианты

```json
[
    "packages/*/src/Component.tsx",
    "packages/*/src/Component.ts",
    "packages/*/src/component.tsx",
    "packages/*/src/Component.responsive.tsx",
    "packages/*/src/component.responsive.tsx"
]
```

Также для `icon-view` в принципе нет входной точки в корне пакета

## Проработать генерацию пропсов

Сейчас пропсы берутся из компонента, который находится в entry point пакета. Необходимо брать пропсы всех подкомпонентов, так как это тоже api, и агент должен о них знать

```jsx
<ArgsTabs
    components={{
        'UniversalModal.Header': UniversalModal.Header,
        'UniversalModal.Content': UniversalModal.Content,
        'UniversalModal.Footer': UniversalModal.Footer,
    }}
/>
```

## Обработка deprecate компонентов

На данный момент исключил из генерации компоненты deprecate секции. В следующих итерациях нужно будет решить, что с ними делать - собирать данные по ним или нет

## Описание компонента

Сейчас забираем из children простой регуляркой. Стоит в дальнейшем рассмотреть более детерминированные способы получения description компонента

```mdxjs
<ComponentHeader
    name='Accordion'
    children='Используется для отображения скрытого контента по клику.'
/>
```
