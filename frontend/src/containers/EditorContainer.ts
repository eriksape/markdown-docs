import {connect} from "react-redux";
import EditorContainer from '../components/EditorContainer'
import {
    changeContent,
    saveContent
}  from '../actions/documents';
import {IStateDocuments} from "../interfaces/IReducerDocuments";

const mapStateToProps = ({documents, content}:{documents:IStateDocuments, content:string}) => ({
    document: documents.selected,
    content
});

const mapDispatchToProps = ({
    changeContent,
    saveContent,
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(EditorContainer);
