import React, { FunctionComponent } from 'react';
import Editor from './Editor'
import { useStore  } from '../StoreProvider'

interface EditorContainerProps {}

const EditorContainer: FunctionComponent<EditorContainerProps> = () => {
    const { state, dispatch } = useStore();

    const onChange = (text: string) => {
        dispatch({
            type: 'CONTENT_CHANGED',
            content: text
        })
    }

    return <Editor text={state.original} onChange={onChange}/>

}

export default EditorContainer;
