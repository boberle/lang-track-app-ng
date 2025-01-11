import {getAuth} from 'firebase/auth';
import getFirebaseApp from "@/actions/firebaseapp";
import {Auth, connectAuthEmulator} from "@firebase/auth";
import appConfig from "@/const/lta";


let _auth: Auth | null = null;

const getFirebaseAuth = () => {
    if (!_auth) {
        _auth = getAuth(getFirebaseApp());
        if (appConfig.authEmulatorURL != null) {
            connectAuthEmulator(_auth, appConfig.authEmulatorURL);
        }
    }
    return _auth;
}

export default getFirebaseAuth;