import React, { createContext, useReducer, useContext } from 'react';

// Acción de tipos
const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

// Reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return { 
        ...state, 
        message: action.payload.message, 
        visible: true,
        type: action.payload.type || 'success',
        timeoutId: action.payload.timeoutId // Guardar el ID del timeout
      };
    case HIDE_NOTIFICATION:
      return { 
        ...state, 
        visible: false,
        timeoutId: null // Limpiar el ID del timeout
      };
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
    visible: false,
    type: 'success', // Tipo por defecto
    timeoutId: null // ID del timeout
  });

  const showNotification = (message, type = 'success') => {
    // Si hay un timeoutId, limpiar el timeout anterior
    if (state.timeoutId) {
      clearTimeout(state.timeoutId);
    }

    // Configurar un nuevo timeout para ocultar la notificación después de 4 segundos
    const id = setTimeout(() => {
      dispatch({ type: HIDE_NOTIFICATION });
    }, 4000); // 4 segundos

    dispatch({ type: SHOW_NOTIFICATION, payload: { message, type, timeoutId: id } });
  };

  return (
    <NotificationContext.Provider value={{ state, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
