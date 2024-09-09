import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const Notification = () => {
  const { state } = useNotification();

  // Define estilos para mensajes de error y éxito
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderColor: state.type === 'error' ? 'red' : 'lightblue', // Borde en rojo para errores
    backgroundColor: state.type === 'error' ? '#fdd' : 'lightblue', // Fondo en rojo claro para errores
    color: state.type === 'error' ? 'red' : 'black', // Texto en rojo para errores
    marginBottom: 5,
    display: state.visible ? 'block' : 'none'
  };

  return (
    <div style={style}>
      {state.message}
    </div>
  );
};

export default Notification;
