export const getGenreFilter = () => [
    { label: 'All', id: 1, value: 'All' },
    { label: 'Education', id: 2, value: 'Education' },
    { label: 'Sports', id: 3, value: 'Sports' },
    { label: 'Comedy', id: 4, value: 'Comedy' },
    { label: 'Lifestyle', id: 5, value: 'Lifestyle' },
    { label: 'Movies', id: 6, value: 'Movies' },
];

export const getAgeGroupFilter = () => [
    {
        label: 'Any',
        id: 1,
        value: 'Anyone',
    },
    { label: '7+', id: 2, value: '7+' },
    { label: '12+', id: 3, value: '12+' },
    { label: '16+', id: 4, value: '16+' },
    { label: '18+', id: 5, value: '18+' },
];

export const getDropdownOptions = () => [
    {
        label: 'Release Date',
        id: 1,
        value: 'releaseDate',
    },
    {
        label: 'View Count',
        id: 2,
        value: 'viewCount',
    },
];

export const getVideoUploadFormFields = () => {
    return {
        videoLink: '',
        thumbnailLink: '',
        titleName: '',
        genre: '',
        ageGroup: '',
        releaseDate: '',
    };
};

export const getVideoGridWidthStyle = () => {
    return { width: { xs: '98%', md: '90%' }, margin: 'auto' };
};
