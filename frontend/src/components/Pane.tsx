import React, { FunctionComponent } from 'react';
import './Pane.css'

type PaneProps = {}

const Pane: FunctionComponent<PaneProps> = ({children}) => (
    <div className="Pane">
        { children }
    </div>
)

export default Pane
