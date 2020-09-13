import React, {FunctionComponent} from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import document from '../assets/document.svg'
import './Document.css';

interface DocumentProps {
    title: string,
    updated_at: Date,
    selected?: boolean,
    onClick?: (e:React.SyntheticEvent) => void,
}

const Document: FunctionComponent<DocumentProps> = ({title, updated_at, selected, onClick}) => (
    <div className={`Document ${selected ? 'selected':''}`} onClick={onClick}>
        <div className='row'>
            <div className='column'>
                <div className='image'>
                    <img src={document} alt="document icon"/>
                </div>
            </div>
            <div className='column'>
                <div className='content'>
                    <div className='title'>{title}</div>
                    <div className='date'>{formatDistanceToNow(updated_at)}</div>
                </div>
            </div>
        </div>
    </div>
);

export default Document;
