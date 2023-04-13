import { csrfFetch } from "./csrf";

const ALL = 'reviews/All_REVIEWS'

const loadReviews = reviews => ({
    type: ALL,
    reviews
})

const allNormalReviews = (data) => {
    const allReviews = {};
    data.forEach(review => {
        allReviews[review.id] = review;
    });
    return allReviews;
}

export const getAllReviews = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        const data = allNormalReviews(reviews.Review)
        dispatch(loadReviews(data))
        return data;
    }
}

const initialState = { allReviews: {}, oneReview: {} }

const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL:
            return { ...state, allReviews: { ...action.reviews }};
        default:
            return state;
    }
};

export default reviewsReducer;
