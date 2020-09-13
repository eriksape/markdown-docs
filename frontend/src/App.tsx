import React from 'react';
import { Provider } from "react-redux";
import store from "./store";
import './App.css';
import Pane from "./components/Pane";
import AppName from "./components/AppName";
import Documents from "./components/Documents";
import EditorContainer from "./components/EditorContainer";
import Preview from "./components/Preview";

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <Pane hideTopBorder={true} hideLeftBorder={true}>
                <AppName />
                <Documents />
              </Pane>
              <Pane><EditorContainer /></Pane>
              <Pane><Preview /></Pane>
          </div>
    </Provider>
  );
}

export default App;
