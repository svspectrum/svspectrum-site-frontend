import type { ShowdownExtension } from "showdown";

export function extension() : ShowdownExtension[] {
    return [
        {
            type: 'output',
            regex: /(<a.*?) ?(href=".*?\/backend\/.*?">)/g,
            replace: '$1 rel="external" $2'
        },
        {
            type: 'output',
            regex: /(<img .*?)alt="L:(.*?)"(.*?>)/g,
            replace: '$1alt="$2" class="left"$3'
        },
        {
            type: 'output',
            regex: /(<img .*?)alt="R:(.*?)"(.*?>)/g,
            replace: '$1alt="$2" class="right"$3'
        },
    ]
}