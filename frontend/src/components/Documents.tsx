import React, { FunctionComponent, useEffect } from 'react';
import Document from './Document'
import './Documents.css';
import IDocument from "../interfaces/IDocument";
import {IStateDocuments} from "../interfaces/IReducerDocuments";

interface DocumentsProps {
    documents: IStateDocuments
    loadDocuments: Function
    deleteDocument: (document:IDocument) => void
    selectDocument:(document:IDocument) => void
    setTitle: (title:string, key:number, id:number) => void

}

const Documents: FunctionComponent<DocumentsProps> = ({
                                                          documents,
                                                          loadDocuments, deleteDocument,
                                                          selectDocument, setTitle}) => {
    useEffect(() => {
        loadDocuments()
    }, [loadDocuments]);


    return (
        <div className="Documents">
            {
                documents.data.map((doc, key) => <Document
                    key={doc.id}
                    k={key}
                    selected={documents.selected !== null && documents.selected.id === doc.id}
                    document={doc}
                    onClick={ () => {
                        selectDocument({...doc, key})
                    } }
                    setTitle={setTitle}
                    deleteDocument={ deleteDocument }
                />)
            }
        </div>
    )
};

export default Documents