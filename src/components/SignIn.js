import firebase from "../config/firebase";

const SignIn = ({ auth }) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <button onClick={signInWithGoogle} className="btn btn-primary">
      SignIn with Google
    </button>
  );
};

export default SignIn;
