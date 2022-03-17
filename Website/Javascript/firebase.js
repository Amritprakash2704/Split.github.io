// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyTYhrssyWhM1P6db_ZS_UYXHzCEupX8g",
  authDomain: "split-662dd.firebaseapp.com",
  projectId: "split-662dd",
  storageBucket: "split-662dd.appspot.com",
  messagingSenderId: "418787962459",
  appId: "1:418787962459:web:ef0be705d33a524630997e",
  measurementId: "G-9ERQKCWY34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

