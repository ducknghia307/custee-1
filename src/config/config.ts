
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signOut } from "firebase/auth";
import {
  
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDA68XZCifUBE5Xa9hGTkwWc7qMNq-09U8",
  authDomain: "custee-1669e.firebaseapp.com",
  projectId: "custee-1669e",
  storageBucket: "custee-1669e.appspot.com",
  messagingSenderId: "41263234524",
  appId: "1:41263234524:web:2ce7ce2aeeced92d46a319",
  measurementId: "G-RJ256DWZP7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
const provider =  new GoogleAuthProvider();
const storage = getStorage(app);

export {auth,provider,signOut,storage,ref,getDownloadURL,uploadBytes}