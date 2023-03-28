import React, { createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';


export const VideoContext = createContext({});


const VideoContextProvider = (props) => {
    const [videos, setVideos] = useState([]);
    const location = useLocation();
    const [votes, setVotes] = useState();
    const[videoItem, setVideoItem] = useState({video: null, votes: null})
    
    



    return (
        <VideoContext.Provider value={{videos, setVideos, votes, setVotes, location, videoItem, setVideoItem}}>
          {props.children}
        </VideoContext.Provider>
      )
    }  
    


export default VideoContextProvider;

