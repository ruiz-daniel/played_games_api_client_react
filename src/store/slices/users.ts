import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../models/User"
import { RootState } from "../store"

type UserSliceType = {
  user?: User
}

const initialState: UserSliceType = {}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    removerUser(state) {
      state.user = undefined
    }
  }
})

export const {setUser, removerUser} = userSlice.actions
export const usersReducer = userSlice.reducer
export const storedUser = (state: RootState) => state.users.user