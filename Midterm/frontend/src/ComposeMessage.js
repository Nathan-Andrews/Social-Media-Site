import React from 'react'

function composeMessage (props) {
    return(
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-md-auto">
                    <div>
                        <div>
                            <b>message to {props.toUser}</b>
                        </div>
                        <div>
                            <textarea onChange = {props.onMessageChanged}/>
                        </div>
                        <div>
                            <button className = 'btn btn-primary' onClick = {props.onSend}>send</button>          <button className = 'btn btn-secondary' onClick = {props.cancel}>cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default composeMessage;