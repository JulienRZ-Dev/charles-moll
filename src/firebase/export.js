import { db, storageRef } from './config';
import { uuidv4 } from '../utils/uuid';


// EXPORT NEW TAG
export async function exportNewTag(tag, parent, callback) {

    db.collection("tags").where("title", "==", tag).get().then((res) => {
        if(!res.empty) {
            callback("failure", "Ce tag existe déjà");
        } else {
            db.collection("tags").add({
                title: tag,
                parent: parent  
            }).then(() => {
                callback("success", "Le tag a bien été ajouté !");
            }).catch((e) => {
                console.log(e.message);
                callback("failure", "Vous n'avez pas la permission de modifier les tags");
            });
        }
    });
}



// EXPORT PICTURE
export async function exportPicture(item, callback) {
    
    // STORAGE
    
    let downloadURL;
    let storageKey = uuidv4();
    
    let path = item.zone + "/" + storageKey; // SET THE PATH FOR THE PICTURE TO BE STORED
    const snapshot = await storageRef.child(path).put(item.picture); 
    downloadURL = await snapshot.ref.getDownloadURL(); // GET THE DOWNLOAD URL
    item.picture = downloadURL;
    item.path = path;
    item.likes = 0;
    item.date = Date.now();

    // FIRESTORE

    db.collection("pictures").add(item).then(() => {
        callback("success");
    }).catch((e) => {
        callback("failure");
    });
}