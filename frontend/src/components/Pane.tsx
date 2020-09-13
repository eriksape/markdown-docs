import React, { FunctionComponent } from 'react';
import './Pane.css'

type PaneProps = {
    hideTopBorder?: boolean,
    hideLeftBorder?: boolean
}

const Pane: FunctionComponent<PaneProps> = ({children, hideTopBorder, hideLeftBorder}) => (
    <div className={`Pane ${(hideTopBorder?'hide-top-border':'')} ${(hideLeftBorder?'hide-left-border':'')}`}>
        { children }
    </div>
)

export default Pane
