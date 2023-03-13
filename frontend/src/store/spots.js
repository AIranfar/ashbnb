import { csrfFetch } from './csrf';

const ALL = 'spots/ALL_SPOTS';
const ONE = 'spots/ONE_SPOT';

const load = list => ({
    type: ALL,
    list
});

const allNormalSpots = (data) => {
    // console.log(data.Spots)
    const allSpots = {};
    data.Spots.forEach(spot => {
        allSpots[spot.id] = spot;
    });
    return allSpots;
}

export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        const data = allNormalSpots(spots);
        console.log({data})
        dispatch(load(data))
        return data;
    }
};

// export const getOneSpot = (id) => async dispatch => {
//     const response = await fetch(`/api/spots/${id}`);

//     if (response.ok) {
//         const spot = await response.json();
//         dispatch(load(spot))
//     }
// };

const initialState = {
    allSpots: {},
    singleSpot: {}
  };

const spotsReducer = (state = initialState, action) => {
    console.log({action})
    switch (action.type) {
        case ALL:
            return {
                ...state,
                allSpots: {
                    ...action.list
                }
            };
        default:
            return state;
    }
};

export default spotsReducer;
