import React from 'react';

function ButtonLink(props) {

    return(
        <button disabled={props.disabled} id={props.id} className={props.disabled ? props.className + " button buttonLink buttonDisabled" : props.className + " button buttonLink"}>
            <a className="subtitle white" target={ props.blank ? "_blank" : ""} href={props.linkTo}>{props.content}</a>
        </button>
    );
}

export default ButtonLink;