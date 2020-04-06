import React, { createContext, useContext } from "react";
// import useLocalStorage from "utils/useLocalStorage";
import { getStorageItem, setStorageItem } from "utils/useLocalStorage";
// https://www.npmjs.com/package/use-reducer-with-side-effects
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
  Update
} from "use-reducer-with-side-effects";

const initialState = {
  jwtToken: ""
};

const AppContext = createContext();

const reducer = (prevState, action) => {
  const { type } = action;

  if (type === SET_TOKEN) {
    const { payload: jwtToken } = action;
    const newState = {
      ...prevState,
      jwtToken
    };
    // http 통신이나 파일저장이 필요하면 UpdateWithSideEffect 사용
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtToken", jwtToken);
    });
  } else if (type === DELETE_TOKEN) {
    const newState = {
      ...prevState,
      jwtToken: ""
    };
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtToken", "");
    });
  }
  //TODO...
  return prevState;
};

export const AppProvider = ({ children }) => {
  const [store, dispatch] = useReducerWithSideEffects(reducer, {
    jwtToken: getStorageItem("jwtToken", "")
  });
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

// Actions
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

// Action Creator
export const setToken = token => ({ type: SET_TOKEN, payload: token });
export const deleteToken = () => ({ type: DELETE_TOKEN });
