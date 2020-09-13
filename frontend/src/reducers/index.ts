import { combineReducers } from "redux";
import content from "./content";
import documents from "./documents";
import document from "./document";

export default combineReducers({ content, documents, document });
