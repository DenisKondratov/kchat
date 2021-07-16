import firebase from "../config/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRef, useState } from "react";

const auth = firebase.auth();

const ChatRoom = ({ firestore }) => {
  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(100);

  let [messages] = useCollectionData(query, { idField: "id" });
  const dummy = useRef();

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    if(!formValue.trim()) return

    const { uid, photoURL } = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const SignOut = () => {
    auth.signOut();
  };

  return (
    <>
      <header className="d-flex justify-content-between p-2 bg-primary text-light">
        <h1 className="fs-3">Secret chat for Bodya and Den</h1>
        <button onClick={SignOut} className="btn btn-danger">
          SignOut
        </button>
      </header>
      <div className='mainWrap' style={{overflowX: 'hidden'}}>
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} auth={auth} />
          ))}

        <div ref={dummy}></div>
      </div>

      <form onSubmit={sendMessage} className='d-flex justify-content-center mt-2'>
        <input
        className='form-control w-50 me-2'
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit" className='btn btn-primary'>Send</button>
      </form>
    </>
  );
};

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "send" : "recived";

  return (
    <div className={`shadow-sm p-3 mb-1 bg-body rounded ${messageClass}`}>
      <img style={{width: 50, height: 50, borderRadius: '50%'}} src={photoURL} alt="somePic" />
      <p>{text}</p>
    </div>
  );
}

export default ChatRoom;
