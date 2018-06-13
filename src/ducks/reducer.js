import axios from 'axios';

const initialState={
    user:{},
    users:[],
    itinerary:[],
    trips:[],
    invites: [],
    tripOrganizer: false,
    mapLoading: false,
    time: ''
}

const FULFILLED = '_FULFILLED'
    , PENDING = '_PENDING'
    , GET_USER_INFO='GET_USER_INFO'
    , GET_TRIP_USERS='GET_TRIP_USERS'
    , GET_USER_TRIPS='GET_USER_TRIPS'
    , GET_ITINERARY='GET_ITINERARY'
    , GET_INVITES = 'GET_INVITES'
    , IS_TRIP_ORGANIZER = 'IS_TRIP_ORGANIZER'
    , ITIN_CLEAR_OUT = 'ITIN_CLEAR_OUT'
    , UPDATE_ITINERARY = 'UPDATE_ITINERARY'


export function getTrips(user){
    let trips=axios.get(`/api/trips/${user}`).then(res=>{
        return res.data 
    });
    return {
        type: GET_USER_TRIPS,
        payload: trips
    }
}

export function getUser(){
    let userData=axios.get('/auth/me').then(res=>{
        return res.data
    });
    return {
        type: GET_USER_INFO,
        payload: userData
    }
}

export function getAllUsers(trip){
    let users=axios.get(`/api/users/${trip}`).then(res=>{
        return res.data
      })
      return {
          type:GET_TRIP_USERS,
          payload:users
      }
}

export function getItinerary(tripid) {
    let itinerary = axios.get(`/api/itinerary/${tripid}`).then(res => {
        return res.data
    })
    return {
        type: GET_ITINERARY,
        payload: itinerary
    }
}

export function updateItinerary(itin) {
    return {
        type: UPDATE_ITINERARY,
        payload: itin
    }
}

export function getInvites(userid) {
    let invites = axios.get(`/api/invites/${userid}`).then( res => {
        return res.data
    })
    return {
        type: GET_INVITES,
        payload: invites
    }
}

export function isTripOrganizer(bool) {
    return {
        type: IS_TRIP_ORGANIZER,
        payload: bool
    }
}

export function itinClearOut() {
    return {
        type: ITIN_CLEAR_OUT,
        payload: []
    }
}

export default function reducer(state=initialState, action){
    switch (action.type){
        case GET_USER_INFO + FULFILLED:
            return Object.assign({}, state, {user:action.payload})

        case GET_TRIP_USERS + FULFILLED:
            return Object.assign({}, state, {users:action.payload})

        case GET_USER_TRIPS + FULFILLED:
            return Object.assign({}, state, {trips:action.payload})

        case GET_ITINERARY + PENDING:
            return Object.assign({}, state, {mapLoading: true})

        case GET_ITINERARY + FULFILLED:
            return Object.assign({}, state, {itinerary: action.payload, mapLoading: false})

        case GET_INVITES + FULFILLED:
            return Object.assign({}, state, {invites: action.payload})
            
        case IS_TRIP_ORGANIZER:
            return Object.assign({}, state, {tripOrganizer: action.payload})

        case ITIN_CLEAR_OUT:
            return Object.assign({}, state, {itinerary: action.payload})

        case UPDATE_ITINERARY:
            return Object.assign({}, state, {itinerary: action.payload})
            
        default: 
            return state
    }


}