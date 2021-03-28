import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const firebaseInitialize = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}
export const fbProviderFirebase = () => new firebase.auth.FacebookAuthProvider();
export const googleProviderFirebase = () => new firebase.auth.GoogleAuthProvider();
export const ghProviderFirebase = () => new firebase.auth.GithubAuthProvider();
export const twitterProviderFirebase = () => new firebase.auth.TwitterAuthProvider();;

export const signInWithProvidersFirebase = provider => {
    return firebase.auth()
        .signInWithPopup(provider)
        .then(result => result.user)
        .catch(error => error);
}
export const createNewUser = (userInfo, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            updateUserInfo(userInfo);
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = 'User created successfully!';
            return newUserInfo;
        })
        .catch(error => {
            const errorMessage = error.message;
            const newUserInfo = {};
            newUserInfo.error = errorMessage;
            newUserInfo.success = '';
            return newUserInfo;
        })
}
const updateUserInfo = info => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: info.name,
        photoURL: "https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png"
    }).then(() => {
        // console.log('update successfully');
    }).catch(error => {
        // console.log('error', error);
    });

}

export const handleLogin = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = 'User Login successfully!';
            return newUserInfo;
        })
        .catch(error => {
            const errorMessage = error.message;
            const newUserInfo = {};
            newUserInfo.error = errorMessage;
            newUserInfo.success = '';
            return newUserInfo;
        });
}