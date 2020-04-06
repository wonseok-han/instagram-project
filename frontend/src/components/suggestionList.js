import React, { useState, useEffect } from "react";
import "./suggestionList.scss";
import { Card } from "antd";
import Suggestion from "./suggestion";
// import Axios from "axios";
import useAxios from "axios-hooks";
import { useAppContext } from "store";

const SuggestionList = ({ style }) => {
  const {
    store: { jwtToken }
  } = useAppContext();
  // const [userList, setUserList] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data: userList, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/accounts/suggestions/",
    headers
  });

  // useEffect(() => {
  //   async function fetchUserList() {
  //     const apiUrl = "http://localhost:8000/accounts/suggestions/";
  //     const headers = { Authorization: `JWT ${jwtToken}` };
  //     try {
  //       const { data } = await Axios.get(apiUrl, { headers });
  //       setUserList(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchUserList();
  // }, []);

  return (
    <div style={style}>
      {loading && <div>Loading ... </div>}
      {error && <div>로딩 중에 에러가 발생했습니다.</div>}
      <button onClick={() => refetch()}>Reload</button>
      <Card title="Suggestions for you" size="small">
        {userList &&
          userList.map(suggestionUser => (
            <Suggestion
              key={suggestionUser.username}
              suggestionUser={suggestionUser}
            />
          ))}
      </Card>
    </div>
  );
};

export default SuggestionList;
