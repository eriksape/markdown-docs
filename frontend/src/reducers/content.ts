import {
    SET_SELECTED_DOCUMENT,
    GET_DOCUMENTS_SUCCESS,
    CREATE_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_SUCCESS,
    SET_DOCUMENT_CONTENT,
} from '../constants/documents.types'
import {IActionDocuments} from "../interfaces/IReducerDocuments";

const initialState:string = '';

export default function(state = initialState, action:IActionDocuments) {
    switch (action.type) {
        case SET_SELECTED_DOCUMENT:
        case GET_DOCUMENTS_SUCCESS:
        case CREATE_DOCUMENT_SUCCESS:
        case DELETE_DOCUMENT_SUCCESS:
            if(action.selected) return action.selected.content;
            return '';
        case SET_DOCUMENT_CONTENT:
            return action.content;
        default:
            return state;
    }
}
