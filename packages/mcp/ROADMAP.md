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

## Обработка deprecate компонентов и их кандидатов

На данный момент исключил из генерации компоненты deprecate секции, а также те, которые ими станут в будущем (например для modal и side-panel есть альтернатива в виде universal-modal). В следующих итерациях нужно будет решить, что мы с ними делать - собирать данные по ним или нет
