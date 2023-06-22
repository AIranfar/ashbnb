import { csrfFetch } from "./csrf";

const GET_USER_BOOKINGS = 'bookings/GET_USER_BOOKINGS'
const CREATE_BOOKING = 'bookings/CREATE_BOOKING'
const EDIT_BOOKING = 'bookings/EDIT_BOOKING'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'

export const actionGetUserBookings = (bookings) => ({
    type: GET_USER_BOOKINGS,
    bookings
})

export const actionCreateBooking = (booking) => ({
    type: CREATE_BOOKING,
    booking
})

export const actionEditBooking = (booking) => ({
    type: EDIT_BOOKING,
    booking
})

export const actionDeleteBooking = (bookingid) => ({
    type: DELETE_BOOKING,
    bookingid
})

export const getUserBookings = () => async dispatch => {
    const response = await csrfFetch('/api/bookings/current')

    if (response.ok) {
        const bookings = await response.json()
        dispatch(actionGetUserBookings(bookings))
    }
}

const initialState = { bookings: {} }

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_BOOKINGS:
            return { ...state, bookings: { ...action.bookings } }
        case CREATE_BOOKING:
            const newState = { ...state, bookings: { ...state.bookings } }
            newState.bookings[action.booking.id] = action.booking
            return newState
        default: return state
    }
}

export default bookingsReducer;
