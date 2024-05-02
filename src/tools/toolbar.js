import Bold from "./../assets/inline/bold.svg"
import Italic from "./../assets/inline/italic.svg"
import Underline from "./../assets/inline/underline.svg"
import Strikethrough from "./../assets/inline/strikethrough.svg"
import Superscript from "./../assets/inline/superscript.svg"
import Subscript from "./../assets/inline/subscript.svg"

import Unordered from "./../assets/list/unordered.svg"
import Ordered from "./../assets/list/ordered.svg"
import Indent from "./../assets/list/indent.svg"
import Outdent from "./../assets/list/outdent.svg"


import Left from "./../assets/textAlign/left.svg"
import Center from "./../assets/textAlign/center.svg"
import Right from "./../assets/textAlign/right.svg"
import Justify from "./../assets/textAlign/justify.svg"

import Color from "./../assets/colorPicker.svg"

import Link from "./../assets/link.svg"
import UnLink from "./../assets/unLink.svg"

import Image from "./../assets/image.svg"

import Undo from "./../assets/undo.svg"
import Redo from "./../assets/redo.svg"




const toolbarOptions = {
    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'image', 'history'],
    inline: {
        options: ["bold", "italic", "underline", "strikethrough", "superscript", "subscript"],
        bold: {
            icon: Bold,
            title: "Жирный"
        },
        italic: { 
            icon: Italic, 
            title: "Курсив"
        },
        underline: { 
            icon: Underline,  
            title: "Подчеркнутый"
        },
        strikethrough: {
            icon: Strikethrough,
            title: "Зачеркнутый"
        },
        superscript: {
            icon: Superscript,
            className: "super"
        },
        subscript: {
            icon: Subscript,
            className: "sub"
        }
    },
    list: {
        unordered: {
            icon: Unordered
        },
        ordered: {
            icon: Ordered
        },
        indent: {
            icon: Indent
        },
        outdent: {
            icon: Outdent
        }
    },
    textAlign: {
        left: {
            icon: Left
        },
        center: {
            icon: Center
        },
        right: {
            icon: Right
        },
        justify: {
            icon: Justify
        }
    },
    colorPicker: {
        icon: Color
    },
    link: {
        defaultTargetOption: '_blank',
        link: {icon: Link},
        unlink: {icon: UnLink}
    },
    image: {
        icon: Image
    },
    history: {
        undo: {
            icon: Undo
        },
        redo: {
            icon: Redo
        }
    }
}

export default toolbarOptions