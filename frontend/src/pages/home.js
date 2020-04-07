import React from "react";
import { useHistory } from "react-router-dom";
import PostList from "components/postList";
import Layout from "components/layout";
import StoryList from "components/storyList";
import SuggestionList from "components/suggestionList";
import { Button } from "antd";

const Home = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/posts/new");
  };
  const sidebar = (
    <>
      <Button
        type="primary"
        block
        style={{ marginBottom: "1rem" }}
        onClick={handleClick}
      >
        새 포스팅 쓰기
      </Button>
      <StoryList style={{ marginBottom: "1rem" }} />
      <SuggestionList></SuggestionList>
    </>
  );
  return (
    <Layout sidebar={sidebar}>
      <PostList />
    </Layout>
  );
};

export default Home;
