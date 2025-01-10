import {FirebaseApp, initializeApp} from "firebase/app";
// @ts-ignore
import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import appConfig from "@/const/lta";

let _app: FirebaseApp | null = null;

const getFirebaseApp = () => {
    if (!_app) {
        _app = initializeApp({apiKey: appConfig.firebaseAPIKey, projectId: appConfig.projectId});
    }
    return _app;
}

export default getFirebaseApp;