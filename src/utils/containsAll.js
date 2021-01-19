export function containsAll(tags, tagsToMatch) {
    tags = makeArrayWithTitles(tags);
    tagsToMatch = makeArrayWithTitles(tagsToMatch);
    tagsToMatch = tagsToMatch.filter(item => !tags.includes(item));
    return tagsToMatch.length === 0; 
}


function makeArrayWithTitles(items) {
    let res = []
    items.forEach(item => {
        res.push(item.title);
    });
    return res;
}