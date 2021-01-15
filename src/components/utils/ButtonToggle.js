import React from 'react';

function ButtonToggle(props) {

    return(
        <button id={props.id} className={props.selected ? props.className + " button buttonToggle buttonSelected" : props.className + " button buttonToggle"} type={props.type} onClick={props.onClick}>
            <p className={props.selected ? "subtitle white" : "subtitle"}>{props.content}</p>
        </button>
    );
}

export default ButtonToggle;