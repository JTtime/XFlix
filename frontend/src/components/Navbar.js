import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSnackbar } from 'notistack';

import { useNavigate } from 'react-router-dom';
import VideoUploadDialog from './VideoUploadDialog';
import { getVideoUploadFormFields } from './Constants';
import { getFormattedDate } from './Utility';
import { config } from '../App';
import axios from 'axios';
import './styles.css';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

export default function Navbar({ searchKey, setSearchKey, showSearchBar }) {
    const [open, setOpen] = useState(false);
    const [formFields, setFormFields] = useState(getVideoUploadFormFields());
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate('/');
    };

    const handleFormFieldsChange = (e) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                videoLink: formFields.videoLink,
                title: formFields.titleName,
                genre: formFields.genre,
                contentRating: formFields.ageGroup,
                releaseDate: getFormattedDate(formFields.releaseDate),
                previewImage: formFields.thumbnailLink,
            };
            const API_URL = `${config.endpoint}/videos`;
            const res = await axios.post(API_URL, payload);
            if (res.data._id) {
                enqueueSnackbar('Video uploaded successfully', {
                    variant: 'success',
                });
                setFormFields(getVideoUploadFormFields());
                setOpen(false);
            } else {
                throw Error('Something went wrong');
            }
        } catch (err) {
            try {
                if (err.response.data.code === 400) {
                    enqueueSnackbar(err.response.data.message, {
                        variant: 'error',
                    });
                }
            } catch (e) {
                enqueueSnackbar(err, {
                    variant: 'error',
                });
            }
        }
    };

    const getSearchBar = () => (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchKey}
                onChange={(e) => {
                    e.stopPropagation();
                    setSearchKey(e.target.value);
                }}
            />
        </Search>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="appBar">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box
                        sx={{
                            fontSize: { xs: '1.5rem', md: '2.5rem' },
                            fontWeight: 700,
                            color: '#FFFFFF',
                            cursor: 'pointer',
                        }}
                        onClick={handleClick}
                    >
                        <span className="nb-logo-red">X</span>
                        Flix
                    </Box>
                    <Box sx={{ width: { xs: '9rem', md: '25rem' } }}>
                        {showSearchBar && getSearchBar()}
                    </Box>
                    <VideoUploadDialog
                        formFields={formFields}
                        handleFormFieldsChange={handleFormFieldsChange}
                        handleFormSubmit={handleFormSubmit}
                        open={open}
                        setOpen={setOpen}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
