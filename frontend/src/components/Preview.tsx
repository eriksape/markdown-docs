import React, {FunctionComponent} from 'react';
import { connect } from 'react-redux'
import { Marked } from '@ts-stack/markdown';
import './Preview.css'

interface PreviewProps {
  content: string
}

const Preview: FunctionComponent<PreviewProps> = ({content}) => (
    <div className="Preview" dangerouslySetInnerHTML={{__html:Marked.parse(content)}}/>
);

const mapStateToProps = (state: { content: string; }) => ({
  content: state.content,
});

export default connect(mapStateToProps)(Preview)