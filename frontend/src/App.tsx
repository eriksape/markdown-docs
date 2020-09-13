import React from 'react';
import './App.css';
import {StoreProvider} from "./StoreProvider";
import Pane from "./components/Pane";
import AppName from "./components/AppName";
import Documents from "./components/Documents";
import EditorContainer from "./components/EditorContainer";
import Preview from "./components/Preview";

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <Pane hideTopBorder={true} hideLeftBorder={true}>
          <AppName />
          <Documents />
        </Pane>
        <Pane><EditorContainer /></Pane>
        <Pane><Preview /></Pane>
      </div>
    </StoreProvider>
  );
}

export default App;
