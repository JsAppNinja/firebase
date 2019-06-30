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
    this.dbUser = {};
    this.mainAccountType = null;
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
  createUserFireStore(data, accountType, uid) {
    return this.db.collection(accountType).doc(uid).set(data);
  }

  addToUserList(uid, accountStatus) {
    return this.db.collection("userlist").doc(uid).set(accountStatus);  
  }

  setUserData(uid) {
    return this.db.doc(`userlist/${uid}`).get()
      .then((doc) => {
        if(doc.exists) {
          console.log(doc.data())
          
          var type = doc.data().type;
          this.mainAccountType = type;
          return this.db.doc(`${type}/${uid}`).get()
        } else {
          throw new Error("Auth state changed before mainAccountType was fetched");
        }
      })
  }

  //user = uid => this.db.ref(`users/${uid}`);
}

export default Firebase;
