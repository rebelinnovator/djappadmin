import React from "react";
import { connect } from "react-redux";

const PrivateNode = ({ children, roles,auth }) => {
    let permit = true;
    if (roles && roles.indexOf(auth.user.role) === -1) {
        permit = false;
    }
    return (
      <>
        {permit && children}
      </>
    );
  };
  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  export default connect(mapStateToProps)(PrivateNode);