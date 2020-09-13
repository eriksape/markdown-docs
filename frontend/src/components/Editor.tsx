import React, { FunctionComponent, useRef } from 'react';
import './Editor.css'

interface EditorProps {
  onChange?: (text:string) => void,
  text: string
}

const Editor: FunctionComponent<EditorProps> = ({text, onChange}) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const emitChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    if(onChange) {
      onChange(event.currentTarget.innerText);
    }
  }
  return <div
      ref={inputEl}
      className="Editor"
      contentEditable={true}
      onInput={emitChange}
      dangerouslySetInnerHTML={{__html:text}}
  />
}

export default Editor;
