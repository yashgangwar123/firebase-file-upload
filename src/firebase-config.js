import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBlx2hN3zr1DqJrvIp8XnPn06ETDleLcIM",
    authDomain: "fir-upload-dowmload.firebaseapp.com",
    projectId: "fir-upload-dowmload",
    storageBucket: "fir-upload-dowmload.appspot.com",
    messagingSenderId: "718768924403",
    appId: "1:718768924403:web:fadc7dcf47e36da4b7b986"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const db = getFirestore();

export {firebaseApp, storage, db};