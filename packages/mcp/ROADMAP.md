# ROADMAP

## Стандартизировать entry point для каждого компонента

Сейчас встречаются такие варианты
```js
    'packages/*/src/Component.tsx',
    'packages/*/src/Component.ts',
    'packages/*/src/component.tsx',
    'packages/*/src/Component.responsive.tsx',
    'packages/*/src/component.responsive.tsx'
```

Также для `icon-view` в принципе нет входной точки в корне пакета
