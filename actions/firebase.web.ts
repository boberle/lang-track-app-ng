import {FirebaseApp, initializeApp} from "firebase/app";
import firebaseConfig from "../const/firebase_config";
import {Auth, signInWithEmailAndPassword, User} from "@firebase/auth";
import { getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

let _app: FirebaseApp | null = null;

const getFirebaseApp = () => {
    if (!_app) {
        _app = initializeApp(firebaseConfig);
    }
    return _app;
}

export const getFirebaseAuth = () => {
    return getAuth(getFirebaseApp());
}


export const login = async (username: string, password: string) => {
    const auth = getFirebaseAuth();

    try {
        await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
        console.error(error);
        throw new Error("Login failed");
    }
}

export const logout = async () => {
    const auth = getFirebaseAuth()
    await auth.signOut();
}


export default getFirebaseApp;