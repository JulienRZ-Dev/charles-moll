import React from 'react';

function ButtonLink(props) {

    return(
        <button id={props.id} className={props.className + " button buttonLink"}>
            <a className="subtitle white" target={ props.blank ? "_blank" : ""} href={props.linkTo}>{props.content}</a>
        </button>
    );
}

export default ButtonLink;