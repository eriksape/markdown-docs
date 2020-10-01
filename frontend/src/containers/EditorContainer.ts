import {connect} from "react-redux";
import EditorContainer from '../components/EditorContainer'
import IDocument from "../interfaces/IDocument";
import {
    changeContent,
    saveContent
}  from '../actions/documents';

const mapStateToProps = (state: { document: IDocument; content:string }) => ({
    document: state.document,
    content: state.content
});

const mapDispatchToProps = ({
    changeContent,
    saveContent,
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(EditorContainer);
