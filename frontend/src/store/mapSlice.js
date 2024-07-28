import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Default to Lahore, Pakistan
  coordinates: { 
    lat: 31.5497,
    lng: 74.3436,
  },
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapCoordinates(state, action) {
      state.coordinates = action.payload;
    },
    clearMapCoordinates(state) {
      state.coordinates = null;
    },
  },
});

export const { setMapCoordinates, clearMapCoordinates } = mapSlice.actions;
export const selectCoordinates = (state) => state.map.coordinates;
export default mapSlice.reducer;
