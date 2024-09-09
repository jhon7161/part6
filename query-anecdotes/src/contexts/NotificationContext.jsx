// contexts/NotificationContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Acción de tipos
const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

// Reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return { ...state, message: action.payload, visible: true };
    case HIDE_NOTIFICATION:
      return { ...state, visible: false };
    default:
      return state;
  }
};

// Contexto
const NotificationContext = createContext();

// Proveedor de contexto
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    message: '',
    visible: false
  });

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
