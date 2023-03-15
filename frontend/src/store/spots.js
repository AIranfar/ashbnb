import { csrfFetch } from './csrf';

const ALL = 'spots/ALL_SPOTS';
const ONE = 'spots/ONE_SPOT';
const CREATE = 'spots/CREATE_SPOT';
const DELETE = 'spots/DELETE_SPOT';

const all = list => ({
    type: ALL,
    list
});

const one = list => ({
    type: ONE,
    list
});

const create = list => ({
    type: CREATE,
    list
});

const deleteSpot = list => ({
    type: DELETE,
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

export const createASpot = (spots, spotImages) => async dispatch => {
    const response = await fetch('/api/spots/new', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createASpot),
    });
    if (response.ok) {

    }
}

export const removeSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteSpot(spotId))
    }
    return response;
}

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
            case DELETE:
                const newState2 = { ...state, oneSpot: {} };
                delete newState2.allSpots[action.spotId];
                return newState2;
            default:
                return state;
        }
    };


export default spotsReducer;
