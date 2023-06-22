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

const allNormalBookings = (data) => {
    const allBookings = {};
    data.Bookings.forEach(booking => {
        allBookings[booking.id] = booking;
    });
    // console.log('NORMAL:', allSpots)
    return allBookings;
}

export const getUserBookings = () => async dispatch => {
    const response = await csrfFetch('/api/bookings/current')

    if (response.ok) {
        const bookings = await response.json()
        const normalBookings = allNormalBookings(bookings)
        dispatch(actionGetUserBookings(normalBookings))
    }
}

export const createNewBooking = (newBooking) => async dispatch => {
    const { spot, spotId, startDate, endDate } = newBooking
    // console.log('NEW BOOKING', newBooking)
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({spot, spotId, startDate, endDate})
    })

    if (response.ok) {
        const newBooking = await response.json();
        // console.log('NEW BOOKING RESPONSE', newBooking)
        dispatch(actionCreateBooking(newBooking))
    } else {
        const bookingErrors = await response.json();
        return bookingErrors
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
