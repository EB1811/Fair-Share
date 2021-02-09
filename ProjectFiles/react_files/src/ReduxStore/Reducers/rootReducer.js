// Redux.
import { combineReducers } from "redux";

// Reducers.
import distGoodsInfoReducer from "./distGoodsInfoReducer";
import GroupValuesReducer from "./GroupValuesReducer";
import distQuestionsReducer from "./distQuestionsReducer";

// Firebase Reducer.
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    distGoodsInfo: distGoodsInfoReducer,
    distGroupInfo: GroupValuesReducer,
    distQuestionsInfo: distQuestionsReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
});

export default rootReducer;
