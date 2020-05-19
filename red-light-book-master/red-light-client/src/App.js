import React from "react";
import logo from "./logo.svg";
import TitlePage from "./components/TitlePage";
import TipsPage from "./components/TipsPage"
import "./css/App.css";
import ChapterPage from "./components/ChapterPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Your Body's Red Light Warning Signals
      </header>
      <Router>
        <Switch>
          <Route path="/" exact component={TitlePage} />
          <Route path="/chapters" component={ChapterPage} />
          <Route path="/tips" component={TipsPage} />
          {/* other routes can be added here if needed*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
