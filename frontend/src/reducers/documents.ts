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
} from '../constants/documents.types'
import * as states from '../constants/states.types';
import { IActionDocuments, IStateDocuments } from "../interfaces/IReducerDocuments";

const initialState:IStateDocuments = {
    status: states.IDLE_STATUS,
    data: [],
    selected: null,
    error: null
};

export default function(state = initialState, action:IActionDocuments) {
    switch (action.type) {
        case SET_SELECTED_DOCUMENT:
            return {
                ...state,
                selected: action.selected,
            }
        case GET_DOCUMENTS_REQUEST:
        case CREATE_DOCUMENT_REQUEST:
        case UPDATE_DOCUMENT_REQUEST:
        case DELETE_DOCUMENT_REQUEST:
            return {
                ...state,
                status: states.LOADING_STATUS,
                error: null,
            }
        case GET_DOCUMENTS_FAILURE:
        case CREATE_DOCUMENT_FAILURE:
        case UPDATE_DOCUMENT_FAILURE:
        case DELETE_DOCUMENT_FAILURE:
            return {
                ...state,
                status: states.FAILURE_STATUS,
                error: action.error,
            }
        case GET_DOCUMENTS_SUCCESS:
        case DELETE_DOCUMENT_SUCCESS:
            return {
                ...state,
                status: states.SUCCESS_STATUS,
                selected: action.selected,
                data: action.documents,
            }
        case CREATE_DOCUMENT_SUCCESS:
            const create_data = state.data
            if(action.selected) create_data.unshift(action.selected)
            return {
                ...state,
                status: states.SUCCESS_STATUS,
                selected: action.selected,
                data: create_data,
            }
        case UPDATE_DOCUMENT_SUCCESS:
            const update_data = state.data;
            if(action.selected && state.selected && state.selected.key !== undefined) {
                update_data[state.selected.key].content = action.selected.content
            }
            return {
                ...state,
                status: states.SUCCESS_STATUS,
                data: update_data,
            }
        default:
            return state;
    }
}

