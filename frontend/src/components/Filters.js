import React from 'react';
import './Filters.css';

import {
    getAgeGroupFilter,
    getDropdownOptions,
    getGenreFilter,
} from './Constants';
import { Box } from '@mui/material';

const Filters = ({
    genreFilter,
    handleGenreFilterClick,
    ageGroupFilter,
    handleAgeGroupFilterClick,
    handleDropdownChange,
}) => {
    return (
        <Box component="div" style={{ backgroundColor: '#2f2f2f' }}>
            <Box
                component="div"
                className="f-genre-filter hide-scrollbar"
                sx={{
                    justifyContent: { xs: 'flex-start', sm: 'center' },
                }}
            >
                {getGenreFilter().map((item) => (
                    <Box
                        component="div"
                        key={item.id}
                        className={
                            genreFilter.includes(item.id)
                                ? 'f-filter-btn f-active'
                                : 'f-filter-btn f-not-active'
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                            handleGenreFilterClick(item.id);
                        }}
                    >
                        {item.label}
                    </Box>
                ))}
                <select
                    className="f-filter-btn"
                    onChange={handleDropdownChange}
                >
                    {getDropdownOptions().map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </Box>
            <Box
                component="div"
                className="f-age-group-filter hide-scrollbar"
                sx={{
                    justifyContent: { xs: 'flex-start', sm: 'center' },
                }}
            >
                {getAgeGroupFilter().map((item) => (
                    <Box
                        component="div"
                        key={item.id}
                        className={
                            ageGroupFilter === item.id
                                ? 'f-filter-btn f-active'
                                : 'f-filter-btn f-not-active'
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAgeGroupFilterClick(item.id);
                        }}
                    >
                        {item.label}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Filters;
