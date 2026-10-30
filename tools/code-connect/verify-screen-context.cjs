const fs = require('node:fs');
const ts = require('typescript');

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const isText = (value) => typeof value === 'string' && value.trim().length > 0;
const normalizeId = (value) => String(value).replace(/(\d+)-(\d+)/g, '$1:$2');
const jsxName = (node, source) => node.tagName.getText(source);

function callableBody(declaration) {
    if (ts.isFunctionDeclaration(declaration)) return declaration.body;
    if (!ts.isVariableDeclaration(declaration)) return undefined;
    let expression = declaration.initializer;

    while (expression && ts.isParenthesizedExpression(expression))
        expression = expression.expression;

    return expression && (ts.isArrowFunction(expression) || ts.isFunctionExpression(expression))
        ? expression.body
        : undefined;
}

function openingMarkerEnd(code, start) {
    let quote = null;
    let escaped = false;
    let braces = 0;

    for (let index = start; index < code.length; index += 1) {
        const char = code[index];

        if (quote) {
            if (escaped) escaped = false;
            else if (char === '\\') escaped = true;
            else if (char === quote) quote = null;
        } else if (char === '"' || char === "'" || char === '`') quote = char;
        else if (char === '{') braces += 1;
        else if (char === '}') braces -= 1;
        else if (char === '>' && braces === 0) return index + 1;
    }

    return null;
}

function markerHeader(header) {
    const selfClosing = /\/\s*>$/.test(header);
    const expression = selfClosing ? header : `${header.slice(0, -1)}/>`;
    const source = ts.createSourceFile(
        'marker.tsx',
        `const marker = ${expression};`,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
    );

    if (source.parseDiagnostics.length) return null;
    const node = source.statements[0]?.declarationList?.declarations[0]?.initializer;

    if (
        !node ||
        !ts.isJsxSelfClosingElement(node) ||
        node.tagName.getText(source) !== 'CodeConnectSnippet'
    )
        return null;
    const attribute = node.attributes.properties.find(
        (item) => ts.isJsxAttribute(item) && item.name.getText(source) === 'data-node-id',
    );
    let value = attribute?.initializer;

    if (value && ts.isJsxExpression(value)) value = value.expression;

    return value && ts.isStringLiteralLike(value)
        ? { nodeId: normalizeId(value.text), selfClosing }
        : null;
}

function literalRanges(code) {
    const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.JSX, code);
    const kinds = new Set([
        ts.SyntaxKind.StringLiteral,
        ts.SyntaxKind.NoSubstitutionTemplateLiteral,
        ts.SyntaxKind.TemplateHead,
        ts.SyntaxKind.TemplateMiddle,
        ts.SyntaxKind.TemplateTail,
        ts.SyntaxKind.SingleLineCommentTrivia,
        ts.SyntaxKind.MultiLineCommentTrivia,
    ]);
    const ranges = [];
    let kind = scanner.scan();

    while (kind !== ts.SyntaxKind.EndOfFileToken) {
        if (kinds.has(kind))
            ranges.push({ start: scanner.getTokenPos(), end: scanner.getTextPos() });
        kind = scanner.scan();
    }

    return ranges;
}

function ambiguousPayloadBoundary(payload) {
    const source = ts.createSourceFile(
        'payload.tsx',
        payload,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
    );
    const unterminated = new Set([1002, 1010, 1160, 1161]);

    if (source.parseDiagnostics.some((diagnostic) => unterminated.has(diagnostic.code)))
        return true;
    const scanner = ts.createScanner(
        ts.ScriptTarget.Latest,
        false,
        ts.LanguageVariant.JSX,
        payload,
    );
    let kind = scanner.scan();
    let last = null;

    while (kind !== ts.SyntaxKind.EndOfFileToken) {
        last = { kind, end: scanner.getTextPos() };
        kind = scanner.scan();
    }

    // A protocol delimiter inside a line comment is indistinguishable from its literal text.
    return last?.kind === ts.SyntaxKind.SingleLineCommentTrivia && last.end === payload.length;
}

