import {configureStore} from '@reduxjs/toolkit';
import chatReducre from '../../reducers';
const store = configureStore({
  reducer: {
    data: chatReducre,
  },
});
export type rootState = ReturnType<typeof store.getState>;
export default store;
