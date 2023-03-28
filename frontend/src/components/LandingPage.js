import React, { useEffect, useState, useContext } from 'react';
import Filters from './Filters';
import Navbar from './Navbar';
import VideoGrid from './VideoGrid';
import { getAppliedFilters } from './Utility';
import {
    getAgeGroupFilter,
    getDropdownOptions,
    getGenreFilter,
} from './Constants';
import axios from 'axios';
import { config } from '../App';
import './styles.css';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { getVideoGridWidthStyle } from './Constants';
import { VideoContext } from '../contextstore/VideoContext';
import Loading from "./Loading"

function LandingPage() {
    const {videos, setVideos} = useContext(VideoContext)
    // const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState();
    const [genreFilter, setGenreFilter] = useState(
        getAppliedFilters().genreFilter
    );
    const [ageGroupFilter, setAgeGroupFilter] = useState(
        getAppliedFilters().ageGroupFilter
    );
    const [selectedDropdown, setSelectedDropdown] = useState(
        getAppliedFilters().selectedDropdown
    );
    const [searchKey, setSearchKey] = useState('');
    const [debounceSearch, setDebounceSearch] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    const fetchVideosBySearchKey = async () => {
        setLoading(true)
        const API_URL = `${config.endpoint}/videos`;
        try {
            let params = {
                title: searchKey.trim() || '',
                genres: getGenreFilter()
                    .filter((x) => genreFilter.includes(x.id))
                    .map((x) => x.value)
                    .join(','),
                contentRating: getAgeGroupFilter().find(
                    (x) => x.id === ageGroupFilter
                ).value,
                sortBy: getDropdownOptions().find(
                    (x) => x.id === selectedDropdown
                ).value,
            };
            const searchParams = new URLSearchParams(params).toString();
            const res = (await axios.get(`${API_URL}?${searchParams}`)) || [];
            setVideos(res.data.videos);
            setLoading(false)
            return res.data.videos;
        } catch (err) {
            enqueueSnackbar(
                'Something went wrong in fetchVideosBySearchKey()',
                {
                    variant: 'error',
                }
            );
            setVideos([]);
            setLoading(false)
            return null;
        }
    };

    const handleGenreFilterClick = (id) => {
        let value = [];
        if (genreFilter.includes(id))
            value = genreFilter.filter((x) => x !== id);
        else value = [...genreFilter, id];
        if (!!!value.length) value = [1];
        setGenreFilter(value);
    };

    const handleAgeGroupFilterClick = (id) => {
        if (ageGroupFilter === id) return;
        setAgeGroupFilter(id);
    };

    const handleDropdownChange = (e) => {
        e.stopPropagation();
        let id = parseInt(e.target.value);
        if (selectedDropdown === id) return;
        setSelectedDropdown(id);
    };

    const searchByDebounce = () => {
        if (!!debounceSearch) {
            clearTimeout(debounceSearch);
        }
        let timer = setTimeout(() => {
            fetchVideosBySearchKey();
        }, 1000);
        setDebounceSearch(timer);
    };

    useEffect(() => {
        fetchVideosBySearchKey();
    }, [genreFilter, ageGroupFilter, selectedDropdown]);

    useEffect(() => {
        searchByDebounce();
    }, [searchKey]);

    return (
        <>
            <Navbar
                searchKey={searchKey}
                setSearchKey={setSearchKey}
                showSearchBar={true}
            />
            <Filters
                genreFilter={genreFilter}
                handleGenreFilterClick={handleGenreFilterClick}
                ageGroupFilter={ageGroupFilter}
                handleAgeGroupFilterClick={handleAgeGroupFilterClick}
                handleDropdownChange={handleDropdownChange}
            />
            <div>
            {
            loading ?
            <Loading/> :
            <Box component="div" sx={getVideoGridWidthStyle()}>
                <VideoGrid videos={videos} />
            </Box>
            }
            </div>
        </>
    );
}

export default LandingPage;
