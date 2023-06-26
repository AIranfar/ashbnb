import { csrfFetch } from "./csrf";
import { getOneSpot } from "./spots";

const ALL = 'reviews/All_REVIEWS';
const USER_REVIEWS = 'reviews/USER_REVIEWS'
const CREATE = 'reviews/CREATE_REVIEW';
const EDIT = 'reviews/EDIT_REVIEW'
const DELETE = 'spots/DELETE-REVIEW';

const loadReviews = reviews => ({
    type: ALL,
    reviews
});

const userReviews = reviews => ({
    type: USER_REVIEWS,
    reviews
})

const addReview = review => ({
    type: CREATE,
    review
});

const updateReview = reviewId => ({
    type: EDIT,
    reviewId
})

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

export const getUserReviews = () => async dispatch => {
    const response = await csrfFetch('/api/reviews/current')

    if (response.ok) {
        const reviews = await response.json();
        const normalReviews = allNormalReviews(reviews.Reviews)
        dispatch(userReviews(normalReviews))
    }
}

export const addNewReview = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const newReview = await response.json();
        // console.log('NEW REVIEW', newReview)
        dispatch(addReview(newReview));
        dispatch(getAllReviews(spotId))
        dispatch(getOneSpot(spotId));
        // return newReview;
    }
}

export const editReview = (review, reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(updateReview(updatedReview))
        dispatch(getUserReviews())
    }
}

export const editReviewSpotPage = (review, reviewId, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(updateReview(updatedReview))
        dispatch(getAllReviews(spotId))
        dispatch(getOneSpot(spotId))
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteReviews(reviewId))
        dispatch(getUserReviews())
    }
}

export const deleteReviewSpotPage = (reviewId, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteReviews(reviewId))
        dispatch(getAllReviews(spotId))
        dispatch(getOneSpot(spotId))
    }
}

const initialState = { allReviews: {}, oneReview: {} }

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL:
            return { ...state, allReviews: { ...action.reviews } };
        case USER_REVIEWS:
            return { ...state, allReviews: { ...action.reviews } };
        case CREATE:
            const newState = { ...state, allReviews: { ...state.allReviews } }
            newState.allReviews[action.review.id] = action.review
            return newState;
        case EDIT:
            const editState = { ...state }
            editState.oneReview[action.reviewId.id] = action.reviewId;
            return editState
        case DELETE:
            const newState2 = { ...state, allReviews: { ...state.allReviews } }
            delete newState2.allReviews[action.reviewId];
            return newState2
        default:
            return state;
    }
};

export default reviewsReducer;
