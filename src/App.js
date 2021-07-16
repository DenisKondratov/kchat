import firebase from './config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import ChatRoom from './components/ChatRoom';
import SignIn from './components/SignIn';

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {

  const [ user ] = useAuthState(auth)
  console.log(auth.currentUser)
  return (
    <>
      <header>


      </header>

      <section className='w-50 shadow-lg p-3 mb-5 bg-body rounded' style={{margin: '0 auto'}}>
        { user ? <ChatRoom auth={auth} firestore={firestore} /> : <SignIn auth={auth} user={user}/>}
      </section>
    </>
  );
}

export default App;
