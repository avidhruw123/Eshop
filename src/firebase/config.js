
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';



export const firebaseConfig = {
  apiKey: "AIzaSyBLXMk6yB51Fa1lf3csitm40CgzU2g9zsQ",
  authDomain: "eshop-fc1d8.firebaseapp.com",
  projectId: "eshop-fc1d8",
  storageBucket: "eshop-fc1d8.appspot.com",
  messagingSenderId: "15224427838",
  appId: "1:15224427838:web:80a4c4ef1f6a5b1795c86f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
