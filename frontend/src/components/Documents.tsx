import React, { FunctionComponent, useEffect } from 'react';
import Document from './Document'
import { useStore } from '../StoreProvider'
import mock from '../mock';
import './Documents.css';

interface DocumentsProps {}

const Documents: FunctionComponent<DocumentsProps> = () => {
    const { state, dispatch } = useStore();
    useEffect(() => {
        console.log('mounted')
        const document = mock[0]
        dispatch({
            type: 'SELECTED_DOCUMENT',
            title: document.title,
            content: document.content,
            original: document.content,
            selected: document.title
        })
    }, []);


    return (
        <div className="Documents">
            {
                mock.map(doc => <Document
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
