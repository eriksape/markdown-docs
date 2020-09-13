import IDocument from "../interfaces/IDocument";

const initialState:string = '';

export default function(state = initialState, action:any) {
    switch (action.type) {
        case 'SELECT_DOCUMENT':
            return action.document.content
        case 'CHANGE_CONTENT':
            return action.content
        default:
            return state;
    }
}