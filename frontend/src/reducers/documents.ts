import IDocument from "../interfaces/IDocument";

const initialState:IDocument[] = [];

export default function(state = initialState, action:any) {
    switch (action.type) {
        case 'ADD_DOCUMENT':
            state.unshift({
                id: action.id,
                title: action.title,
                updated_at: action.updated_at,
                content: action.content,
            });
            return state;
        case 'DELETE_DOCUMENT':
            return state.filter(doc => doc.id !== action.id)
        case 'SET_TITLE':
            state[action.key].title = action.title;
            return state;
        case 'UPDATE_CONTENT':
            return [...state.map(doc => {
                if(doc.id === action.id && doc.content !== action.content) doc.content = action.content.replace(/\n\n\n/mg, '\n\n');
                return doc;
            })];
        case 'LOAD_DOCUMENTS':
            return action.documents;
        default:
            return state;
    }
}
