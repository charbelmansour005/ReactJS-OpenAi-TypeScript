import { combineReducers, configureStore } from "@reduxjs/toolkit"
import themeReducer from "./themeSlice"

const rootReducer = combineReducers({
  theme: themeReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: rootReducer,
})

export default store
