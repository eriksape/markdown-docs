import React, {FunctionComponent, useState, useEffect, SyntheticEvent, ChangeEvent, KeyboardEvent} from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import document from '../assets/document.svg'
import './Document.css';
import IDocument from "../interfaces/IDocument";

interface DocumentProps {
    k: number
    id: number
    title: string
    updated_at: Date
    selected?: boolean
    onClick?: (e:SyntheticEvent) => void
    setTitle: (title:string, key:number) => void
    deleteDocument: (id: number) => void
    reSelectDocument:() => void
}

const Document: FunctionComponent<DocumentProps> = ({
                                                        k, id, title, updated_at,
                                                        selected, onClick, setTitle,
                                                        deleteDocument, reSelectDocument
}) => {
    const [changeTitle, setChangeTitle] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

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
            setTitle(newTitle, k)
            setChangeTitle(false);

            fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({query: `{updateDocument(id:${id} title:"${newTitle}"){id title content updated_at}}`})
            }).then(
                response => response.json()
            ).then(
                ({data}) => {
                    console.log(data)
                }
            );
        }
    }

    const onDelete = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{deleteDocument(id:"${id}")}`})
        }).then(
            response => response.json()
        ).then(
            ({data}) => {
                deleteDocument(id);
                reSelectDocument();
            }
        );
    }

    return (<div className={`Document ${selected ? 'selected':''}`} onClick={onClick}>
        <div className='row'>
            <div className='column'>
                <div className='image'>
                    <img src={document} alt="document icon"/>
                </div>
            </div>
            <div className='column'>
                <div className='content'>
                    {
                        changeTitle && selected ?
                            <input onKeyDown={onKeyDown} onChange={onChangeTitle} defaultValue={title} />:
                            <div className='title' onDoubleClick={()=>setChangeTitle(true)}>{title}</div>
                    }
                    <div className='date'>{formatDistanceToNow(updated_at)}</div>
                </div>
            </div>
            <div className='column'>
                <div className="delete" onClick={onDelete}>x</div>
            </div>
        </div>
    </div>)
}

export default Document;
