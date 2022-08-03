const Notification = (props) => {
  const {notif, isWarning} = props
  if (isWarning) {
    return (
      <div>
        <p className='warning'>
          {notif}
        </p>
      </div>
    )
  }
  return (
    <div>
      <p className='notif'>
        {notif}
      </p>
    </div>
  )
}

export default Notification