function isStandalonePayload(payload) {
    const scanner = ts.createScanner(ts.ScriptTarget.Latest, true, ts.LanguageVariant.JSX, payload);
    const modifiers = new Set([
        ts.SyntaxKind.ExportKeyword,
        ts.SyntaxKind.DefaultKeyword,
        ts.SyntaxKind.AsyncKeyword,
    ]);
    const declarations = new Set([
        ts.SyntaxKind.FunctionKeyword,
        ts.SyntaxKind.TypeKeyword,
        ts.SyntaxKind.InterfaceKeyword,
        ts.SyntaxKind.ConstKeyword,
        ts.SyntaxKind.LetKeyword,
        ts.SyntaxKind.ClassKeyword,
    ]);
    let kind = scanner.scan();

    while (modifiers.has(kind)) kind = scanner.scan();

    return declarations.has(kind);
}

/**
 * Separate only declared raw contextual payloads from the MCP marker protocol.
 * This is a framing operation, not code execution or API validation. On ambiguous
 * delimiters it returns the original string and no payloads; callers must reject errors.
 */
function extractContextualPayloads(code, expectedContextualIds) {
    const ids = new Set([...expectedContextualIds].map(normalizeId));
    const errors = [];
    const payloads = [];
    const ranges = literalRanges(code);
    const opening = /<CodeConnectSnippet\b/g;
    const closing = /<\/CodeConnectSnippet\s*>/g;
    const replacements = [];
    const seen = new Set();
    let match = opening.exec(code);

    while (match) {
        const start = match.index;
        const inLiteral = ranges.some((range) => start >= range.start && start < range.end);
        const end = openingMarkerEnd(code, start);
        const header = end ? markerHeader(code.slice(start, end)) : null;

        if (!inLiteral && header && ids.has(header.nodeId) && !header.selfClosing) {
            closing.lastIndex = end;
            const close = closing.exec(code);

            if (close) {
                const payload = code.slice(end, close.index);
                const standalone = isStandalonePayload(payload);

                if (standalone) {
                    if (
                        /<\/?CodeConnectSnippet\b/.test(payload) ||
                        ambiguousPayloadBoundary(payload)
                    )
                        errors.push({
                            kind: 'ambiguous-contextual-boundary',
                            nodeId: header.nodeId,
                        });
                    else if (seen.has(header.nodeId))
                        errors.push({ kind: 'duplicate-contextual-marker', nodeId: header.nodeId });
                    else {
                        seen.add(header.nodeId);
                        payloads.push({ nodeId: header.nodeId, code: payload });
                        replacements.push({ start: end, end: close.index });
                    }
                    opening.lastIndex = close.index + close[0].length;
                }
            } else errors.push({ kind: 'unclosed-contextual-marker', nodeId: header.nodeId });
        }
        match = opening.exec(code);
    }
    if (errors.length) return { skeleton: code, payloads: [], errors };
    let skeleton = '';
    let position = 0;

    for (const replacement of replacements) {
        skeleton += code.slice(position, replacement.start);
        position = replacement.end;
    }
    skeleton += code.slice(position);

    return { skeleton, payloads, errors };
}

