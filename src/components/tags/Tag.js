import React, { useState } from 'react';

function Tag(props) {
    
    const [selected, setSelected] = useState(props.selected);

    function handleClick() {
        setSelected(!selected);
        props.handleClick();
    }
    
    return(
        <div id={props.id} className={selected ? "tagContainer tagContainerSelected" : "tagContainer"} onClick={handleClick}>
            <p className={selected ? "tagContent paragraph white" : "tagContent paragraph black"}>{props.content}</p>
        </div>
    );
}

export default Tag;