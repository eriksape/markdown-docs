import React, { createContext, useReducer, useContext, FunctionComponent } from "react";

const defaultState = {
  title: '',
  content: '',
  original: '',
  selected: ''
};

const defaultAction = {
  type: '',
  title: '',
  content: '',
  original: '',
  selected: ''
}

interface StateType {
  content: string,
  title: string,
  original: string,
  selected: string
}

interface ActionType {
  type: string,
  content: string,
  title: string,
  original: string,
  selected: string
}

function reducer(state: StateType = defaultState, action: ActionType = defaultAction):StateType {
  switch (action.type) {
    case 'SELECTED_DOCUMENT':
      return {
        title: action.title,
        content: action.content,
        original: action.original,
        selected: action.selected,
      }
    case 'CONTENT_CHANGED':
      return { ...state, content: action.content };
    default:
      return state;
  }
}

interface IContextProps {
  state: StateType;
  dispatch: (
      {
        type,
        title,
        content,
        original,
        selected
      } : {
        type: string,
        title?: string,
        content?: string,
        original?: string,
        selected?: string,
      }) => void;
}

const StoreContext = createContext({} as IContextProps);
const DispatchContext = createContext(null);

export const StoreProvider: FunctionComponent = props => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}

export const useDispatch = () => useContext(DispatchContext);
export const useStore = () => useContext(StoreContext);