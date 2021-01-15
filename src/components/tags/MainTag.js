import React from 'react';

function MainTag(props) {
    return(
        <div id={props.id} className={props.selected ? "tagContainer tagContainerSelected" : "tagContainer"} onClick={props.handleClick}>
            <p className={props.selected ? "tagContent paragraph white" : "tagContent paragraph black"}>{props.content}</p>
        </div>
    );
}
export default MainTag;