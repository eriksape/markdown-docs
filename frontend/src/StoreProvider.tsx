import React, { createContext, useReducer, useContext, FunctionComponent } from "react";

const defaultState = {
  document: 'title 1',
  text: '# Hello world!',
  original: '# Hello world!'
};

const defaultAction = {
  type: '',
  document: '',
  text: '',
  original: ''
}

interface StateType {
  text: string,
  document: string,
  original: string
}

interface ActionType {
  type: string,
  text: string,
  document: string,
  original: string
}

function reducer(state: StateType = defaultState, action: ActionType = defaultAction):StateType {
  switch (action.type) {
    case "TEXT_CHANGED":
      return { ...state, text: action.text };
    default:
      return state;
  }
}

interface IContextProps {
  state: StateType;
  dispatch: ({type, document, text, original}:{type:string, document?:string, text?:string, original?:string}) => void;
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