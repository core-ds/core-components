// Отключаем выбрасывание исключений при созданиии экземпляра RegExp в браузере IE. На функциональность сторибука не влияет.
if (window.MSInputMethodContext && window.document.documentMode) {
    var NativeRegExp = window.RegExp;

    window.RegExp = function(pattern, flags) {
        try {
            return new NativeRegExp(pattern, flags);
        } catch (e) {
            console.error(e.stack);
        }
    };

    window.RegExp.prototype = NativeRegExp.prototype;
}
