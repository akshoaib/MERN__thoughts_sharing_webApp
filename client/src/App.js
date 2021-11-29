import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Signin from "./Containers/Signin";
import Thoughts from "./Containers/Thoughts";
import Private from "./components/Private";
import "./App.css";
import Navbar from "./components/Navbar";
import Profile from "./Containers/Profile";
import Signup from "./Containers/Signup";
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />

          <Private exact path="/" component={Thoughts} />
          <Private path="/createthought" component={Thoughts} />
          <Route path="/getuserbyid/:_id" component={Profile} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
