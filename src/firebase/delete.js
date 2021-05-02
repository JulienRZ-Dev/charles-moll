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

export async function deletePicturesFromTags(tags, zone) {
    
    let message = "Etes vous sur de vouloir supprimer les photos avec les tags : ";
    
    tags.forEach((tag) => {
        message += (tag.title + " ");
    });

    message += "?";

    if(window.confirm(message)) {
        let result = []; // the items fetched from the database
        let query;
    
        query = db.collection("pictures")
            .where("zone", "==", zone)
            .where("tags", "array-contains-any", tags)
            .orderBy("priority");
    
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
    
            result.forEach((item) => {
                deletePicture(item, (message) => console.log(message));
            });
        });
    } else {
        console.log("test");
    }
}


export async function deleteTag(title, parent, callback) {
    let tag = {title: title, parent: parent};
    db.collection("pictures")
        .where("tags", "array-contains", tag)
        .get()
        .then((snapshots) => {
            snapshots.forEach((snapshot) => {
                deletePicture(snapshot.data(), (message) => console.log(message));
            });
        })
        .catch((error) => {
            console.log(error);
            callback("failure", "Vous n'avez pas la permission de modifier les tags");
        });

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