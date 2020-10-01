import React, { FunctionComponent, useEffect } from 'react';
import Document from './Document'
import './Documents.css';
import IDocument from "../interfaces/IDocument";

interface DocumentsProps {
    document: IDocument
    documents: IDocument[]
    loadDocuments: Function
    deleteDocument: (id:number) => void
    updateContent:(id: number, content: string) => void
    selectDocument:(document:IDocument) => void
    setTitle: (title:string, key:number) => void

}

const Documents: FunctionComponent<DocumentsProps> = ({
                                                          documents,document,
                                                          loadDocuments, deleteDocument, updateContent,
                                                          selectDocument, setTitle}) => {
    useEffect(() => {
        loadDocuments()
    }, [loadDocuments]);


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
                        updateContent(doc.id, doc.content)
                        selectDocument(doc)
                    } }
                    setTitle={setTitle}
                    deleteDocument={ deleteDocument }
                />)
            }
        </div>
    )
};

export default Documents