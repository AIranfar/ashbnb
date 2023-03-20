import { csrfFetch } from "./csrf";

const ALL = 'reviews/All_REVIEWS'

const loadReviews = reviews => ({
    type: ALL,
    reviews
})

export const getAllReviews = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data))
        return data;
    }
}

const initialState = { allReviews: {}, oneReview: {} }

const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL:
            return { ...state, allReviews: { ...action.list }};
        default:
            return state;
    }
};

export default reviewsReducer;
