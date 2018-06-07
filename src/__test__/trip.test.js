let tripFns = require('../../src/utils/trips');

describe('Tests for Trip Component', () => {
    const trips = [
        {
            tripid: 1, 
            trip_name: 'Japan 2020', 
            userid: 2, 
            startDate: 'Tue Jul 03 2018 12:00:00 GMT-0600', 
            endDate: 'Sat Jul 07 2018 12:00:00 GMT-0600'
        },
        {
            tripid: 2, 
            trip_name: 'Bahamas', 
            userid: 3, 
            startDate: 'Wed Jul 04 2018 12:00:00 GMT-0600', 
            endDate: 'Fri Jul 06 2018 12:00:00 GMT-0600'
        },
        {
            tripid: 3, 
            trip_name: 'Bora Bora', 
            userid: 1, 
            startDate: 'Mon Jul 02 2018 12:00:00 GMT-0600', 
            endDate: 'Mon Jul 09 2018 12:00:00 GMT-0600'
        },
        {
            tripid: 4, 
            trip_name: 'Japan 2020', 
            userid: 4, 
            startDate: 'Sun Jul 01 2018 12:00:00 GMT-0600', 
            endDate: 'Thu Jul 05 2018 12:00:00 GMT-0600'
        }
    ]

    test('getCurrentTrip function should return one trip object', () => {
        let id = 3;

        let currentTrip = tripFns.getCurrentTrip(trips, id);

        expect(typeof currentTrip).toBe('object');
    });

    test('Trip objects should have a trip id, trip name, user id, start date, and end date', () => {
        let id = 2;
        let flag = true

    })
})