import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";
import PlayList from "./components/PlayList";
import PlaylistDetail from "./components/PlayListDetail";

import UserManage from "./components/UserManage"


import { logout } from "./actions/auth";

import { history } from "./helpers/history";
import PrivateRoute from "./helpers/PrivateRoute";
import PrivateNode from "./helpers/PrivateNode";

import {Role} from "./helpers/role"

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      //dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
     // setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            DJAPP
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser && (
              <PrivateNode roles={[Role.Admin,Role.SuperAdmin]}>
                <li className="nav-item">
                  <Link to={"/playlist"} className="nav-link">
                    PlayList
                  </Link>
                </li>
              </PrivateNode>
            )}
            {currentUser && (
              <PrivateNode roles={[Role.SuperAdmin]}>
                <li className="nav-item">
                  <Link to={"/usermanage"} className="nav-link">
                    UserManage
                  </Link>
                </li>
              </PrivateNode>
            )}
            {/* {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )} */}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <PrivateRoute exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />

            <PrivateRoute exact path="/playlist" roles={[Role.Admin,Role.SuperAdmin]} component={PlayList}/>
            <PrivateRoute exact path="/playlistDetail/:id" roles={[Role.Admin,Role.SuperAdmin]} component={PlaylistDetail} />

            <PrivateRoute exact path="/usermanage" roles={[Role.SuperAdmin]} component={UserManage}/>
            {/* <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
