// Redux
import { combineReducers } from 'redux';

// Reducers
import distGoodsInfoReducer from './distGoodsInfoReducer';
import distQuestionsReducer from './distQuestionsReducer';
import distUserValuationsReducer from './distUserValuationsReducer';

const rootReducer = combineReducers({
    distGoodsInfo: distGoodsInfoReducer,
    distQuestionsInfo: distQuestionsReducer,
    distUserValuations: distUserValuationsReducer
})

export default rootReducer;