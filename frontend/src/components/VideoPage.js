import React, { useEffect, useState, useContext } from 'react';
import { VideoContext } from '../contextstore/VideoContext';
import axios from 'axios';
import { config } from '../App';
import Navbar from './Navbar';
import VideoGrid from './VideoGrid';
import { useLocation, useParams } from 'react-router-dom';
import VideoFrame from './VideoFrame';
import './styles.css';
import './VideoPage.css';
import moment from 'moment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Stack, Box, Button, Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSnackbar } from 'notistack';
import { getVideoGridWidthStyle } from './Constants';
// import { useGetVideosQuery, useGetVideoByIdQuery } from '../api/videoApi';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoById, setVideos } from '../api/reducerSlice';


const VideoPage = () => {
    // const [videos, setVideos] = useState([]);
    const {videos, votes, setVotes, videoItem, setVideoItem} = useContext(VideoContext)
    let { id } = useParams();
    // const { data, error, isLoading } = useGetVideosQuery();
    // const {videos} = data.videos
    // setVideos(data.videos)
    const dispatch = useDispatch()
    const Data = useSelector((state) => state.videoData.value);

    // const { data: video } = useGetVideoByIdQuery(_id);
    // setVideoItem({video: {video}, votes: video.votes})
    const { enqueueSnackbar } = useSnackbar();


    // const videoData = videoItem.video
    
    //     setVotes(videoItem.votes)

    // let { contentRating, releaseDate, title, viewCount } =  videoData;
    
    

    



    
        
    // const [votes, setVotes] = useState(location.state.votes);
    
useEffect(()=> {
    const fetchVideos = async () => {
        const API_URL = `${config.endpoint}/videos`;
        try {
            const res = (await axios.get(API_URL)) || [];
            console.log(res.data.videos)
            dispatch(setVideos(res.data.videos))
            // setVideos(res.data.videos);
            return res.data.videos;
        } catch (err) {
            enqueueSnackbar('Something went wrong', {
                variant: 'error',
            });
            dispatch(setVideos([]));
            return null;
        }
    };

}, [id])
    
    useEffect(() => {
        updateViewCount(id);
        
    }, []);
    useEffect(()=> {
        fetchVideoById(id)
    }, [id])

    const fetchVideoById = async (id) => {
        const API_URL = `${config.endpoint}/videos/${id}`;
        console.log(id)
        console.log(Data)
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

    

    const updateViewCount = async (id) => {
        try {
            const API_URL = `${config.endpoint}/videos/${id}/views`;
            await axios.patch(API_URL);
        } catch (err) {
            try {
                if (err.response.status === 404) {
                    enqueueSnackbar(err.response.data.message, {
                        variant: 'error',
                    });
                }
            } catch (e) {
                enqueueSnackbar('Something went wrong in updateViewCount()', {
                    variant: 'error',
                });
            }
        }
    };

    const updateVote = async (typeOfVote, operation, id) => {
        
        const API_URL = `${config.endpoint}/videos/${id}/votes`;
        try {
            let payload = {
                vote: typeOfVote,
                change: operation,
            };
            await axios.patch(API_URL, payload);
        } catch (err) {
            enqueueSnackbar('Something went wrong updating vote', {
                variant: 'error',
            });
        }
    };

    const handleVotesClick = async (typeOfVote, id) => {
        try {
            if (typeOfVote === 'upVote') {
                await updateVote('upVote', 'increase', id);
                await updateVote('downVote', 'decrease', id);
            } else if (typeOfVote === 'downVote') {
                await updateVote('upVote', 'decrease');
                await updateVote('downVote', 'increase');
            }
            fetchVideoById(id);
        } catch (err) {
            enqueueSnackbar('Something went wrong in handleVotesClick()', {
                variant: 'error',
            });
        }
    };

    
    return (
        <div>
            <Navbar />
            <Box component="div" sx={getVideoGridWidthStyle()}>
                <VideoFrame/>
                <div className="vp-content-container">
                    <div className="vp-description-container">
                        <div className="vp-title-text">{Data.videoItem.title}</div>
                        <div className="vp-duration-text">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <span>{Data.videoItem.viewCount}</span>
                                <span
                                    style={{
                                        marginLeft: '0.5rem',
                                    }}
                                >
                                    <VisibilityIcon fontSize="small" />
                                </span>
                            </div>
                            <div className="dot"></div>
                            <div>{Data.videoItem.contentRating}</div>
                            <div className="dot"></div>
                            <div>{moment(new Date(Data.videoItem.releaseDate)).fromNow()}</div>
                        </div>
                    </div>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            size="medium"
                            startIcon={<ThumbUpIcon />}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleVotesClick('upVote', id);
                            }}
                        >
                            {Data.videoItem.votes?.upVotes}
                        </Button>
                        <Button
                            variant="outlined"
                            size="meium"
                            endIcon={<ThumbDownIcon />}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleVotesClick('downVote', id);
                            }}
                        >
                            {Data.videoItem.votes?.downVotes}
                        </Button>
                    </Stack>
                </div>
                <Divider />
                <VideoGrid videos={videos} />
            </Box>
        </div>
    );
};

export default VideoPage;