function analyze(code) {
    const file = 'captured-context.tsx';
    const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const host = {
        getSourceFile: (name) => (name === file ? source : undefined),
        getDefaultLibFileName: () => '',
        writeFile() {},
        getCurrentDirectory: () => '',
        getDirectories: () => [],
        fileExists: (name) => name === file,
        readFile: (name) => (name === file ? code : undefined),
        getCanonicalFileName: (name) => name,
        useCaseSensitiveFileNames: () => true,
        getNewLine: () => '\n',
    };
    const program = ts.createProgram(
        [file],
        {
            jsx: ts.JsxEmit.Preserve,
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2021,
            noResolve: true,
            noLib: true,
        },
        host,
    );
    const checker = program.getTypeChecker();
    const imports = [];
    const markers = [];
    const attributes = [];
    const dynamicImports = [];

    function visit(node) {
        if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
            const clause = node.importClause;
            const bindings = clause?.namedBindings;
            const named =
                bindings && ts.isNamedImports(bindings)
                    ? bindings.elements.map((item) => ({
                          exported: item.propertyName?.text || item.name.text,
                          local: item.name.text,
                          typeOnly: Boolean(clause.isTypeOnly || item.isTypeOnly),
                          symbol: checker.getSymbolAtLocation(item.name),
                      }))
                    : [];

            imports.push({ module: node.moduleSpecifier.text, named });
        }
        if (
            ts.isCallExpression(node) &&
            node.arguments.length &&
            (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
                (ts.isIdentifier(node.expression) && node.expression.text === 'require')) &&
            ts.isStringLiteral(node.arguments[0])
        )
            dynamicImports.push(node.arguments[0].text);
        if (ts.isJsxAttribute(node)) attributes.push(node);
        if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
            const opening = ts.isJsxElement(node) ? node.openingElement : node;

            if (jsxName(opening, source) === 'CodeConnectSnippet') {
                const attribute = opening.attributes.properties.find(
                    (item) =>
                        ts.isJsxAttribute(item) && item.name.getText(source) === 'data-node-id',
                );
                let value = attribute?.initializer;

                if (value && ts.isJsxExpression(value)) value = value.expression;
                markers.push({
                    node,
                    id: value && ts.isStringLiteralLike(value) ? normalizeId(value.text) : null,
                });
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(source);

    function reachable(container, followHelpers) {
        const jsx = [];
        const visited = new Set();

        function walk(node) {
            // Merely declaring a helper does not make its body reachable from the marker.
            if (
                ts.isFunctionDeclaration(node) ||
                (ts.isVariableDeclaration(node) && callableBody(node))
            )
                return;
            if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
                jsx.push(node);
                if (followHelpers && ts.isIdentifier(node.tagName)) {
                    const symbol = checker.getSymbolAtLocation(node.tagName);

                    for (const declaration of symbol?.declarations || []) {
                        const body = callableBody(declaration);

                        if (body && !visited.has(body)) {
                            visited.add(body);
                            walk(body);
                        }
                    }
                }
            }
            ts.forEachChild(node, walk);
        }
        walk(container);

        return jsx;
    }

    function matches(jsx, binding, memberPath = '') {
        if (jsxName(jsx, source) !== binding.local + memberPath) return false;
        let root = jsx.tagName;

        while (ts.isPropertyAccessExpression(root)) root = root.expression;

        return ts.isIdentifier(root) && checker.getSymbolAtLocation(root) === binding.symbol;
    }

    return {
        source,
        imports,
        dynamicImports,
        attributes,
        markers,
        reachable,
        matches,
        syntax: program.getSyntacticDiagnostics(source),
        entryBodies(name) {
            return source.statements.flatMap((statement) => {
                if (ts.isFunctionDeclaration(statement) && statement.name?.text === name)
                    return statement.body ? [statement.body] : [];
                if (!ts.isVariableStatement(statement)) return [];

                return statement.declarationList.declarations
                    .filter(
                        (declaration) =>
                            ts.isIdentifier(declaration.name) && declaration.name.text === name,
                    )
                    .map(callableBody)
                    .filter(Boolean);
            });
        },
    };
}

function namedBindings(analysis, module, exported) {
    return analysis.imports
        .filter((item) => item.module === module)
        .flatMap((item) => item.named)
        .filter((item) => item.exported === exported && !item.typeOnly);
}

function stripComments(code) {
    const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.JSX, code);
    let clean = '';
    let kind;

    do {
        kind = scanner.scan();
        if (kind === ts.SyntaxKind.EndOfFileToken) break;
        const token = scanner.getTokenText();

        clean +=
            kind === ts.SyntaxKind.SingleLineCommentTrivia ||
            kind === ts.SyntaxKind.MultiLineCommentTrivia
                ? token.replace(/[^\r\n]/g, ' ')
                : token;
    } while (kind !== ts.SyntaxKind.EndOfFileToken);

    return clean;
}

