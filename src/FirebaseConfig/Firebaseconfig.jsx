// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMNnsjKLW6VrnVUpDpL3p11IeIR-XcSVo",
  authDomain: "e-commerce-app-e068f.firebaseapp.com",
  projectId: "e-commerce-app-e068f",
  storageBucket: "e-commerce-app-e068f.appspot.com",
  messagingSenderId: "852044448301",
  appId: "1:852044448301:web:56f041d8c7d36535026ea4",
  measurementId: "G-WHF4EZ8VH1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {auth}