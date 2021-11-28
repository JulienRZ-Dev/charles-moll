import { auth } from './config';


export function getAdminAuthState() {
    
    let user = auth.currentUser;
    
    if(user && user.uid === "wrdikO8SKudzndRsmu35HGBpzVQ2") {
        return true;
    } else {
        return false;
    }
}


export function signIn(email, password, callback) {
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            callback(true);
        })
        .catch(function () {
            callback(false);
        });
}


export function userAuth(password, callback) {
    auth.signInWithEmailAndPassword("family.moll@gmail.com", password)
        .then(() => {
            callback(true);
        })
        .catch(function () {
            callback(false);
        });
}


export function signOut(callback) {
    auth.signOut()
        .then(() => {
            callback(true);
        })
        .catch((error) => {
            console.log(error);
            callback(false);
        })
}