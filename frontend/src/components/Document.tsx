import React, {FunctionComponent, useState, useEffect, SyntheticEvent, ChangeEvent, KeyboardEvent} from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import documentSVG from '../assets/document.svg'
import './Document.css';
import IDocument from "../interfaces/IDocument";

interface DocumentProps {
    document: IDocument
    k: number
    selected?: boolean
    onClick?: (e:SyntheticEvent) => void
    setTitle: (title:string, key:number, id:number) => void
    deleteDocument: (id: IDocument) => void
}

const Document: FunctionComponent<DocumentProps> = ({
                                                        document, k, selected, onClick,
                                                        setTitle, deleteDocument
}) => {
    const [changeTitle, setChangeTitle] = useState(false);
    const [newTitle, setNewTitle] = useState(document.title);

    useEffect(()=>{
        if(!selected) {
            setChangeTitle(false)

        }
    },[selected])

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value);
    }

    const onKeyDown = (event: KeyboardEvent) => {
        if(event.key === 'Enter') {
            setTitle(newTitle, k, document.id)
            setChangeTitle(false);
        }
    }

    const onDelete = () => deleteDocument(document)

    return (<div className={`Document ${selected ? 'selected':''}`} onClick={onClick}>
        <div className='row'>
            <div className='column'>
                <div className='image'>
                    <img src={documentSVG} alt="document icon"/>
                </div>
            </div>
            <div className='column'>
                <div className='content'>
                    {
                        changeTitle && selected ?
                            <input onKeyDown={onKeyDown} onChange={onChangeTitle} defaultValue={document.title} />:
                            <div className='title' onDoubleClick={()=>setChangeTitle(true)}>{document.title}</div>
                    }
                    <div className='date'>{formatDistanceToNow(document.updated_at)}</div>
                </div>
            </div>
            <div className='column'>
                <div className="delete" onClick={onDelete}>x</div>
            </div>
        </div>
    </div>)
}

export default Document;
