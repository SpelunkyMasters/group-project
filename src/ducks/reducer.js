import axios from 'axios';

const initialState={
    user:{},
    users:[],
    itinerary:[],
    trips:[],
    invites: []
}

const FULFILLED = '_FULFILLED'
    , GET_USER_INFO='GET_USER_INFO'
    , GET_TRIP_USERS='GET_TRIP_USERS'
    , GET_USER_TRIPS='GET_USER_TRIPS'
    , GET_ITINERARY='GET_ITINERARY'
    , GET_INVITES = 'GET_INVITES';


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

export function getInvites(userid) {
    let invites = axios.get(`/api/invites/${userid}`).then( res => {
        return res.data
    })
    return {
        type: GET_INVITES,
        payload: invites
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

        case GET_ITINERARY + FULFILLED:
            return Object.assign({}, state, {itinerary: action.payload})

        case GET_INVITES + FULFILLED:
            return Object.assign({}, state, {invites: action.payload})

        default: 
            return state
    }


}