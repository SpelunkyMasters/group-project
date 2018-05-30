import axios from 'axios';

const initialState={
    user:{},
    users:[],
    itinerary:[],
    trips:[]
}

const GET_USER_INFO='GET_USER_INFO';
const GET_TRIP_USERS='GET_TRIP_USERS'
const GET_USER_TRIPS='GET_USER_TRIPS'


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

export default function reducer(state=initialState, action){
    switch (action.type){
        case GET_USER_INFO+'_FULFILLED':
        return Object.assign({}, state, {user:action.payload})

        case GET_TRIP_USERS+'_FULFILLED':
        return Object.assign({}, state, {users:action.payload})

        case GET_USER_TRIPS+'_FULFILLED':
        return Object.assign({}, state, {trips:action.payload})


        default: 
        return state
    }


}