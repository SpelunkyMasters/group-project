let tripFns = require('../../src/utils/trips');

describe('Tests for Trip Component', () => {
    const trips = [
        {
            tripid: 1, 
            trip_name: 'Japan 2020', 
            userid: 2, 
            startdate: 'Tue Jul 03 2018 12:00:00 GMT-0600', 
            enddate: 'Sat Jul 07 2018 12:00:00 GMT-0600'
        },
        {
            tripid: 2, 
            trip_name: 'Bahamas', 
            userid: 3, 
            startdate: 'Wed Jul 04 2018 12:00:00 GMT-0600', 
            enddate: 'Fri Jul 06 2018 12:00:00 GMT-0600'
        },
        {
            tripid: 3, 
            trip_name: 'Bora Bora', 
            userid: 1, 
            startdate: 'Mon Jul 02 2018 12:00:00 GMT-0600', 
            enddate: 'Mon Jul 09 2018 12:00:00 GMT-0600'
        },
        {
            tripid: 4, 
            trip_name: 'Japan 2020', 
            userid: 4, 
            startdate: 'Sun Jul 01 2018 12:00:00 GMT-0600', 
            enddate: 'Thu Jul 05 2018 12:00:00 GMT-0600'
        }
    ]

    test('getCurrentTrip function should return one trip object', () => {
        let id = 3;

        let trip3 = tripFns.getCurrentTrip(trips, id);

        expect(typeof trip3).toBe('object');
    });

    test('Trip objects should have a trip id, trip name, user id, start date, and end date', () => {
        let id = 2;
        let flag = true

        let trip2 = tripFns.getCurrentTrip(trips, id);
        if(!trip2.tripid) { flag = false };
        if(!trip2.trip_name) { flag = false };
        if(!trip2.userid) { flag = false };
        if(!trip2.startdate) { flag = false };
        if(!trip2.enddate) { flag = false };

        expect(flag).toBeTruthy();
    })

    test('startdate and enddate should have the correct format', () => {
        let id = 1;
        let flag = true;
        
        let trip1 = tripFns.getCurrentTrip(trips, id);
        let regEx = /[MTWTFS][ouehra][neduitn]\s[JFMASOND][aepuco][nbrylgptvc]\s[01][0-9]\s[2][0][1-9][0-9]\s[01][0-9]\:[0][0]\:[0][0]\s[G][M][T]\-[0][6][0][0]/gm
        if(!regEx.test(trip1.startdate) && !regEx.test(trip1.enddate)) { flag = false };

        expect(flag).toBeTruthy();

    })
})