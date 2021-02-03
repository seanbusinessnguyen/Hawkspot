/* Coders: 
    - Sumier Qadiri
    - Sean Nguyen
    - Matthew Nguyen
*/

import "./App.css";
import React, { useState } from "react";
import Feed from "./Feed";
import Login from "./Login";
import Settings from "./Settings";
import { useStateValue } from "./StateProvider";
import Profile2 from "./Profile2"; //this is the new profile page
import ToS from "./ToS";
import Nav from "./Nav";
//added for routing navigating functionality
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [{ user }, dispatch] = useStateValue();

  //Object/State to keep track of current page/component to load
  //Reload the components - so some stuff will need to be saved
  const [appState, setAppState] = useState("login");

  return (
    //Will use the BEM naming convention for CSS

    <div className="app">
      {/* If no user, Login, else load app */}

      {!user ? (
        <Login />
      ) : (
        <div>
          <Router>
            <div>
              <Nav />
              <Switch>
                <Route path="/" exact component={Feed} />

                <Route path="/Profile2" component={Profile2} />

                <Route path="/Settings" component={Settings} />

                <Route path="/Feed" component={Feed} />

                <Route path="/ToS" component={ToS} />
              </Switch>
            </div>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
