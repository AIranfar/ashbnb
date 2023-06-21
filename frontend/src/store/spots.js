import { csrfFetch } from './csrf';

const ALL = 'spots/ALL_SPOTS';
const ONE = 'spots/ONE_SPOT';
const CREATE = 'spots/CREATE_SPOT';
const EDIT = 'spots/EDIT_SPOT'
const DELETE = 'spots/DELETE_SPOT';
const GET_USER_SPOTS = 'spots/GET_USER_SPOTS';

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

const edit = list => ({
    type: EDIT,
    list
})

const deleteSpot = list => ({
    type: DELETE,
    list
});

const getUserSpots = list => ({
    type: GET_USER_SPOTS,
    list
})

const allNormalSpots = (data) => {
    const allSpots = {};
    data.Spots.forEach(spot => {
        allSpots[spot.id] = spot;
    });
    console.log('NORMAL:', allSpots)
    return allSpots;
}

export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        console.log('SPOTS!!', spots)
        const data = allNormalSpots(spots);
        dispatch(all(data))
        return data;
    }
};

export const getAllSpotCurrentUser = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current');

    if (response.ok) {
        const spots = await response.json();
        console.log('SPOTSSS:', spots)
        const normalSpots = allNormalSpots(spots)
        console.log('DATA!!', normalSpots)
        dispatch(getUserSpots(normalSpots))
        return spots;
    }
}

export const getOneSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(one(spot));
        return response;
    }
};

export const createASpot = (spots, spotImages) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spots),
    });
    if (response.ok) {
        const newSpot = await response.json();

        for (let image of spotImages) {
            const spotImageResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(image)
            });
            if (spotImageResponse.ok) {
                const spotImage = await spotImageResponse.json()
                newSpot.previewImage = spotImage.spotImages
                dispatch(create(newSpot))
                return newSpot
            }
        }
    }
    return response;
}

export const editSpot = (spot, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })
    if (response.ok) {
        const updatedSpot = await response.json()
        dispatch(edit(updatedSpot))
        return updatedSpot
    }
}

export const removeSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteSpot(spotId))
        return data;
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
};

const spotsReducer = (state = initialState, action) => {
    // console.log('ACTION -->', action)
    switch (action.type) {
        case ALL:
            return { ...state, allSpots: { ...action.list }};
        case ONE:
            const newState = { ...state };
            newState.singleSpot = action.list;
            return newState;
        case CREATE:
            const createdState = { ...state, singleSpot: {} }
            createdState.singleSpot = action.list
            return createdState;
        case DELETE:
            const newState2 = { ...state, allSpots: { ...state.allSpots }};
            delete newState2.allSpots[action.list];
            return { ...newState2 };
        case GET_USER_SPOTS:
            return {
                ...state,
                allSpots: {
                    ...action.list
                }
            };
        case EDIT:
            const updatedState = { ...state }
            updatedState.allSpots[action.list] = action.list
            return updatedState;
        default:
            return state;
    }
};

export default spotsReducer;
