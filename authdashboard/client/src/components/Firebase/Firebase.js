import app from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIlmVETy3dJn4M2BiIFdgneT-suhpwYnE",
  authDomain: "olsdata-550ld.firebaseapp.com",
  databaseURL: "https://olsdata-550ld.firebaseio.com",
  projectId: "olsdata-550ld",
  storageBucket: "olsdata-550ld.appspot.com",
  messagingSenderId: "482690254036",
  appId: "1:482690254036:web:6f0ea140326ab07e"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  // Auth
  createUser(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  
  signInUser(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOutUser() {
    this.auth.signOut();
  }

  passwordReset(email) {
    return this.auth.sendPasswordResetEmail(email);
  }

  passwordUpdate(password) {
    return this.auth.currentUser.updatePassword(password);
  }
 
  sendEmailVerification() {
    return this.auth.currentUser.sendEmailVerification();
  }

  // Firestore
  createUserFireStore(data) {
    return this.db.collection("users").add(data);
  }
}

export default Firebase;
