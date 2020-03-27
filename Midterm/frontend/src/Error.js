import React from 'react'

function Error (props) {
    if (!props.error) {
        return null
    }
    if (props.error) {
        return (
            <div>
                <div className="alert alert-danger" role="alert">
                    {props.error}
                </div> 
            </div>
        )
    }
    if (props.sentMessage) {
        return (
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Sent</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
}

export default Error