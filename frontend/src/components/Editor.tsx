import React, { FunctionComponent } from 'react';
import './Editor.css'

interface EditorProps {
  onChange?: (text:string) => void,
  text: string
}

const Editor: FunctionComponent<EditorProps> = ({text, onChange}) => {
  const emitChange = (event: React.SyntheticEvent<any>) => {
    if(onChange) {
      onChange(event.currentTarget.innerText);
    }
  }

  return <div
    className="Editor"
    contentEditable={true}
    onInput={emitChange}
    dangerouslySetInnerHTML={{__html:text}}
  />
}

export default Editor;
