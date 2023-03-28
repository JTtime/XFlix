import { createSlice } from "@reduxjs/toolkit";
import { useGetVideoByIdQuery, useGetVideosQuery } from "./videoApi";

const initialState = {value: {videos: [], videoItem: {}, votes:{}, id:null}  };

export const videoSlice = createSlice({
    name: "videofetch",
  initialState,
  reducers: {    
      setVideos: (state, action) => {
        state.value.videos = action.payload
      },
      setVideoById: (state, action) => {
        // const index = state.value.videos.findIndex((e)=> e._id===action.payload)
          state.value.videoItem = action.payload
          state.value.votes= state.value.videoItem.votes
          state.value.id = state.value.videoItem._id
        },

  }
})

export const { setVideoById, setVideos } = videoSlice.actions;
export const getAllVideos = (state) =>  state.value.videofetch.videos

export const fetchVideoById = (id) => async (dispatch) => {
    const { data } = await dispatch(useGetVideoByIdQuery(id));
    // dispatch(setVideoById(data));
  };

export default videoSlice.reducer;