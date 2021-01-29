import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import UserService from "../services/user.service";

const Home = () => {
  const { user : currentUser } = useSelector((state) => state.auth)
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  if(!currentUser){
    return <Redirect to="/login" />;
  }
  return (
    <div className="container">
      <header className="jumbotron">
        {/* <h3>{content}</h3> */}
        <h3>DashBoard</h3>
      </header>
    </div>
  );
};

export default Home;
