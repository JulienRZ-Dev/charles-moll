import React from 'react';

function Button(props) {
    return(
        <button id={props.id} className={props.className + " button"} type={props.type} onClick={props.onClick}>
            <p className="subtitle white">{props.content}</p>
        </button>
    );
}

export default Button;