import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth,roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>{
        if(!auth.isLoggedIn){
            return <Redirect to="/login" />
        }
        if (roles && roles.indexOf(auth.user.role) === -1) {
            return <Redirect to="/"/>
        }
        
        return <Component {...props} />
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
