import { csrfFetch } from './csrf';

const ALL = 'spots/ALL_SPOTS';
const ONE = 'spots/ONE_SPOT';
const CREATE = 'spots/CREATE_SPOT'

const all = list => ({
    type: ALL,
    list
});

const one = list => ({
    type: ONE,
    list
})

const create = list => ({
    type: CREATE,
    list
})

const allNormalSpots = (data) => {
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
        dispatch(all(data))
        return data;
    }
};

export const getOneSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(one(spot));
        return response;
    }
};

// export const createASpot = (spots, spotImages) => async dispatch => {
//     const response = await fetch(`/api/spots/new`)
// }

const initialState = {
    allSpots: {},
    singleSpot: {}
  };

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL:
            return {
                ...state,
                allSpots: {
                    ...action.list
                }
            };
        case ONE:
            const newState = { ...state };
            newState.singleSpot = action.list;
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
