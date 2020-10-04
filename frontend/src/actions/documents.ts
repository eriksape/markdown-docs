import IDocument from "../interfaces/IDocument";
import {
    GET_DOCUMENTS_REQUEST,
    GET_DOCUMENTS_FAILURE,
    GET_DOCUMENTS_SUCCESS,
    SET_SELECTED_DOCUMENT,
    CREATE_DOCUMENT_REQUEST,
    CREATE_DOCUMENT_FAILURE,
    CREATE_DOCUMENT_SUCCESS,
    UPDATE_DOCUMENT_REQUEST,
    UPDATE_DOCUMENT_FAILURE,
    UPDATE_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_REQUEST,
    DELETE_DOCUMENT_FAILURE,
    DELETE_DOCUMENT_SUCCESS,
} from '../constants/documents.types';

const getDocumentsRequest = () => ({type: GET_DOCUMENTS_REQUEST});
const getDocumentsSuccess = (documents:IDocument[], selected:null|IDocument) => ({
    type: GET_DOCUMENTS_SUCCESS,
    documents,
    selected
});
const getDocumentsFailure = (error:string) => ({type: GET_DOCUMENTS_FAILURE, error});

const createDocumentRequest = () => ({type: CREATE_DOCUMENT_REQUEST});
const createDocumentSuccess = (selected: IDocument) => ({type: CREATE_DOCUMENT_SUCCESS, selected});
const createDocumentFailure = (error:string) => ({type: CREATE_DOCUMENT_FAILURE, error});

const updateDocumentRequest = () => ({type: UPDATE_DOCUMENT_REQUEST});
const updateDocumentSuccess = (selected: IDocument) => ({type: UPDATE_DOCUMENT_SUCCESS, selected});
const updateDocumentFailure = (error:string) => ({type: UPDATE_DOCUMENT_FAILURE, error});

const deleteDocumentRequest = () => ({type: DELETE_DOCUMENT_REQUEST});
const deleteDocumentSuccess = (documents:IDocument[], selected:null|IDocument) => ({
    type: DELETE_DOCUMENT_SUCCESS,
    documents,
    selected
});
const deleteDocumentFailure = (error:string) => ({type: DELETE_DOCUMENT_FAILURE, error});

export const selectDocument = (selected: IDocument) => ({type: SET_SELECTED_DOCUMENT, selected});
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

export const deleteDocument = (document:IDocument) => async (dispatch:Function, getState:Function) => {
    dispatch(deleteDocumentRequest());
    try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{deleteDocument(id:"${document.id}")}`})
        });
        const documents:IDocument[] = getState().documents.data;
        const filterDocuments = documents.filter(doc => doc.id !== document.id)
        const selected:null|IDocument = filterDocuments.length > 0 ? {...filterDocuments[0], key:0} : null;
        dispatch(deleteDocumentSuccess(filterDocuments, selected));
    } catch (error) {
        dispatch(deleteDocumentFailure('whoops an error just occurred'));
    }
}

export const changeContent = (content:string) => ({type: 'CHANGE_CONTENT', content});

export const addDocument = (sequence:number) => async(dispatch:Function) => {
    dispatch(createDocumentRequest());
    try {
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
        dispatch(createDocumentSuccess(document));
    }catch (e) {
        dispatch(createDocumentFailure('whoops an error just occurred'));
    }
}

export const loadDocuments = () => async (dispatch:Function) => {
    dispatch(getDocumentsRequest());
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
        const documents:IDocument[] = json.data.readDocuments;
        const selected:null|IDocument = documents.length > 0 ? {...documents[0], key:0} : null;
        dispatch(getDocumentsSuccess(documents, selected));
    } catch (error) {
        dispatch(getDocumentsFailure('whoops an error just occurred'));
    }
}

export const saveContent = (document: IDocument, content:string) => async(dispatch:Function) => {
    dispatch(updateDocumentRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{updateDocument(id:${document.id} content:"${content}"){id title content updated_at}}`})
        });
        const json = await response.json();
        const selected:IDocument = json.data.updateDocument;
        dispatch(updateDocumentSuccess(selected));
    } catch (e) {
        dispatch(updateDocumentFailure('whoops an error just occurred'));
    }
}