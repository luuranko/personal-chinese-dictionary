const Notification = (props) => {
  const {notif, isWarning} = props
  const className = isWarning? 'warning' : 'notif'
  const visibility = notif === ''? 'hidden' : 'visible'
  return (
    <div
      className={className}
      id='notification'
      style={{visibility: visibility, display: 'block'}}
    >
      <div>
        {notif}
      </div>
    </div>
  )
}

export default Notification