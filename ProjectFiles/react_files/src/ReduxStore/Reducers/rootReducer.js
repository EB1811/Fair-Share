// Redux
import { combineReducers } from 'redux';

// Reducers
import distGoodsInfoReducer from './distGoodsInfoReducer';
import distGroupInfoReducer from './distGroupInfoReducer';
import distQuestionsReducer from './distQuestionsReducer';
import distUserValuationsReducer from './distUserValuationsReducer';

const rootReducer = combineReducers({
    distGoodsInfo: distGoodsInfoReducer,
    distGroupInfo: distGroupInfoReducer,
    distQuestionsInfo: distQuestionsReducer,
    distUserValuations: distUserValuationsReducer
})

export default rootReducer;