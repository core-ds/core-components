import { fromMarkdown, toMarkdown } from 'mdast-util-gfm-strikethrough';
import gfmStrikethroughExtension from 'micromark-extension-gfm-strikethrough';

function strikethroughToMarkdown() {
    return {
        extensions: [toMarkdown],
    };
}

type ThisType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: () => Record<string, any>;
};

export function strikethroughRemarkPlugin(this: ThisType) {
    const data = this.data();

    const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
    const fromMarkdownExtensions =
        data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
    const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);

    micromarkExtensions.push(gfmStrikethroughExtension({ singleTilde: false }));
    fromMarkdownExtensions.push(fromMarkdown);
    toMarkdownExtensions.push(strikethroughToMarkdown());
}
