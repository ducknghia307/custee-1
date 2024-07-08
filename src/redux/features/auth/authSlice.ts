import { createAction, createSlice } from '@reduxjs/toolkit';
import { storage } from "@/config/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { resetConversationState } from '../conversation/conversationSlice';

// Action to revert all state
export const revertAll = createAction('REVERT_ALL');

const initialState = {
  isLoggedIn: false,
  token: "",
  user: null,
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.accessToken;
      state.userId = action.payload.id;
      state.user = action.payload.user;
      console.log(state.userId);
    },
    logOut: (state) => {
      state.token = "";
      state.user = null;
      state.userId = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(revertAll, () => initialState);
  },
});

// Thunk for uploading an image to Firebase
export const uploadImage = (userId, file) => async (dispatch) => {
  console.log(userId);
  console.log("file:::::::::", file);

  return new Promise((resolve, reject) => {
    // Create a reference to the Firebase storage bucket
    const fileName = Date.now();
    const storageRef = ref(storage, `images/${fileName}`);

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Upload failed:", error);
        reject(error);
      },
      () => {
        // Upload completed successfully, get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          })
          .catch((error) => {
            console.error("Failed to get download URL:", error);
            reject(error);
          });
      }
    );
  });
};

export const { setCredentials, logOut } = authSlice.actions;

// Thunk for logging out
export const logOutAndRevertAll = () => (dispatch) => {
  dispatch(logOut());
  dispatch(resetConversationState());
  dispatch(revertAll());
};

export default authSlice.reducer;
