import React, { useState } from 'react';
import Tag from './Tag';
import SubTag from './SubTag';

function TagSection(props) {

    const [listVisible, setListVisible] = useState(props.parentDefaultSelected);   

    function handleSubTagsVisibility() {
        setListVisible(!listVisible);
        props.removeTagsFromParent(props.parent);
    }

    function checkSubtagDefaultSelected(subtag) {
        if(props.subtagsDefaultSelected.filter(item => item.title === subtag.title).length) {
            return true;
        }
        return false;
    }

    return(
        <div className="tagSectionContainer">
            <Tag selected={props.parentDefaultSelected} content={props.parent} handleClick={() => handleSubTagsVisibility()} />
            { listVisible ?
                <div className="subTagsContainer">
                { props.subtags.map((subtag) => {
                    return(
                        <SubTag 
                            key={subtag.title} 
                            subtag={subtag} 
                            selected={checkSubtagDefaultSelected(subtag)}
                            addSubtag={props.addSubtag} 
                            removeSubtag={props.removeSubtag} 
                        />
                    )
                })} 
                </div> :
                null
            } 
        </div>
    );
}

export default TagSection;