const initialState:string = '';

export default function(state = initialState, action:any) {
    switch (action.type) {
        case 'SET_SELECTED_DOCUMENT':
        case 'GET_DOCUMENTS_SUCCESS':
        case 'CREATE_DOCUMENT_SUCCESS':
            return action.selected.content
        case 'CHANGE_CONTENT':
            return action.content
        case 'UNSELECT_DOCUMENT':
            return initialState
        default:
            return state;
    }
}
