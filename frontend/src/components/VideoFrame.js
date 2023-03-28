import React, {useContext} from 'react';
import './VideoFrame.css';
import './styles.css';
import { VideoContext } from '../contextstore/VideoContext';
import { useSelector } from 'react-redux';


const VideoFrame = () => {
    const {videoItem} = useContext(VideoContext)
    // const videoData = videoItem.video
    const Data = useSelector((state) => state.videoData.value);
    
    
    // const { title, videoLink } = videoData;

    return (
        <iframe
            className="vf-video-frame-component"
            src={`https://www.${Data.videoItem.videoLink}?autoplay=1`}
            title={Data.videoItem.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    );
};

export default VideoFrame;
