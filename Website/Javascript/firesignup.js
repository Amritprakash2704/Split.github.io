// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getDatabase, ref , set } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
import { getStorage,ref as rf ,uploadBytes,getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
// import{ref as rf} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js" ;
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
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
  var uid;
// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const auth= getAuth(app);
 const database = getDatabase(app);
 const storage=getStorage(app);
 
// export app1 = initializeApp(firebaseConfig);
// expo analytics1 = getAnalytics(app);

// export const auth = getAuth();

// export let createUserWithEmailAndPassword =createUserWithEmailAndPassword;
const email = document.getElementById('username');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');
const name = document.getElementById('name');
const profilepic= document.getElementById('profilepic');
const form = document.querySelector("#form");

document.getElementById('form').addEventListener("submit",event=>{
  event.preventDefault();


 if(password.value==confirmpassword.value) {createUserWithEmailAndPassword(auth,email.value,password.value).then((userCredential) =>{
   const user= userCredential.user;
   console.log(user);
   console.log(name.value+"test");
   console.log(email.value + "test1");
   const storageRef = rf(storage, "profile-pics/"+user.uid);
   uploadBytes(storageRef, profilepic.files[0]).then((snapshot) => {
     console.log(snapshot.url);
     console.log('Uploaded a blob or file!');
     setTimeout(gotosignin,1000);
   });
  //  let a;
  //  getDownloadURL(storageRef)
  // .then((url) => {
  //   console.log(url);
  //   a=url;
  //  console.log(a);})
  
   set(ref(database, 'users/' + user.uid), {
    name:name.value,
    email: email.value,
    
    
  });
  window.alert("Login successful");
})

  .catch((error)=>{
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    window.alert(errorMessage );
    setTimeout(refresh,1000);
  });

}

else{
  window.alert("password and confirm password fields should have the same input");
  return;
}
//This was not working
// document.getElementById('form').reset();



});
function gotosignin(){
  window.location.replace("../../index.html");
};
function refresh(){
  form.reset();
}


  



