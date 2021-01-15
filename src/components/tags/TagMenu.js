import React from 'react';

import TagSection from './TagSection';


function TagMenu(props) {

    function getRelatedTags(parent) {
        let relatedTags = [];
        props.tags.forEach(tag => {
            if(tag.parent === parent) {
                relatedTags.push(tag);
            }
        });
        return relatedTags;
    }

    function checkParentSelected(parent) {
        if(props.defaultTags.filter(item => item.parent === parent).length) {
            return true;
        }
    }

    return(
        <div id="tagsContainer">
        { props.parents.map((parent) => {
            return(   
                <TagSection 
                    key={parent}
                    selected={props.selected} // selected state must be managed by AlbumPage 
                    parent={parent} 
                    parentDefaultSelected={checkParentSelected(parent)}
                    subtags={getRelatedTags(parent)} 
                    subtagsDefaultSelected={props.defaultTags}
                    addSubtag={props.addSubtag} 
                    removeSubtag={props.removeSubtag} 
                    removeTagsFromParent={props.removeTagsFromParent}
                />
            );
        })}
    </div>
    );
}

export default TagMenu;