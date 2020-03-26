import React from 'react';

function Message (props) {
    console.log(props);
    return (<div>{props.messageText} {props.lastName}</div>);
};

export default Message;