import React, { useContext, useEffect, useReducer, useState } from 'react';
import { features } from '../models/features';
import reducer from '../redux/reducer';
import { DELETE_TEXTS, SET_CONTENT, HANDLE_COPY } from '../redux/actions';

const initialState = {
  content: '',
  isCopied: false,
  number: null,
  maxNumberForTextArea: 10000,
  maxNumber: 100000,
  fileSize: '0'
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const deleteTexts = () => {
    dispatch({ type: DELETE_TEXTS });
  };
  const handleCopy = () => {
    dispatch({ type: HANDLE_COPY, payload: true });
    setTimeout(() => {
      dispatch({ type: HANDLE_COPY, payload: false });
    }, 1000);
  };
  const handleState = (type, content) => {
    dispatch({ type: type, payload: content });
  };
  const getFeature = (category) => {
    return features.filter((item) => item.name === category)[0];
  }
  return (
    <AppContext.Provider
      value={{ ...state, handleState, deleteTexts, handleCopy, getFeature }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
