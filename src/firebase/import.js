import { db } from './config';

export async function getParentsFromZone(zone, callback) {
    let children;
    db.collection("zones").where("title", "==", zone).get().then((docs) => { // get the zone doc
        docs.forEach((doc) => {
            children = doc.data().children;
        })
        callback(children);
    });
}


export async function getTagsFromParents(parents, callback) {

    let tags = [];

    db.collection("tags")
        .where("parent", "in", parents)
        .orderBy("title")
        .get().then((docs) => {
            docs.forEach((doc) => {
                tags.push(doc.data());
            });
            callback(tags);
        })
}


export async function importPicturesWithQuerie(zone, tags, limit, last, callback) {
    if(tags.length >= 2) {
        importPicturesWithMultiplesTag(zone, tags, callback);
    } else {
        importPicturesWithSingleTag(zone, tags, limit, last, callback);
    }
}


function importPicturesWithMultiplesTag(zone, tags, callback) {
    
    let result = []; // the items fetched from the database
    let query;

    query = db.collection("pictures")
        .where("zone", "==", zone)
        .where("tags", "array-contains-any", tags)
        .orderBy("priority")
        .orderBy("date");

    function hasAllTags(arr, arr2) { // little hack to make sure the item contains all tags
        return arr.every(item => arr2.some(item2 => item2.title === item.title));
    }

    query.get().then(snapshots => {

        snapshots.forEach(doc => {
            let item = doc.data();
            item.id = doc.id;
            if (hasAllTags(tags, item.tags)) {
                result.push(item);
            }
        });
        callback(result, "end");
    });
}


function importPicturesWithSingleTag(zone, tags, limit, last, callback) {

    let result = []; // the items fetched from the database
    let lastDoc = null // pagination cursor
    let query;

    if (last === null && tags.length) { // First fetch with tags specified
        query = db.collection("pictures")
            .where("zone", "==", zone)
            .where("tags", "array-contains-any", tags)
            .orderBy("priority")
            .orderBy("date")
            .limit(limit + 1);
    } else if (last === null && !tags.length) { // First fetch with no tags specified
        query = db.collection("pictures")
            .where("zone", "==", zone)
            .orderBy("priority")
            .orderBy("date")
            .limit(limit + 1);
    } else if (last !== null && tags.length) { // Any fetch of a query with tags specified
        query = db.collection("pictures")
            .where("zone", "==", zone)
            .where("tags", "array-contains-any", tags)
            .orderBy("priority")
            .orderBy("date")
            .limit(limit + 1)
            .startAfter(last);
    } else { // Any fetch of a query with no tags specified
        query = db.collection("pictures")
            .where("zone", "==", zone)
            .orderBy("priority")
            .orderBy("date")
            .limit(limit + 1)
            .startAfter(last);
    }

    query.get().then(snapshots => {

        snapshots.forEach((doc) => {
            let item = doc.data();
            item.id = doc.id;
            result.push(item);
        });

        if (result.length === limit + 1) { // if result.lenght < limit then the end of collection have been reached
            lastDoc = snapshots.docs[snapshots.docs.length - 2]; // get the last last doc from the snapshots
            result.pop();
        } else {
            lastDoc = "end"
        }

        callback(result, lastDoc);
    });
}

