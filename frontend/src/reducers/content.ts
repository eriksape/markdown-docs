const initialState:string = '';

export default function(state = initialState, action:any) {
    switch (action.type) {
        case 'SET_SELECTED_DOCUMENT':
        case 'GET_DOCUMENTS_SUCCESS':
        case 'CREATE_DOCUMENT_SUCCESS':
        case 'DELETE_DOCUMENT_SUCCESS':
            if(action.selected) return action.selected.content;
            return '';
        case 'CHANGE_CONTENT':
            return action.content;
        default:
            return state;
    }
}
