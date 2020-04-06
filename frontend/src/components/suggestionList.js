import React from "react";
import "./suggestionList.scss";
import { Card } from "antd";
import Suggestion from "./suggestion";

const SuggestionList = ({ style }) => {
  return (
    <div style={style}>
      <Card title="Suggestions for you" size="small">
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
      </Card>
    </div>
  );
};

export default SuggestionList;
