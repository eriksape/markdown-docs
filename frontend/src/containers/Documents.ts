import { connect } from "react-redux";
import Documents from '../components/Documents';
import {
    loadDocuments,
    deleteDocument,
    updateContent,
    selectDocument,
    setTitle,
}  from '../actions/documents';
import IDocument from "../interfaces/IDocument";

const mapStateToProps = (state: { documents: IDocument[], document: IDocument }) => ({
    documents: state.documents,
    document: state.document,
});

const mapDispatchToProps = ({
    loadDocuments,
    deleteDocument,
    updateContent,
    selectDocument,
    setTitle,
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Documents);
