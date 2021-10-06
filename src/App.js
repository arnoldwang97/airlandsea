import { withStore } from "react-context-hook";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PlayerIDCheck from "./components/PlayerIDCheck";
import Room from "./screens/Room";
import Home from "./screens/Home";

function App() {
  return (
    <CookiesProvider>
      <PlayerIDCheck />
      <Router>
        <Switch>
          <Route path="/rooms/:id" children={<Room />} />
          <Route path="/" children={<Home />} />
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default withStore(App);
