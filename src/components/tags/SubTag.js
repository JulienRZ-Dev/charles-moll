import React, { useState } from 'react';

function SubTag(props) {
    
    const [selected, setSelected] = useState(props.selected);

    function handleClick(subtag) {
        if(selected) {
            props.removeSubtag(subtag);
        } else {
            props.addSubtag(subtag);
        } 
        setSelected(!selected);
    }
    
    return(
        <div className={selected ? "subTagContainer subTagContainerSelected" : "subTagContainer"} onClick={() => handleClick(props.subtag)}>
            <p className={selected ? "paragraph white" : "paragraph black"}>{props.subtag.title}</p>
        </div>
    );
}

export default SubTag;