import { Node, SyntaxKind } from 'ts-morph';

/**
 * Разворачивает цепочку алиасов (import/re-export) до реальной декларации —
 * react-docgen-typescript репортит компонент по внутреннему имени, а не по алиасу,
 * поэтому для парсинга нужна именно исходная декларация, а не символ реэкспорта
 */
function resolveAliasedDeclaration(symbol) {
    let current = symbol;

    for (let guard = 0; current?.isAlias() && guard < 10; guard += 1) {
        current = current.getAliasedSymbol();
    }

    return current?.getDeclarations()?.[0];
}

/**
 * У shorthand-свойств (`Header,`) getSymbol() на самом узле возвращает служебный
 * "property"-символ объекта, а не символ переменной — нужен именно getValueSymbol()
 */
function getValueSymbol(property) {
    if (Node.isShorthandPropertyAssignment(property)) {
        return property.getValueSymbol();
    }

    if (Node.isPropertyAssignment(property)) {
        return property.getInitializer()?.getSymbol();
    }

    return undefined;
}

function isObjectAssignCall(node) {
    return Node.isCallExpression(node) && node.getExpression().getText() === 'Object.assign';
}

function collectFromObjectAssign(callExpr) {
    const objectLiteral = callExpr.getArguments()[1];

    if (!objectLiteral || !Node.isObjectLiteralExpression(objectLiteral)) {
        return {};
    }

    const result = {};

    objectLiteral.getProperties().forEach((property) => {
        if (!Node.isPropertyAssignment(property) && !Node.isShorthandPropertyAssignment(property)) {
            return;
        }

        const key = property.getName();
        const declaration = resolveAliasedDeclaration(getValueSymbol(property));

        if (!declaration) {
            return;
        }

        result[key] = {
            file: declaration.getSourceFile().getFilePath(),
            sourceName: declaration.getSymbol()?.getName() ?? key,
        };
    });

    return result;
}

/**
 * Ищет compound-подкомпоненты (Header/Content/Footer и т. п.), прикреплённые к
 * главному компоненту через `Object.assign(Main, { Header, Content, ... })`.
 */
export function getCompoundSubComponents(mainDeclaration) {
    const initializer = mainDeclaration.getInitializer?.();

    /*
     * Кейс 1: сама декларация и есть Object.assign —
     * `export const X = Object.assign(Y, {...})`
     */
    if (initializer && isObjectAssignCall(initializer)) {
        return collectFromObjectAssign(initializer);
    }

    /*
     * Кейс 2 (сейчас нужен только universal-modal): compound собран
     * не в самой mainDeclaration, а в соседнем экспорте того же файла —
     * файл экспортирует и голый `UniversalModal`, и
     * `UniversalModalResponsive = Object.assign(UniversalModal, {...})`.
     * Резолвинг по имени пакета попадает на голый компонент, поэтому здесь
     * сканируем весь файл в поисках Object.assign, первый аргумент которого
     * указывает на ту же mainDeclaration
     */
    const assignCalls = mainDeclaration
        .getSourceFile()
        .getDescendantsOfKind(SyntaxKind.CallExpression)
        .filter(isObjectAssignCall);

    const sameDeclarationAssign = assignCalls.find((call) => {
        const firstArgDeclaration = resolveAliasedDeclaration(call.getArguments()[0]?.getSymbol());

        return (
            firstArgDeclaration &&
            firstArgDeclaration.getStart() === mainDeclaration.getStart() &&
            firstArgDeclaration.getSourceFile() === mainDeclaration.getSourceFile()
        );
    });

    return sameDeclarationAssign ? collectFromObjectAssign(sameDeclarationAssign) : {};
}
