import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

function Display (props) {
    return (
        <div className = 'container'>
            <div className="row justify-content-md-center">
                <div className="col-md-auto">
                <h1>underminerman's command complicator</h1>
                </div>
                <div className="col-sm-auto">
                    <div>
                        <textarea placeholder = "command input" onChange = {props.onTextChange} rows = "6"/>                 <textarea placeholder = "output" value = {props.output} rows = "6"/>
                    </div>
                    <div className='col-md-auto'>   <button onClick = {props.submit} type="button" className="btn btn-outline-primary">complicate</button></div>
                </div>
            </div>
        </div>
    )
}

export default Display;