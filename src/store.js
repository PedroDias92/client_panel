import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Reducers
//@todo

const firebaseConfig = {
  apiKey: "AIzaSyBrfioqDZ1YlXsew5xZQAkBwJNGuI48vaE",
  authDomain: "reactclientpanel-a05e1.firebaseapp.com",
  databaseURL: "https://reactclientpanel-a05e1.firebaseio.com",
  projectId: "reactclientpanel-a05e1",
  storageBucket: "reactclientpanel-a05e1.appspot.com",
  messagingSenderId: "186458698104"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();
/* const settings = { timestampsInSnapshots: true };
firestore.settings(settings); */

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Check for settings in localStorage

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
