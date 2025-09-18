import { createSlice } from "@reduxjs/toolkit";

interface Client {
  uid: string;
  displayName?: string;
  email?: string;
}

interface ClientState {
  client: Client | null;
}

const initialState: ClientState = {
  client: null,
};

export const clientDataSlice = createSlice({
  name: "CLIENT",
  initialState,
  reducers: {
    setClient(state, action: { payload: Client }) {
      state.client = action.payload;
    },
    clearClient(state) {
      state.client = null;
    },
  },
});

export const { setClient, clearClient } = clientDataSlice.actions;
export default clientDataSlice.reducer;
