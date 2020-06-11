import React, { useEffect, createContext, useReducer, useContext } from "react";
import NavBar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Signup from "./components/screens/Signup";
import Profile from "./components/screens/Profile";
import UserProfile from "./components/screens/UserProfile";
import CreatePost from "./components/screens/CreatePost";
import SubscribedUserPosts from "./components/screens/SubscribedUserPosts";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/signin");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
    </Switch>
  );
};
function App() {
  const [darkMode, setDarkMode] = React.useState(getInitialMode());
  React.useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem("dark"));
    const userPrefersDark = getPrefColorScheme();
    // if mode was saved --> dark / light
    if (isReturningUser) {
      return savedMode;
      // if preferred color scheme is dark --> dark
    } else if (userPrefersDark) {
      return true;
      // otherwise --> light
    } else {
      return false;
    }
    // return savedMode || false;
  }

  function getPrefColorScheme() {
    if (!window.matchMedia) return;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <NavBar />
          <div className="toggle-container">
            <div className="toggle-btn">
              <label className="fancy-checkbox">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode((prevMode) => !prevMode)}
                />
                <i
                  className="fas fa-sun unchecked"
                  style={{
                    fontSize: "26px",
                    paddingTop: "6px",
                    cursor: "pointer",
                    color: "white",
                  }}
                ></i>
                <i
                  className="fas fa-moon checked"
                  style={{
                    fontSize: "26px",
                    paddingTop: "6px",
                    color: "rgb(19,19,19)",
                  }}
                ></i>
              </label>
            </div>
          </div>
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
