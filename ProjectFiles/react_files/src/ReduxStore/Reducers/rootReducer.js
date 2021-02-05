// Redux
import { combineReducers } from "redux";

// Reducers
import distGoodsInfoReducer from "./distGoodsInfoReducer";
import GroupValuesReducer from "./GroupValuesReducer";
import distQuestionsReducer from "./distQuestionsReducer";

const rootReducer = combineReducers({
    distGoodsInfo: distGoodsInfoReducer,
    distGroupInfo: GroupValuesReducer,
    distQuestionsInfo: distQuestionsReducer,
});

export default rootReducer;
