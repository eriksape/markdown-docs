import React, {FunctionComponent} from 'react';
import { connect } from 'react-redux'
import { Marked } from '@ts-stack/markdown';
import './Preview.css'

interface PreviewProps {
  content: string
}

const Preview: FunctionComponent<PreviewProps> = ({content}) => {
  if(document === null) return null;
  return <div className="Preview" dangerouslySetInnerHTML={{__html:Marked.parse(content)}}/>;
};

const mapStateToProps = (state: { content: string; }) => ({
  content: state.content,
});

const mapDispatchToProps = ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Preview)