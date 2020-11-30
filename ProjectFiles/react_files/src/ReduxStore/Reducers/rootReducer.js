// Redux
import { combineReducers } from 'redux';

// Reducers
import distGoodsInfoReducer from './distGoodsInfoReducer';
import distUserValuationsReducer from './distUserValuationsReducer';

const rootReducer = combineReducers({
    distGoodsInfo: distGoodsInfoReducer,
    distUserValuations: distUserValuationsReducer
})

export default rootReducer;