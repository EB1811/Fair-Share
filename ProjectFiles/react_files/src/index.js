import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";

// Redux
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./ReduxStore/Reducers/rootReducer";

// Firebase
import fbConfig from "./FirebaseConfig/fbConfig";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance, reduxFirestore } from "redux-firestore";

// Start firebase firestore.
firebase.firestore();

// Setting up firebase with redux.
const createStoreWithFirebase = compose(
    reduxFirestore(firebase) // firebase instance as first argument, rfConfig as optional second
)(createStore);
const reduxStore = createStoreWithFirebase(rootReducer);

// React-Redux-Firebase.
const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true,
};
const rrfProps = {
    firebase,
    config: fbConfig,
    // eslint-disable-next-line
    config: rrfConfig,
    dispatch: reduxStore.dispatch,
    createFirestoreInstance,
};

ReactDOM.render(
    <Provider store={reduxStore}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <Router>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </Router>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// expose store when run in Cypress
if (window.Cypress) {
    window.store = reduxStore;
}
