const Notification = ({ message }) => {
  if (message.content === null) {
    return null
  }

  return (
    <div className={`notification ${message.type}`}>
      {message.content}
    </div>
  )
}

export default Notification