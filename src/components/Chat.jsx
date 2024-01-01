import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import SendMessage from './SendMessage';
import { db } from '../firebase';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';

const style = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 80px)', // Adjust the height to accommodate the input area
    overflowY: 'auto',
    padding: '10px',
    position: 'relative', // Necessary for absolute positioning of the input area
    marginBottom:'70px'
  },
  fixedInputArea: {
    position: 'fixed',
    bottom: '30px',
    left: '0',
    width: '100%',
    padding: '20px',
    backgroundColor: '#f2f2f2',
  },
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={style.chatContainer} ref={scroll}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div style={style.fixedInputArea}>
        <SendMessage scroll={scroll} />
      </div>
    </div>
  );
};

export default Chat;
