import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../services";

const initialState = {
  users: null,
  isLoading: false,
  isMessageLoading: false,
  selectedUser: null,
  messages: null,
  onlineUsers: [],
  error: "",
  isMessageSending: false,
  sentMessages: null,
};

export const fetchUsers = createAsyncThunk("userSlice/users", async () => {
  const response = await axiosInstance.get("/message/users");
  console.log(response);
  return response.data;
});

export const sendMessage = createAsyncThunk(
  "userSlice/send",
  async (data: any) => {
    console.log("hello", data);
    const { id, text, image } = data;
    console.log({
      text,
      image,
    });
    const response = await axiosInstance.post(`/message/chat/${id}`, {
      text,
      image,
    });
    console.log(response);
    return response.data;
  }
);

export const fetchMessages = createAsyncThunk(
  "fetchMessage/users",
  async (id) => {
    const response = await axiosInstance.get(`/message/${id}`);
    console.log(response);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    userReducer: () => {},
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.users = null;
        state.error = action.error.message ?? "";
        state.isLoading = false;
      });
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isMessageLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isMessageLoading = false;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.messages = null;
        state.error = action.error.message ?? "";
        state.isMessageLoading = false;
      });
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isMessageSending = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sentMessages = action.payload;
        state.isMessageSending = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sentMessages = null;
        state.error = action.error.message ?? "";
        state.isMessageSending = false;
      });
  },
});

export const { userReducer, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
