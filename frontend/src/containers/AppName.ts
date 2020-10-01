import { connect } from "react-redux";
import AppName from '../components/AppName';
import {
    addDocument
}  from '../actions/documents';
import IDocument from "../interfaces/IDocument";

const mapStateToProps = (state: { documents: IDocument[]; }) => ({
    number: state.documents.length,
});

const mapDispatchToProps = ({
    addDocument
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(AppName);
