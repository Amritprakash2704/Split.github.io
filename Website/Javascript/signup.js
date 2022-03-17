import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
const auth = getAuth();
function fillform(){
    const email= document.getElementById('username');
    const password= document.getElementById('password');
    const confirmpassword= document.getElementById('confirmpassword');
    if(password.value==confirmpassword.value){
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
     
    }else{
        window.alert("password and confirm password fields should match");
    }
}


