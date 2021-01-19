import { db } from './config';
import { containsAll } from '../utils/containsAll.js';

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

    let result = []; // the items fetched from the database
    let lastDoc = null // pagination cursor
    let query;

    if (last === null && tags.length) { // First fetch with tags specified
        query = db.collection("pictures")
            .where("zone", "==", zone)
            .where("tags", "array-contains-any", tags)
            .orderBy("priority")
            .limit(limit);
    } else if (last === null && !tags.length) { // First fetch with no tags specified
        query = db.collection("pictures") 
            .where("zone", "==", zone)
            .orderBy("priority")
            .limit(limit);
    } else if (last !== null && tags.length) { // Any fetch of a query with tags specified
        query = db.collection("pictures")
            .where("zone", "==", zone)
            .where("tags", "array-contains-any", tags)
            .orderBy("priority")
            .limit(limit)
            .startAfter(last);
    } else { // Any fetch of a query with no tags specified
        query = db.collection("pictures")
            .where("zone", "==", zone)
            .orderBy("priority")
            .limit(limit)
            .startAfter(last);
    }


    query.get().then(snapshots => {
        snapshots.forEach(doc => {
            let item = doc.data();
            item.id = doc.id;
            if(containsAll(item.tags, tags)) { // little hack to make sure the item contains all tags 
                result.push(item);
            }     
        }); 
        

        if(result.length === limit) { // if result.lenght < limit then the end of collection have been reached
            lastDoc = snapshots.docs[snapshots.docs.length - 1]; // get the last doc from the snapshots
        } else {
            lastDoc = "end"
        }   

        callback(result, lastDoc);
    });
}