// firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithPopup } from "firebase/auth";

// פרטי פרויקט שלך
const firebaseConfig = {
  apiKey: "AIzaSyCQrFy3mYnu7_w16LlhDXwlvNCwJCd3Q48",
  authDomain: "login-in-13d77.firebaseapp.com",
  projectId: "login-in-13d77",
  storageBucket: "login-in-13d77.firebasestorage.app",
  messagingSenderId: "1084099753676",
  appId: "1:1084099753676:web:296210f9624dad4bb9f469",
  measurementId: "G-D71143EHSY"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithRedirect, getRedirectResult, signInWithPopup };
