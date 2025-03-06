import { auth } from './client';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // This gives a Google Access Token that can be used to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const token = credential?.accessToken;

    // The user's sign on info:
    const user = result.user;
    console.warn(user);
  } catch (error) {
    console.error(error);
  }
};

const signOutUser = async () => {
  await signOut(auth);
};

// as keyword renames signOutUser to signOut when exporting. When you import it, you would use the name "signOut".
export { signInWithGoogle, signOutUser as signOut };
