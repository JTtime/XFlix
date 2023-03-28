import React, { useRef, useEffect } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import {
    Dialog,
    TextField,
    Typography,
    Button,
    Stack,
    MenuItem,
    FormControl,
    Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getAgeGroupFilter, getGenreFilter } from './Constants';

export default function VideoUploadDialog({
    formFields,
    handleFormFieldsChange,
    handleFormSubmit,
    open,
    setOpen,
}) {
    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            <Button
                variant="contained"
                size="small"
                endIcon={<UploadIcon />}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                }}
                color="primary"
            >
                Upload
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                PaperProps={{
                    style: {
                        padding: '0.75rem',
                    },
                }}
            >
                <FormControl>
                    <form onSubmit={handleFormSubmit}>
                        <Stack direction="column" spacing={2}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >
                                <Typography variant="h5" component="h5">
                                    Upload Video
                                </Typography>
                                <Box
                                    component="span"
                                    onClick={() => setOpen(false)}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <CloseIcon />
                                </Box>
                            </Stack>

                            <TextField
                                helperText="This link will be used to derive the video"
                                label="Video Link"
                                fullWidth
                                name="videoLink"
                                value={formFields.videoLink}
                                onChange={handleFormFieldsChange}
                                required={true}
                            />
                            <TextField
                                helperText="This link will be used to preview the thumbnail image"
                                label="Thumbnail Image Link"
                                fullWidth
                                name="thumbnailLink"
                                value={formFields.thumbnailLink}
                                onChange={handleFormFieldsChange}
                                required={true}
                            />
                            <TextField
                                helperText="The title will be the representative text for video"
                                label="Title"
                                fullWidth
                                name="titleName"
                                value={formFields.titleName}
                                onChange={handleFormFieldsChange}
                                required={true}
                            />
                            <TextField
                                id="outlined-select-currency"
                                select
                                name="genre"
                                value={formFields.genre}
                                helperText="Genre will help in categorizing your videos"
                                label="Genre"
                                fullWidth
                                onChange={handleFormFieldsChange}
                                required={true}
                            >
                                {getGenreFilter().map((option) => (
                                    <MenuItem
                                        key={option.id}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                name="ageGroup"
                                value={formFields.ageGroup}
                                helperText="This will be used to filter videos on age group suitability"
                                label="Suitable age group for the clip"
                                fullWidth
                                onChange={handleFormFieldsChange}
                                required={true}
                            >
                                {getAgeGroupFilter().map((option) => (
                                    <MenuItem
                                        key={option.id}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                type="date"
                                helperText="This will be used to sort videos"
                                fullWidth
                                name="releaseDate"
                                value={formFields.releaseDate}
                                onChange={handleFormFieldsChange}
                                required={true}
                                inputProps={{
                                    min: new Date().toISOString().split('T')[0],
                                }}
                            />
                            <Stack direction="row" spacing={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    size="medium"
                                >
                                    Upload Video
                                </Button>
                                <Button
                                    variant="text"
                                    size="medium"
                                    onClick={() => setOpen(false)}
                                    sx={{ color: '#FFFFFF' }}
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </FormControl>
            </Dialog>
        </>
    );
}
