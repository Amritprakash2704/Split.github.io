import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#id_password');

togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});