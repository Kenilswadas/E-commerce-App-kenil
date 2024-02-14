// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
//for fireStore
import { getFirestore } from "firebase/firestore";

//for Storage
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAMNnsjKLW6VrnVUpDpL3p11IeIR-XcSVo",
//   authDomain: "e-commerce-app-e068f.firebaseapp.com",
//   projectId: "e-commerce-app-e068f",
//   storageBucket: "e-commerce-app-e068f.appspot.com",
//   messagingSenderId: "852044448301",
//   appId: "1:852044448301:web:56f041d8c7d36535026ea4",
//   measurementId: "G-WHF4EZ8VH1",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCev-Nm6j-6WhP9Yplzz48PVgX2EaqUKgc",
  authDomain: "practiceproject-eb98c.firebaseapp.com",
  projectId: "practiceproject-eb98c",
  storageBucket: "practiceproject-eb98c.appspot.com",
  messagingSenderId: "735512195918",
  appId: "1:735512195918:web:0f015fa3823ce0ceda641f",
  measurementId: "G-RX00TKHB01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app); //Storage

export { auth, db, storage };
