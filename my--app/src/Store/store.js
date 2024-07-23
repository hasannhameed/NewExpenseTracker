import { createStore, combineReducers } from 'redux';
import themeReducer from './themeReducer';
import authReducer from './authSlice'; // Assuming you have an auth reducer

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
