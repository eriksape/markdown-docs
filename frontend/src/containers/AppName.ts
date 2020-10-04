import { connect } from "react-redux";
import AppName from '../components/AppName';
import {
    addDocument
}  from '../actions/documents';
import {IStateDocuments} from "../interfaces/IReducerDocuments";

const mapStateToProps = ({documents}:{documents:IStateDocuments}) => ({
    number: documents.data.length,
});

const mapDispatchToProps = ({
    addDocument
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(AppName);
