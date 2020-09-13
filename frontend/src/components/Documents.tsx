import React, { FunctionComponent, useEffect, useState } from 'react';
import Document from './Document'
import { useStore } from '../StoreProvider'
import './Documents.css';

interface DocumentsProps {}

interface IDocument {
    id: number;
    title: string,
    updated_at: Date,
    content: string
}

const Documents: FunctionComponent<DocumentsProps> = () => {
    const { state, dispatch } = useStore();
    const [ documents, setDocuments ] = useState<IDocument[]>([]);
    useEffect(() => {
        console.log('mounted')
        fetch('http://localhost:3001/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query:`{getDocuments{id title content updated_at}}`})
        }).then(
            r => r.json()
        ).then(
            ({data}) => {
                setDocuments(data.getDocuments)
                dispatch({
                    type: 'SELECTED_DOCUMENT',
                    selected: data.getDocuments[0].title,
                    original: data.getDocuments[0].title,
                    ...data.getDocuments[0]
                })
            });
    }, []);


    return (
        <div className="Documents">
            {
                documents.map(doc => <Document
                    key={doc.id}
                    updated_at={doc.updated_at}
                    selected={doc.title === state.selected}
                    title={doc.title}
                    onClick={ () => { dispatch({
                        type: 'SELECTED_DOCUMENT',
                        title: doc.title,
                        content: doc.content,
                        original: doc.content,
                        selected: doc.title
                    }) }}
                />)
            }
        </div>
  )
};

export default Documents;
