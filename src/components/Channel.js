import React, {useState, useEffect, useRef} from 'react';
import firebase from 'firebase/app';
import { useFirestoreQuery } from '../hooks';

//component
import Message from './Message';


const Channel = ({ user = null}) => {
    //update db
    const db = firebase.firestore();
    //store newMessage
    const [newMessage, setNewmessage] = useState('');
    // store id, name, photo of user
    const {uid, displayName, photoURL} = user;

    // fetch messages from db 
    const messagesRef = db.collection('messages');
    const messages = useFirestoreQuery(
        messagesRef.orderBy('createdAt').limit(100)
    );


// take the value from the input    
const handleOnChange = e => {
    setNewmessage(e.target.value);
};

// add new message to db    
const handleOnSubmit = e => {
    e.preventDefault();
    if(db) {
        db.collection('messages').add({
            text: newMessage,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            displayName,
            photoURL,
        })
    }
}
    return (
        <>
        <ul>
            {messages.map(message => (
                <li key={messages.id}> 
                    <Message { ... message}/> 
                </li>
            ))}
        </ul>
        <form onSubmit={handleOnSubmit}>
            <input
                type="text"
                value={newMessage}
                onChange={handleOnChange}
                placeholder="Votre message ici ..."/>
            <button type ="submit" disabled={!newMessage}>
                Envoyez
            </button>
        </form>

        </>
    );
};

export default Channel;