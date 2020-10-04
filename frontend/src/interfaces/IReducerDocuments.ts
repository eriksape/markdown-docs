import IDocument from "./IDocument";

export interface IActionDocuments {
    type: string
    documents?: IDocument[]
    selected?: IDocument
    error?: null|string
    content?: string
}

export interface IStateDocuments {
    status: string
    data: IDocument[]
    selected: null|IDocument
    error: null|string
}