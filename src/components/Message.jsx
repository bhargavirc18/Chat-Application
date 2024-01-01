// import React from 'react'
// import {auth} from '../firebase'

// const style = {
    
//     message: `flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
//     name: `absolute mt-[-4rem] text-gray-600 text-xs`,
//     sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`,
//     received: `bg-[#e5e5ea] text-black float-left rounded-br-full`,
    
    
// }

// const Message = ({message}) => {
//     const messageClass = 
//     message.uid === auth.currentUser.uid
//     ? `${style.sent}`
//     : `${style.received}`
//     return (
//     <div>
//         <div className={`${style.message} ${messageClass}`}>
//             <p className={style.name}>{message.name}</p>
//             <p>{message.text}</p>
//         </div>
//     </div>
//     )
// }

// export default Message



import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

const style = {
  messageContainer: `relative`,
  message: `flex items-center shadow-xl m-5 py-2 px-3 rounded-tl-full rounded-tr-full `,
  name: `absolute mt-[-4rem] text-gray-600 text-xs`,
  sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`,
  received: `bg-[#e5e5ea] text-black float-left rounded-br-full`,
  deleteButtonContainer: `absolute bottom-0 right-0`,
  deleteButton: `cursor-pointer text-sm text-gray-500`,
};

const Message = ({ message }) => {
  const { id, text, uid, name } = message;
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    try {
      if (auth.currentUser.uid === uid) {
        await deleteDoc(doc(db, 'messages', id)); // Delete the message from Firestore
      } else {
        console.log("You don't have permission to delete this message.");
      }
    } catch (error) {
      console.error('Error deleting message: ', error);
    }
  };

  const toggleDeleteOption = () => {
    setShowDelete(!showDelete);
  };

  const messageClass =
    message.uid === auth.currentUser.uid ? `${style.sent}` : `${style.received}`;

  return (
    <div
      className={`${style.messageContainer}`}
      onClick={toggleDeleteOption}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className={`${style.message} ${messageClass}`}>
        <p className={style.name}>{name}</p>
        <p>{text}</p>
      </div>
      {showDelete && auth.currentUser.uid === uid && (
        <div className={`${style.deleteButtonContainer}`}>
          <span className={`${style.deleteButton}`} onClick={handleDelete}>
            Delete
          </span>
        </div>
      )}
    </div>
  );
};

export default Message;
