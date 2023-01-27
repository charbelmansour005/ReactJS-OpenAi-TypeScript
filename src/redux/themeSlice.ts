import { createSlice } from "@reduxjs/toolkit"

type InitialThemeState = {
  darkTheme: boolean
}

const initialState: InitialThemeState = {
  // light theme = default
  darkTheme: true,
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme
    },
  },
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
