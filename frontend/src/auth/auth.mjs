import {initializeApp} from 'firebase/app';
import {GoogleAuthProvider, getAuth, signInWithPopup}  from 'firebase/auth';
import {getFirestore, query,collection, where, getDocs, addDoc} from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDwvCy5S_Otq2PNbk1oKtdW0UfHDiBYSDQ",
    authDomain: "provault-codex.firebaseapp.com",
    projectId: "provault-codex",
    storageBucket: "provault-codex.appspot.com",
    messagingSenderId: "809319086092",
    appId: "1:809319086092:web:7cee331677c90bb9481629"
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth,provider);
        const user = res.user;
        const getUsersListQuery = query(collection(db, 'users'), where("uid", "==", user.uid));
        const docs =  await getDocs(getUsersListQuery);
        if (docs.docs.length === 0 ) {
            await addDoc(collection(db, 'users'), {
                uuid : user.uid,
                displayName : user.displayName,
                authProvider : 'google',
                email : user.email,   
            });
        }  
    } catch (err) {
        console.error('Error signing in with google', err);
        alert("Error signing in with google")
    }
};

