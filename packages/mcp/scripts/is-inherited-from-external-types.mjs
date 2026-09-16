/**
 * Определяет, является ли пропс унаследованным из внешних типов.
 * Необходимо для того, чтобы не добавлять множество наследуемых пропсов, а обрабатывать только те, что заданы напрямую
 */
export function isInheritedFromExternalTypes(prop) {
    const parentFile = prop.parent?.fileName;

    if (!parentFile) {
        return false;
    }

    if (parentFile.includes('node_modules/@types/react')) {
        return true;
    }

    if (parentFile.includes('node_modules/@types/react-dom')) {
        return true;
    }

    return false;
}
