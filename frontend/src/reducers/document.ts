import IDocument from "../interfaces/IDocument";

const initialState:IDocument|null = null;

export default function(state = initialState, action:any) {
    switch (action.type) {
        case 'SET_TITLE':
            return {
                ...state,
                title: action.title
            }
        case 'SELECT_DOCUMENT':
            return action.document
        case 'UNSELECT_DOCUMENT':
            return initialState;
        default:
            return state;
    }
}
