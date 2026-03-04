import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0zyqs1BrDKKS7kkq3nqmJSj_VpM6CVcM",
  authDomain: "millionkm-a42ee.firebaseapp.com",
  projectId: "millionkm-a42ee",
  storageBucket: "millionkm-a42ee.firebasestorage.app",
  messagingSenderId: "594685468082",
  appId: "1:594685468082:web:e44c081e0617f0016998ab"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export default firebaseApp;
