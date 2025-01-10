import {Auth, connectAuthEmulator} from "@firebase/auth";
// @ts-ignore
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import appConfig from "@/const/lta";
import getFirebaseApp from "@/actions/firebaseapp";

let _auth: Auth | null = null;

const getFirebaseAuth = () => {
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

export default getFirebaseAuth;