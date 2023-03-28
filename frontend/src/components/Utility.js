export const getAppliedFilters = () => {
    return {
        genreFilter: [1], //JSON.parse(localStorage.getItem('genreFilter')) || [1],
        ageGroupFilter: 5, //JSON.parse(localStorage.getItem('ageGroupFilter')) || 1,
        selectedDropdown: 1,
        //JSON.parse(localStorage.getItem('selectedDropdown')) || 1,
    };
};

export const scrollTop = () =>
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });

/**
 *
 * @param {String} date Accepts date from HTML input tag
 * @returns {Date} date in '12 Jan 2021' format
 */
export const getFormattedDate = (date) => {
    let d = new Date(date);
    return d.toLocaleString('en-IN', {
        day: 'numeric', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
        month: 'short', // numeric, 2-digit, long, short, narrow
    });
};

export const getRandomElementFromArray = (array = []) =>
    array[Math.floor(Math.random() * array.length)];

