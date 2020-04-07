import React, { useState, useEffect, useMemo } from "react";
import "./suggestionList.scss";
import { Card } from "antd";
import Suggestion from "./suggestion";
import Axios from "axios";
import useAxios from "axios-hooks";
import { useAppContext } from "store";

const SuggestionList = ({ style }) => {
  // const [userList, setUserList] = useState([]);

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

  const {
    store: { jwtToken }
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data: origUserList, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/accounts/suggestions/",
    headers
  });

  const [userList, setUserList] = useState([]);
  useEffect(() => {
    if (!origUserList) {
      setUserList([]);
    } else {
      setUserList(origUserList.map(user => ({ ...user, is_follow: false })));
    }
  }, [origUserList]);

  const onFollowUser = username => {
    const data = { username };
    const config = { headers };
    Axios.post("http://localhost:8000/accounts/follow/", data, config)
      .then(reponse => {
        setUserList(prevUserList => {
          return prevUserList.map(user => {
            if (user.username === username) {
              return { ...user, is_follow: true };
            } else {
              return user;
            }
          });
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div style={style}>
      {loading && <div>Loading ... </div>}
      {error && <div>로딩 중에 에러가 발생했습니다.</div>}
      <button onClick={() => refetch()}>Reload</button>
      <Card title="Suggestions for you" size="small">
        {userList.map(suggestionUser => (
          <Suggestion
            key={suggestionUser.username}
            suggestionUser={suggestionUser}
            onFollowUser={onFollowUser}
          />
        ))}
      </Card>
    </div>
  );
};

export default SuggestionList;
