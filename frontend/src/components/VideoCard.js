import React, {useState, useContext, useEffect} from 'react';
import { VideoContext } from '../contextstore/VideoContext';
import { Link } from 'react-router-dom';
import './VideoCard.css';
import './styles.css';
import { scrollTop } from './Utility';
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux"
import {fetchVideoById, setVideoById} from "../api/reducerSlice"
import { useGetVideosQuery, useGetVideoByIdQuery } from '../api/videoApi';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { config } from '../App';


function VideoCard({ video }) {
    // const { videoItem, setVideoItem, fetchVideoById} = useContext(VideoContext)
    const { previewImage, releaseDate, title, _id, viewCount, votes} = video;
    // const[videoItem, setVideoItem] = useState({video: null, votes: null})
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    // const { data:videoItem, error, isLoading } = useGetVideoByIdQuery(_id);

   

    const handleVideoClick = (_id) => {
        scrollTop();
        console.log(_id)
        fetchVideoById(_id)

        
        
        // console.log(videoItem)

    }

    const fetchVideoById = async (_id) => {
        const API_URL = `${config.endpoint}/videos/${_id}`;
        console.log(_id)
        try {
            const res = await axios.get(API_URL);
            dispatch(setVideoById(res.data))
            // setVotes(res.data.votes);
            return res.data;
        } catch (err) {
            enqueueSnackbar('Something went wrong in fetchVideoById()', {
                variant: 'error',
            });
            return null;
        }
    };

    return (
        
        <Link
            to={`/video/${_id}` }
            className="vc-videocard-component"
            onClick={()=>handleVideoClick(_id)}
        >
            <img
                className="vc-video-thumbnail"
                src={previewImage}
                alt={title}
            />
            <div className="vc-title">{title}</div>
            <div className="vc-release">
                <div>
                    {viewCount}
                    {viewCount <= 1 ? ' view' : ' views'}
                </div>
                <div className="dot"></div>
                <div>{moment(new Date(releaseDate)).fromNow()}</div>
            </div>
        </Link>
    );
}

export default VideoCard;
