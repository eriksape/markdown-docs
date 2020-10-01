import IDocument from "../interfaces/IDocument";

const unselectDocument = () => ({type: 'UNSELECT_DOCUMENT'});
export const selectDocument = (document: IDocument) => ({type: 'SELECT_DOCUMENT', document});
export const updateContent = (id: number, content: string) => ({type: 'UPDATE_CONTENT', id, content});

export const setTitle = (title: string, key:number, id:number) => async (dispatch:Function) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: `{updateDocument(id:${id} title:"${title}"){id title content updated_at}}`})
    })
    dispatch({type: 'SET_TITLE', title, key});
}


export const loadDocuments = () => async (dispatch:Function) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query:`{readDocuments{id title content updated_at}}`})
        });
        const json = await response.json();
        dispatch({type: 'LOAD_DOCUMENTS', documents:json.data.readDocuments});
        if(json.data.readDocuments.length > 0) dispatch({type: 'SELECT_DOCUMENT', document:json.data.readDocuments[0]});
    } catch (error) {

    }
}

export const deleteDocument = (id:number) => async (dispatch:Function, getState:Function) => {
    try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{deleteDocument(id:"${id}")}`})
        });
        const documents:IDocument[] = getState().documents;
        dispatch({type: 'DELETE_DOCUMENT', id});
        if(documents.length > 1) dispatch(selectDocument(documents[0]));
        else dispatch(unselectDocument());

    } catch (error) {

    }
}

export const addDocument = (sequence:number) => async(dispatch:Function) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query:`{createDocument(number:${sequence+1}){id title content updated_at}}`})
    });
    const json = await response.json();
    const document:IDocument = json.data.createDocument;
    dispatch({type: 'ADD_DOCUMENT', document});
    dispatch({type: 'SELECT_DOCUMENT', document})
}

export const changeContent = (content:string) => ({type: 'CHANGE_CONTENT', content});

export const saveContent = (document: IDocument, content:string) => async(dispatch:Function) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: `{updateDocument(id:${document.id} content:"${content}"){id title content updated_at}}`})
    });
    dispatch({type: 'NONE'});
}