function validProfile(profile) {
    return (
        isObject(profile) &&
        isObject(profile.figma) &&
        isText(profile.figma.fileKey) &&
        isText(profile.figma.nodeId) &&
        isObject(profile.theme) &&
        isText(profile.theme.name) &&
        isText(profile.theme.colorMode) &&
        isText(profile.theme.palette) &&
        isObject(profile.dependencies) &&
        isObject(profile.dependencies.runtime) &&
        isText(profile.dependencies.runtime.package) &&
        isText(profile.dependencies.runtime.version) &&
        isObject(profile.dependencies.react) &&
        isText(profile.dependencies.react.package) &&
        isText(profile.dependencies.react.version) &&
        typeof profile.fullFrameRequired === 'boolean' &&
        Array.isArray(profile.nodes) &&
        profile.nodes.length > 0
    );
}

function hasNodeIdentity(node) {
    return (
        isObject(node) && isText(node.nodeId) && isText(node.component) && isText(node.importPath)
    );
}

function validNode(node) {
    return (
        hasNodeIdentity(node) &&
        (node.contextual === undefined || typeof node.contextual === 'boolean') &&
        (node.nested === undefined || typeof node.nested === 'boolean')
    );
}

function indexProfile(expected, add) {
    const ids = new Set();
    const assets = new Map();

    expected.forEach((node) => {
        if (!validNode(node)) {
            add(
                'profile',
                'invalid-node-profile',
                'У каждого узла нужны nodeId, component и importPath',
            );

            return;
        }
        const id = normalizeId(node.nodeId);

        if (ids.has(id)) add('profile', 'duplicate-profile-node', 'Повтор nodeId в профиле', id);
        ids.add(id);
        if (node.childImport === undefined) return;
        if (isText(node.childImport)) {
            const parsed = analyze(node.childImport);
            const declarations = parsed.imports.flatMap((item) =>
                item.named
                    .filter((binding) => !binding.typeOnly)
                    .map((binding) => ({ module: item.module, exported: binding.exported })),
            );
            const importsOnly = parsed.source.statements.every((statement) =>
                ts.isImportDeclaration(statement),
            );

            if (parsed.syntax.length || declarations.length === 0 || !importsOnly)
                add(
                    'profile',
                    'invalid-child-import',
                    'childImport должен содержать корректный named import значения',
                    id,
                );
            else assets.set(id, declarations);
        } else
            add(
                'profile',
                'invalid-child-import',
                'childImport должен быть строкой named import',
                id,
            );
    });

    return { ids, assets };
}

function indexCapture(values, ids, add, warnings) {
    const captured = new Map();

    values.forEach((node) => {
        if (!isObject(node) || !isText(node.nodeId)) {
            add('capture', 'invalid-captured-node', 'У записи capture отсутствует nodeId');

            return;
        }
        const id = normalizeId(node.nodeId);

        if (captured.has(id))
            add('capture', 'duplicate-captured-node', 'Повтор nodeId в capture', id);
        else captured.set(id, node);
        if (!ids.has(id)) warnings.push({ kind: 'unexpected-captured-node', nodeId: id });
    });

    return captured;
}

function validateCaptureIdentity(capture, profile, add) {
    if (
        capture.fileKey !== profile.figma.fileKey ||
        normalizeId(capture.nodeId) !== normalizeId(profile.figma.nodeId)
    )
        add(
            'capture',
            'figma-identity-mismatch',
            'Файл или корневой узел capture не соответствует профилю',
        );
    if (capture.clientFrameworks !== 'React')
        add('capture', 'framework-mismatch', 'Для этого профиля нужен clientFrameworks=React');
}

