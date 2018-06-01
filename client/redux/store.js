import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducer1 from './reducers/reducer1.js';
import reducer2 from './reducers/reducer2.js';
//import all reducers
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

//combine reducers into a root reducer
// reducer should be matched up with its field on state
const rootReducer = combineReducers({
    fieldOnState: reducer1,
    fieldOnState2: reducer2
})

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
);

export default store;
