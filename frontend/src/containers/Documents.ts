import { connect } from "react-redux";
import Documents from '../components/Documents';
import {
    loadDocuments,
    deleteDocument,
    selectDocument,
    setTitle,
}  from '../actions/documents';
import {IStateDocuments} from "../interfaces/IReducerDocuments";

const mapStateToProps = ({documents}:{documents:IStateDocuments}) => ({documents});

const mapDispatchToProps = ({
    loadDocuments,
    deleteDocument,
    selectDocument,
    setTitle,
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Documents);
