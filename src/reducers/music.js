import { createSlice } from '@reduxjs/toolkit';

import { MUSIC_LIST } from '@/mocks/musicList';

const initialState = {
  data: MUSIC_LIST,
  filteredData: MUSIC_LIST,
  currentTab: '',
  currentlyPlaying: null,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setCurrentlyPlaying: (state, action) => {
      state.currentlyPlaying = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
  },
});

export const { setCurrentlyPlaying, setFilteredData } = musicSlice.actions;

export default musicSlice.reducer;
