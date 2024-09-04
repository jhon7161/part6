// src/components/Notification.jsx
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification ? '' : 'none' // Ocultar si no hay notificación
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
