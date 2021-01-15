import { db, storageRef } from './config';

export async function deletePicture(item, callback) {

    storageRef.child(item.path).delete().then(() => {
        db.collection("pictures").doc(item.id).delete().then(() => {
            callback("success");
        }).catch((error) => {
            console.log(error);
            callback("failure"); 
        })
    }).catch((error) => {
        console.log(error);
        callback("failure");
    })
}


export async function deleteTag(title, parent, callback) {
    db.collection("tags")
        .where("parent", "==", parent)
        .where("title", "==", title)
        .get()
        .then((snapshots) => {
            if(!snapshots.empty) {
                let tag = snapshots.docs[0].ref;

                tag.delete().then(() => {
                    callback("success", "le tag a bien été supprimé !");
                }).catch((error) => {
                    console.log(error);
                    callback("failure", "Le tag n'a pas pu être supprimé.."); 
                }) 
            } else {
                callback("failure", "Aucun tag avec ce parent et ce nom n'existe dans la base de données");
            }
        })
        .catch((error) => {
            console.log(error);
            callback("failure", "Vous n'avez pas la permission de modifier les tags");
        });
}