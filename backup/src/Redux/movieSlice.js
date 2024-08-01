import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const api_key = "38ea5e7c8561a585923cb35fd520dfa3";
export const movieDetail = createAsyncThunk(
  "movieDetail",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&page=${page}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(movieDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(movieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = [...state.movies, ...action.payload];
      })
      .addCase(movieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
