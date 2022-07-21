import {configureStore} from '@reduxjs/toolkit';
import {loginButtonSlice} from "./component/features/loginButton/loginButtonSlice";
import thunk from 'redux-thunk';

export default configureStore({
  reducer: {
    loggedIn: loginButtonSlice
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})