"use client"; // Ensures EditorJS runs only in the browser

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import CodeTool from "@editorjs/code";
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import Table from "@editorjs/table";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Paragraph from "@editorjs/paragraph";
import Warning from "@editorjs/warning";
import AttachesTool from "@editorjs/attaches";
import RawTool from "@editorjs/raw";
import Underline from "@editorjs/underline";
import ColorPicker from "editorjs-color-picker";

const EditorOutput = ({ data }: any) => {
    const editorInstance = useRef<any | null>(null);

    useEffect(() => {
        if (!editorInstance.current) {
            editorInstance.current = new EditorJS({
                holder: "editorjs-viewer",
                data: data,
                readOnly: true,
                tools: {
                    paragraph: Paragraph,
                    header: Header,
                    list: List,
                    image: ImageTool,
                    embed: Embed,
                    code: CodeTool,
                    quote: Quote,
                    delimiter: Delimiter,
                    table: Table,
                    marker: Marker,
                    inlineCode: InlineCode,
                    warning: Warning,
                    attaches: AttachesTool,
                    raw: RawTool,
                    underline: Underline,
                    colorPicker: ColorPicker,
                },
            });
        }

        return () => {
            if (editorInstance.current && editorInstance.current.destroy) {
                editorInstance.current.destroy();
            }
        };
    }, [data]);

    return <div id="editorjs-viewer" />;
};

export default EditorOutput;
