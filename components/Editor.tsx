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


interface EditorProps {
    data?: any;
    onChange: (data: any) => void;
    holder?: string;
}

const EDITOR_HOLDER_ID = "editorjs";

const Editor = ({ data, onChange, holder }: EditorProps) => {
    const ejInstance = useRef<any | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && !ejInstance.current) {
            initEditor();
        }

        return () => {
            if (ejInstance.current) {
                ejInstance.current.destroy();
                ejInstance.current = null;
            }
        };
    }, []);

    const initEditor = () => {
        if (ejInstance.current) return;

        const editor = new EditorJS({
            holder: holder || EDITOR_HOLDER_ID,
            onReady: () => {
                ejInstance.current = editor;
            },
            onChange: async () => {
                if (editor) {
                    const content = await editor.save();
                    onChange(content);
                }
            },
            autofocus: true,
            data: data || { blocks: [] }, // Provide default blocks array to fix TypeScript error
            tools: {
                header: {
                    class: Header,
                    config: {
                        placeholder: "Enter a header",
                        levels: [1, 2, 3, 4],
                        defaultLevel: 2,
                    },
                },
                ColorPicker: {
                    class: ColorPicker,
                },
                underline: Underline,
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: "static", // Using 'static' to indicate no actual upload
                            byUrl: "static",
                        },
                        uploader: {
                            uploadByFile(file: File) {
                                // Mock file upload
                                return new Promise((resolve) => {
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        resolve({
                                            success: 1,
                                            file: {
                                                url: e.target?.result as string,
                                            },
                                        });
                                    };
                                    reader.readAsDataURL(file);
                                });
                            },
                            uploadByUrl(url: string) {
                                // Return the URL directly
                                return Promise.resolve({
                                    success: 1,
                                    file: {
                                        url,
                                    },
                                });
                            },
                        },
                    },
                },
                embed: {
                    class: Embed,
                    config: {
                        services: {
                            youtube: true,
                            vimeo: true,
                            twitter: true,
                            instagram: true,
                        },
                    },
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                },
                code: {
                    class: CodeTool,
                },
                quote: {
                    class: Quote,
                    inlineToolbar: true,
                    config: {
                        quotePlaceholder: "Enter a quote",
                        captionPlaceholder: "Quote's author",
                    },
                },
                delimiter: Delimiter,
                table: Table, // Fixed TypeScript error by using direct reference
                marker: {
                    class: Marker,
                },
                inlineCode: {
                    class: InlineCode,
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
                warning: {
                    class: Warning,
                    inlineToolbar: true,
                    config: {
                        titlePlaceholder: "Title",
                        messagePlaceholder: "Message",
                    },
                },
                attaches: {
                    class: AttachesTool,
                    config: {
                        // Mock file upload for the attaches tool
                        uploader: {
                            uploadByFile(file: File) {
                                return new Promise((resolve) => {
                                    resolve({
                                        success: 1,
                                        file: {
                                            url: URL.createObjectURL(file),
                                            name: file.name,
                                            size: file.size,
                                        },
                                    });
                                });
                            },
                        },
                    },
                },
                raw: RawTool,
            },
        });
    };

    return (
        <div
            id={holder || EDITOR_HOLDER_ID}
            className="prose max-w-none editor min-h-[300px] border border-gray-200 rounded-md p-4"
        />
    );
};

export default Editor;
