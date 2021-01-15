import { db, storageRef } from './config';

export async function updatePicture(item, callback) {

    if(item.picture instanceof File) {
        storageRef.child(item.path).delete().then(() => {

            storageRef.child(item.path).put(item.picture).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    item.picture = downloadURL;
        
                    db.collection("pictures").doc(item.id).update(item).then(() => {
                        callback("success");
                    }).catch((error) => {
                        console.log(error);
                        callback("failure");
                    })
                }) 
            })
        }).catch((error) => {
            console.log(error);
            callback("failure");
        })
    } else {
        db.collection("pictures").doc(item.id).update(item).then(() => {
            callback("success");
        }).catch((error) => {
            console.log(error);
            callback("failure");
        })
    }
}

export function updateLikes(id, likes) {
    db.collection("pictures").doc(id).update({
        likes: likes
    }).catch((error) => {
        console.log(error);
    })
}