import {FirebaseApp, initializeApp} from "firebase/app";
import {Auth, connectAuthEmulator, signInWithEmailAndPassword, User} from "@firebase/auth";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import appConfig from "@/const/lta";

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

const getFirebaseApp = () => {
    if (!_app) {
        _app = initializeApp({apiKey: appConfig.firebaseAPIKey, projectId: appConfig.projectId});
    }
    return _app;
}

export const getFirebaseAuth = () => {
    if (!_auth) {
        _auth = initializeAuth(getFirebaseApp(), {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        });
        if (appConfig.authEmulatorURL != null) {
            connectAuthEmulator(_auth, appConfig.authEmulatorURL);
        }
    }
    return _auth;
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