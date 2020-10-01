import React, { FunctionComponent } from 'react';
import './AppName.css';

interface AppNameProps {
    addDocument(sequence: number):void
    number: number
}

const AppName: FunctionComponent<AppNameProps> = ({addDocument, number}) => {
    return (
        <div className="AppName">
            <div className="column">
                <div className="title">MarkdownEditor</div>
            </div>
            <div className="column">
                <div className="new" onClick={()=>addDocument(number)}>+</div>
            </div>
        </div>
    );
}

export default AppName;