import React from 'react';
import { Grid } from '@mui/material';
import VideoCard from './VideoCard';

function VideoGrid({ videos }) {
    console.log('In VideoGrid.js', { videos });
    return (
        <>
            {!!videos && (
                <Grid container spacing={2} mt={2}>
                    {videos.map((item) => (
                        <Grid item xs={12} md={3} key={item._id}>
                            <VideoCard video={item} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
}

export default VideoGrid;
