import { csrfFetch } from "./csrf";
import { getOneSpot } from "./spots";

const ALL = 'reviews/All_REVIEWS';
const CREATE = 'reviews/CREATE_REVIEW';
const DELETE = 'spots/DELETE-REVIEW';

const loadReviews = reviews => ({
    type: ALL,
    reviews
});

const addReview = review => ({
    type: CREATE,
    review
});

const deleteReviews = reviewId => ({
    type: DELETE,
    reviewId
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

export const addNewReview = (review, spotId) => async dispatch => {
    // console.log('REVIEWWWWW --> ', review)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const newReview = await response.json();
        await dispatch(addReview(newReview));
        await dispatch(getOneSpot(spotId));
        return newReview;
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(deleteReviews(reviewId))
    }
}

const initialState = { allReviews: {}, oneReview: {} }

const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL:
            return { ...state, allReviews: { ...action.reviews }};
        case CREATE:
            const newState = { ...state, oneReview: {} }
            newState.oneReview = action.review
            return newState;
        case DELETE:
            const newState2 = { ...state, allReviews: { ...state.allReviews }}
            delete newState2.allReviews[action.list];
            return newState2
        default:
            return state;
    }
};

export default reviewsReducer;
