// Redux.
import { combineReducers } from "redux";

// Reducers.
import distGoodsInfoReducer from "./distGoodsInfoReducer";
import GroupValuesReducer from "./GroupValuesReducer";
import distQuestionsReducer from "./distQuestionsReducer";
import authReducer from "./authReducer";

// Firebase Reducer.
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    distGoodsInfo: distGoodsInfoReducer,
    distGroupInfo: GroupValuesReducer,
    distQuestionsInfo: distQuestionsReducer,
    // Store potential auth error.
    auth: authReducer,
    // Firebase
    firebase: firebaseReducer,
    firestore: firestoreReducer,
});

export default rootReducer;
