// Redux
import { combineReducers } from 'redux';

// Reducers
import distGoodsInfoReducer from './distGoodsInfoReducer';
import distGroupInfoReducer from './distGroupInfoReducer';
import distQuestionsReducer from './distQuestionsReducer';

const rootReducer = combineReducers({
    distGoodsInfo: distGoodsInfoReducer,
    distGroupInfo: distGroupInfoReducer,
    distQuestionsInfo: distQuestionsReducer
})

export default rootReducer;