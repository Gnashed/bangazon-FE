// client.ts is the best place to handle Firebase setup. This means the other files (authContext.tsx, auth.ts, etc.) should import from this module.

// With the newer version of Firebase, you need to use named modular imports when accessing code from the Firebase namespace.
import { initializeApp, getApps, getApp } from 'firebase/app'; // getApp retrieves Firebase App instance.
import { getAuth } from 'firebase/auth';

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.WEB_API_URL,
};

// Initialize Firebase once and reuse the instance
const app = !getApps().length ? initializeApp(clientCredentials) : getApp();
const auth = getAuth(app);

export { app, auth, clientCredentials };
