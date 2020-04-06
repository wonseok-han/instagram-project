import React from "react";
import { Input, Menu } from "antd";
import "./layout.scss";
import StoryList from "./storyList";
import SuggestionList from "./suggestionList";
import LogoImage from "assets/instagram_logo.png";

const Layout = ({ children, ...props }) => {
  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">
          <img src={LogoImage} alt="logo" style={{ width: "100px" }} />
        </h1>
        <div className="search">
          <Input.Search />
        </div>
        <div className="topnav">
          <Menu mode="horizontal">
            <Menu.Item>메뉴1</Menu.Item>
            <Menu.Item>메뉴2</Menu.Item>
            <Menu.Item>메뉴3</Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="sidebar">
        <StoryList style={{ marginBottom: "1rem" }} />
        <SuggestionList></SuggestionList>
      </div>
      <div className="contents">{children}</div>
      <div className="footer">&copy; 2020. Han Won Seok</div>
    </div>
  );
};

export default Layout;
