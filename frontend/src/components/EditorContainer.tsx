import React, {FunctionComponent, useEffect, useState} from 'react';
import { connect } from "react-redux";
import Editor from './Editor'
import IDocument from "../interfaces/IDocument";

interface EditorContainerProps {
    document: IDocument
    content: string
    changeContent:(content:string) => void
}

const EditorContainer: FunctionComponent<EditorContainerProps> = ({document, content, changeContent}) => {
    const [lastText, setLastText] = useState('');
    useEffect(() => {
        console.log(content)
        const timer = setTimeout(() => {
            if (lastText != content) {
                setLastText(content);

                const encodeContent = encodeURI(content.replace(/\n\n\n/mg, '\n\n'));

                if(document) {
                    fetch('http://localhost:3001/api', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify({query: `{updateDocument(id:${document.id} content:"${encodeContent}"){id title content updated_at}}`})
                    }).then(
                        response => response.json()
                    ).then(
                        ({data}) => {
                            console.log(data)
                        }
                    );
                }


            }
        }, 1000);
        return () => clearTimeout(timer)
    }, [content]);

    if(document === null) return null;
    return <Editor
        text={document.content.replace(/\n/mg, '<br>')}
        onChange={(content) => changeContent(content)}
    />
}

const mapStateToProps = (state: { document: IDocument; content:string }) => ({
    document: state.document,
    content: state.content
});

const mapDispatchToProps = ({
    changeContent: (content: string) => ({type: 'CHANGE_CONTENT', content}),
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(EditorContainer);
