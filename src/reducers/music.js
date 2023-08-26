import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  filteredData: [],
  currentTab: '',
  currentlyPlaying: null,
  currentPlaylist: [],
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.data = action.payload;
      state.filteredData = state.data;
    },
    setCurrentPlaylist: state => {
      state.currentPlaylist = state.data;
    },
    setCurrentlyPlaying: (state, action) => {
      state.currentlyPlaying = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
  },
});

export const {
  setCurrentlyPlaying,
  setFilteredData,
  setSongs,
  setCurrentPlaylist,
} = musicSlice.actions;

export default musicSlice.reducer;
