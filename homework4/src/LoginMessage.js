import React from "react";

function LoginMessage (props) {
    return (
        <b><font color="red">{props.errorMessage}</font></b>
    );
};

export default LoginMessage;