import { getAuth } from 'firebase/auth';
import getFirebaseApp from "@/actions/firebaseapp";

const getFirebaseAuth = () => {
    return getAuth(getFirebaseApp());
}

export default getFirebaseAuth;