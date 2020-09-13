import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from "react-redux";
import Document from './Document'
import './Documents.css';
import IDocument from "../interfaces/IDocument";

interface DocumentsProps {
    content: string
    document: IDocument
    documents: IDocument[]
    loadDocuments:(documents:IDocument[]) => void
    selectDocument:(document:IDocument) => void
    setTitle: (title:string, key:number) => void
    deleteDocument: (id: number) => void
    updateContent:(id: number, content: string) => void
}

const Documents: FunctionComponent<DocumentsProps> = ({
                                                          content, document, documents, loadDocuments,
                                                          selectDocument, setTitle, deleteDocument, updateContent}) => {
    const [onLoad, setLoad] = useState(true)
    useEffect(() => {
        fetch('http://localhost:3001/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query:`{readDocuments{id title content updated_at}}`})
        }).then(
            response => response.json()
        ).then(
            ({data}) => {
                loadDocuments(data.readDocuments)
                if(data.readDocuments.length > 0) selectDocument(data.readDocuments[0])
            });
    }, []);


    return (
        <div className="Documents">
            {
                documents.map((doc, key) => <Document
                    key={doc.id}
                    id={doc.id}
                    k={key}
                    updated_at={doc.updated_at}
                    selected={document && document.id === doc.id}
                    title={doc.title}
                    onClick={ () => {
                        updateContent(document.id, content)
                        selectDocument(doc)
                    } }
                    setTitle={setTitle}
                    deleteDocument={deleteDocument}
                />)
            }
        </div>
  )
};

const mapStateToProps = (state: { documents: IDocument[]; document: IDocument; content: string}) => ({
    documents: state.documents,
    document: state.document,
    content: state.content
});

const mapDispatchToProps = ({
    loadDocuments: (documents: IDocument[]) => ({type: 'LOAD_DOCUMENTS', documents}),
    selectDocument: (document: IDocument) => ({type: 'SELECT_DOCUMENT', document}),
    setTitle: (title: string, key:number) => ({type: 'SET_TITLE', title, key}),
    deleteDocument: (id: number) => ({type: 'DELETE_DOCUMENT', id}),
    updateContent: (id: number, content: string) => ({type: 'UPDATE_CONTENT', id, content}),
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Documents);
