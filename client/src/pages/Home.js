import React from "react";
import Sidebar from "../components/home/Sidebar";
import Feed from "../components/home/Feed";
import Widget from "../components/home/Widget";
import "./home.css";
const Home = () => {
  return (
    <div className="app__body">
      <Sidebar />
      <Feed />
      <Widget />
    </div>
  );
};

export default Home;
