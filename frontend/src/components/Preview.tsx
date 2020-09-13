import React, { FunctionComponent } from 'react';
import { Marked } from '@ts-stack/markdown';
import { useStore } from '../StoreProvider'
import './Preview.css'

interface PreviewProps {}

const Preview: FunctionComponent<PreviewProps> = ({}) => {
  const { state } = useStore();
  return <div className="Preview" dangerouslySetInnerHTML={{__html:Marked.parse(state.text)}}/>;
}

export default Preview;
