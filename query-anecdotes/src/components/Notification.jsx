import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const Notification = () => {
  const { state } = useNotification();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderColor: state.type === 'error' ? 'red' : 'lightblue',
    backgroundColor: state.type === 'error' ? '#fdd' : 'lightblue',
    color: state.type === 'error' ? 'red' : 'black',
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
