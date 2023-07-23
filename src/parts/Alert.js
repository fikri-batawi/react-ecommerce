import React from 'react';

const Alert = ({message, type="alert alert-danger"}) => {
    return <div className={type} role="alert"> {message} </div>
}

export default Alert;