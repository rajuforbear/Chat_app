import {createSlice} from '@reduxjs/toolkit';
import {Contact} from 'react-native-contacts';
interface intialStates {
  screens: {
    current: string;
    prev: string;
  };
  MyContacs: Contact[];
  Contact: Contact;
}
const initialState: intialStates = {
  screens: {
    current: '',
    prev: '',
  },
  MyContacs: [],
  Contact: {} as Contact,
};
const chalSlice = createSlice({
  name: 'myChat',
  initialState,
  reducers: {
    setScreens: (state, action) => {
      return {...state, screens: action.payload};
    },
    setContatcts: (state, action) => {
      return {...state, MyContacs: action.payload};
    },
    getContact: (state, action) => {
      return {...state, Contact: action.payload};
    },
  },
});
export default chalSlice.reducer;
