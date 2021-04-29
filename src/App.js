import React, {useState, useEffect} from 'react';
// firebase dependency
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// my components
import Button from './components/Button';
import Channel from './components/Channel';


//Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDd_Q9wYVInyEsd3gr5OoW0sf6WJs7qYng",
  authDomain: "chat-app-7ebc2.firebaseapp.com",
  projectId: "chat-app-7ebc2",
  storageBucket: "chat-app-7ebc2.appspot.com",
  messagingSenderId: "324126860002",
  appId: "1:324126860002:web:a2e19ff9327a8b0bf434bb",
  measurementId: "G-LS9JNFGYMR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function App() {
    // if user has already connected
  const [user,  setUser] = useState(() => auth.currentUser); 
  const [initializing, setInitializing] = useState(true);  

    // check user current state of authentication and receive an event when that state changed
  useEffect(()=> {
      const unsubscribe = auth.onAuthStateChanged( user => {
        if (user) {
            setUser(user);
        } else {
          setUser(null);
        }

        if (initializing) {
          setInitializing(false);
        }
    // clear subscription 
    return unsubscribe;  
    })
  }, [])

    // signin using google account
  const signInWithGoogle = async () => {
    // Fetch google auth provider
    const provider = new firebase.auth.GoogleAuthProvider();
    // Start sign-in
    try {
      await auth.signInWithPopup(provider);
    }catch(error){
      console.log(error.message);
    }
  };

  //sign out method
  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (initializing) return "Loading ...";

  return (
      <div>
        {user ? (
          <>
            <Button onClick={signOut}> Déconnexion </Button>
            <p>Bienvenue au chat</p>
            <Channel user={user}/>
              
          </>
        ) : (
          <Button onClick={signInWithGoogle}> S'identifier avec Google
        </Button>
        )}

        
      </div>
  );
}

export default App;
