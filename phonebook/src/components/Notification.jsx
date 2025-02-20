
const Notification = ({ message }) => {
   
    if (message === null) {
        return null
    }
    const notificationStyle = {
        color: 'green',
        background: 'aliceBlue',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
    }

    return(
        <div className='notification' style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification