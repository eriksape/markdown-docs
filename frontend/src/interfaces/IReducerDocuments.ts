import IDocument from "./IDocument";
import * as states from "../constantans/states";

export interface IActionDocuments {
    type: string
    documents?: IDocument[]
    selected?: IDocument
    error?: null|string
}

export interface IStateDocuments {
    status: string
    data: IDocument[]
    selected: null|IDocument
    error: null|string
}