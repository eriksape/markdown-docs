import React, {FunctionComponent, useEffect, useState} from 'react';
import Editor from './Editor'
import IDocument from "../interfaces/IDocument";

interface EditorContainerProps {
    document: null|IDocument
    content: string
    changeContent:(content:string) => void
    saveContent:(document: IDocument, content:string) => void
}

const EditorContainer: FunctionComponent<EditorContainerProps> = ({document, content, changeContent, saveContent}) => {
    const [lastText, setLastText] = useState(content);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (document && lastText !== content) {
                setLastText(content);
                const encodeContent = encodeURI(content.replace(/\n\n\n/mg, '\n\n'));
                saveContent(document, encodeContent);
            }
        }, 1000);
        return () => clearTimeout(timer)
    }, [content, lastText, document, saveContent]);

    if(document === null) return null;
    return <Editor
        text={document.content.replace(/\n/mg, '<br>')}
        onChange={(content) => changeContent(content)}
    />
}

export default EditorContainer;