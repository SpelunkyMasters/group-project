let axios = require('axios');

describe("Get Invite Action Creator Tests", () => {
    const GET_INVITES = 'GET_INVITES';

    function getInvites(userid) {
        let invites = axios.get(`/api/invites/${userid}`).then( res => {
            return res.data
        }).catch(() => { console.log('getInvites request sent')})
        return {
            type: GET_INVITES,
            payload: invites
        }
    }

    test("getInvites function should return an action with type and payload properties", () => {
        let flag = true;
        let id = 2;

        let action = getInvites(id)

        if(!action.type || !action.payload) { flag = false };

        expect(flag).toBeTruthy();
    });

    test("Payload of getInvites action should contain an empty object / promise", () => {
        let id = 1;

        let action = getInvites(id);
        // console.log(action.payload)

        expect(typeof action.payload).toEqual('object')
    })
})