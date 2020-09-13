import React, { FunctionComponent } from 'react';
import './AppName.css';
import IDocument from "../interfaces/IDocument";
import {connect} from "react-redux";

interface AppNameProps {
    addDocument(newDocument: IDocument):void
    selectDocument:(document:IDocument) => void
}

const AppName: FunctionComponent<AppNameProps> = ({addDocument, selectDocument}) => {
    const onClickNew = () => {
        fetch('http://localhost:3001/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query:`{createDocument{id title content updated_at}}`})
        }).then(
            response => response.json()
        ).then(
            ({data}) => {
                addDocument(data.createDocument)
                selectDocument(data.createDocument)

            });
    }
    return (
        <div className="AppName">
            <div className="column">
                <div className="title">MarkdownEditor</div>
            </div>
            <div className="column">
                <div className="new" onClick={onClickNew}>+</div>
            </div>
        </div>
    );
}

const mapDispatchToProps = ({
    addDocument: (newDocument: IDocument) => ({type: 'ADD_DOCUMENT', ...newDocument}),
    selectDocument: (document: IDocument) => ({type: 'SELECT_DOCUMENT', document}),
});

export default connect(
    null, mapDispatchToProps
)(AppName);