function validateScreenContext(capture, profile) {
    const failures = [];
    const warnings = [];
    const nodes = [];
    const payloadChecks = [];
    const rawTsxDiagnostics = [];
    const add = (scope, kind, message, nodeId) =>
        failures.push({ scope, kind, message, ...(nodeId ? { nodeId } : {}) });
    const profileValid = validProfile(profile);

    if (!profileValid)
        add(
            'profile',
            'invalid-profile',
            'Нужны figma, полная theme, версии runtime/React, непустые nodes и fullFrameRequired',
        );
    const expected = profileValid ? profile.nodes : [];
    const { ids, assets } = indexProfile(expected, add);
    const captureValid = isObject(capture) && Array.isArray(capture.nodes);

    if (!captureValid) add('capture', 'invalid-capture', 'Нужен capture с массивом nodes');
    if (profileValid && captureValid) validateCaptureIdentity(capture, profile, add);
    const captured = indexCapture(captureValid ? capture.nodes : [], ids, add, warnings);

    function inspectCode(code, scope, nodeId, syntaxKind = 'invalid-tsx-structure') {
        if (!isText(code)) {
            add(scope, 'missing-code', 'Не получен непустой код get_design_context', nodeId);

            return null;
        }
        if (
            !code.includes('CodeConnectSnippet') &&
            /missing code connect mappings|some figma design components are not connected|would you like to connect code components/i.test(
                code,
            )
        ) {
            add(
                scope,
                'connection-gate',
                'Вместо кода получено предложение настроить связи',
                nodeId,
            );

            return null;
        }
        if (
            /Code Connect Logic Instance|no Code Connect template found|cannot be rendered/i.test(
                code,
            )
        )
            add(
                scope,
                'unresolved-code-connect',
                'В коде осталась служебная заглушка Code Connect',
                nodeId,
            );
        const parsed = analyze(code);
        const modules = [...parsed.imports.map((item) => item.module), ...parsed.dynamicImports];

        if (modules.some((module) => /^(?:packages\/|\.\.?\/|\/|https?:\/\/)/.test(module)))
            add(
                scope,
                'source-import',
                'Обнаружен импорт из исходников, относительного пути или удалённого URL',
                nodeId,
            );
        const clean = stripComments(code);

        if (
            profileValid &&
            profile.theme.name === 'Default' &&
            (modules.some((module) => /(?:^|\/)corp\.css(?:[?#]|$)/i.test(module)) ||
                /@import\s+(?:url\(\s*)?(?:['"][^'"\n]*\bcorp\.css\b|[^\s;)"']*\bcorp\.css\b)/i.test(
                    clean,
                ))
        )
            add(
                scope,
                'corp-theme-in-default',
                'Профиль Default не допускает подключение Corp CSS',
                nodeId,
            );
        const fallbackProps = new Set([
            'filledstate',
            'activestate',
            'disabledstate',
            'errorstate',
            'outerlabel',
            'singleicon',
        ]);

        if (
            /[↳↪][\s\p{L}\p{N}_-]*=/u.test(clean) ||
            parsed.attributes.some((attribute) =>
                fallbackProps.has(attribute.name.getText(parsed.source).toLowerCase()),
            )
        )
            add(
                scope,
                'figma-property-fallback',
                'В JSX остались свойства Figma вместо API компонента',
                nodeId,
            );
        if (parsed.syntax.length)
            add(
                scope,
                syntaxKind,
                `Синтаксис контекста содержит ошибок: ${parsed.syntax.length}`,
                nodeId,
            );

        return parsed;
    }

    function inspectProtocol(code, scope, nodeId) {
        if (!isText(code)) return inspectCode(code, scope, nodeId);
        const contextualIds = expected
            .filter((node) => validNode(node) && node.contextual)
            .map((node) => node.nodeId);
        const extracted = extractContextualPayloads(code, contextualIds);

        for (const error of extracted.errors)
            add(
                scope,
                error.kind,
                'Неоднозначные или незакрытые границы contextual payload',
                error.nodeId,
            );
        const parsed = inspectCode(extracted.skeleton, scope, nodeId);

        if (!parsed) return null;
        if (extracted.payloads.length)
            rawTsxDiagnostics.push({
                scope,
                ...(nodeId ? { nodeId } : {}),
                count: analyze(code).syntax.length,
            });
        parsed.contextualPayloads = new Map(
            extracted.payloads.map((payload) => [payload.nodeId, payload]),
        );

        return parsed;
    }

    function contextualContent(parsed, payload, scope, id) {
        const actualImports = parsed.source.statements
            .filter((statement) => ts.isImportDeclaration(statement))
            .map((statement) => statement.getText(parsed.source))
            .join('\n');
        const content = inspectCode(
            `${actualImports}\n${payload.code}`,
            'contextualPayload',
            id,
            'invalid-contextual-payload',
        );
        const bodies = content?.entryBodies('Example') || [];

        if (bodies.length !== 1)
            add(
                scope,
                'missing-contextual-entry',
                'Payload должен объявлять ровно один callable Example',
                id,
            );
        const reachable = content && bodies.length === 1 ? content.reachable(bodies[0], true) : [];

        return { content, reachable };
    }

    function inspectExpected(parsed, node, scope) {
        const id = normalizeId(node.nodeId);
        const [exported, ...members] = node.component.split('.');
        const memberPath = members.length ? `.${members.join('.')}` : '';
        const bindings = namedBindings(parsed, node.importPath, exported);

        if (!bindings.length)
            add(
                scope,
                'missing-component-import',
                `Нет named import ${exported} из ${node.importPath}`,
                id,
            );
        const markers = parsed.markers.filter((marker) => marker.id === id);

        if (!markers.length)
            add(scope, 'missing-node-marker', 'Нет CodeConnectSnippet с нужным data-node-id', id);
        const payload = parsed.contextualPayloads?.get(id);
        const payloadStart = failures.length;
        let content = parsed;
        let reachable;

        if (payload) {
            ({ content, reachable } = contextualContent(parsed, payload, scope, id));
        } else
            reachable = markers.flatMap((marker) =>
                parsed.reachable(marker.node, node.contextual === true),
            );
        const contentBindings = content ? namedBindings(content, node.importPath, exported) : [];

        if (
            markers.length &&
            !reachable.some((jsx) =>
                contentBindings.some((binding) => content.matches(jsx, binding, memberPath)),
            )
        )
            add(
                scope,
                'missing-connected-jsx',
                `В marker недостижим ${node.component}${node.contextual ? ' через Example или именованные helpers' : ' как прямой JSX'}`,
                id,
            );
        if (assets.has(id)) {
            const assetBindings = [];

            for (const asset of assets.get(id)) {
                const found = content ? namedBindings(content, asset.module, asset.exported) : [];

                if (!found.length)
                    add(
                        scope,
                        'missing-child-import',
                        `Нет named import ${asset.exported} из ${asset.module}`,
                        id,
                    );
                assetBindings.push(...found);
            }
            const assetJsx = payload
                ? reachable
                : markers.flatMap((marker) => parsed.reachable(marker.node, true));

            if (assetJsx.some((jsx) => jsxName(jsx, content.source) === 'svg'))
                add(
                    scope,
                    'inline-svg-asset',
                    'Вместо пакетной иконки используется inline SVG в достижимом коде marker',
                    id,
                );
            if (
                assetBindings.length &&
                !assetJsx.some((jsx) =>
                    assetBindings.some((binding) => content.matches(jsx, binding)),
                )
            )
                add(
                    scope,
                    'unused-child-import',
                    'Пакетная иконка импортирована, но не используется в достижимом JSX marker',
                    id,
                );
        }
        if (payload)
            payloadChecks.push({
                scope,
                nodeId: id,
                status: failures.length === payloadStart ? 'passed' : 'failed',
            });
    }

    expected.forEach((node) => {
        if (!hasNodeIdentity(node)) return;
        const id = normalizeId(node.nodeId);
        const start = failures.length;
        const value = captured.get(id);

        if (value) {
            const parsed = inspectProtocol(value.code, 'node', id);

            if (parsed) inspectExpected(parsed, node, 'node');
        } else add('node', 'missing-captured-node', 'Узел профиля отсутствует в capture', id);
        nodes.push({
            nodeId: id,
            component: node.component,
            contextual: node.contextual === true,
            nested: node.nested === true,
            status: failures.length === start ? 'passed' : 'failed',
        });
    });
    const fullRequired = profileValid && profile.fullFrameRequired;
    const fullPresent = isText(capture?.fullFrame?.code);
    const fullStart = failures.length;
    const topLevel = expected.filter((node) => isObject(node) && node.nested !== true);

    if (fullRequired || fullPresent) {
        const full = inspectProtocol(capture?.fullFrame?.code, 'fullFrame');

        if (full)
            for (const node of topLevel)
                if (hasNodeIdentity(node)) inspectExpected(full, node, 'fullFrame');
    }
    const contextual = nodes.filter((node) => node.contextual).map((node) => node.nodeId);
    let fullStatus = 'not-required';

    if (fullRequired || fullPresent)
        fullStatus = failures.length === fullStart ? 'passed' : 'failed';

    return {
        status: failures.length ? 'failed' : 'passed',
        scope: 'structure-and-imports',
        rawContextIsReadyApplication: false,
        contextualPayloadsValidatedSeparately: {
            checked: payloadChecks.length,
            passed: payloadChecks.filter((item) => item.status === 'passed').length,
            nodeIds: [...new Set(payloadChecks.map((item) => item.nodeId))],
        },
        rawTsxDiagnostics,
        expectedNodes: expected.length,
        capturedExpectedNodes: nodes.filter((node) => captured.has(node.nodeId)).length,
        passedNodes: nodes.filter((node) => node.status === 'passed').length,
        expectedTopLevelNodes: topLevel.length,
        expectedNestedNodes: expected.length - topLevel.length,
        contextualNodes: contextual.length,
        requiresProductContext: contextual,
        fullFrame: {
            required: Boolean(fullRequired),
            present: fullPresent,
            status: fullStatus,
        },
        limitations: {
            typeScriptApiChecked: false,
            visualChecked: false,
            resolvedThemeChecked: false,
        },
        nodes,
        failures,
        warnings,
    };
}

function main() {
    const args = process.argv.slice(2);
    const usage =
        'node tools/code-connect/verify-screen-context.cjs --capture capture.json --profile profile.json [--output report.json]';

    if (args.includes('--help')) {
        process.stdout.write(`${usage}\n`);

        return;
    }
    const options = {};

    for (let i = 0; i < args.length; i += 2) {
        if (
            !['--capture', '--profile', '--output'].includes(args[i]) ||
            !args[i + 1] ||
            options[args[i]]
        )
            throw new Error(usage);
        options[args[i]] = args[i + 1];
    }
    if (!options['--capture'] || !options['--profile']) throw new Error(usage);
    const capture = JSON.parse(fs.readFileSync(options['--capture'], 'utf8'));
    const profile = JSON.parse(fs.readFileSync(options['--profile'], 'utf8'));
    const result = validateScreenContext(capture, profile);
    const json = `${JSON.stringify(result, null, 2)}\n`;

    if (options['--output']) fs.writeFileSync(options['--output'], json);
    process.stdout.write(json);
    if (result.status !== 'passed') process.exitCode = 1;
}

module.exports = { validateScreenContext, extractContextualPayloads };
if (require.main === module) {
    try {
        main();
    } catch (error) {
        process.stdout.write(
            `${JSON.stringify({
                status: 'failed',
                scope: 'input',
                error:
                    error.code ||
                    (String(error.message).startsWith('node tools/')
                        ? error.message
                        : 'Не удалось прочитать входные JSON'),
            })}\n`,
        );
        process.exitCode = 1;
    }
}
