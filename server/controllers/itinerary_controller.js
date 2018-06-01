const _ = require('lodash')

module.exports = {
    getItinerary: (req, res) => {
        const {tripid} = req.params
        const db = req.app.get('db')
        db.trips.get_dests([tripid]).then(results => {
            if(results.length === 0) {
                res.status(200).send('No Trips')
            } else {
                let trips = _.groupBy(results, trip => trip.dest_ord)
                let mainDests = []
                for (prop in trips) {
                    let subDests = []
                    let place = trips[prop][0]
                    let mainDest = {
                        destid: place.destid,
                        tripid: place.tripid,
                        dest_name: place.dest_name,
                        dest_ord: place.dest_ord,
                        lat: +place.dest_lat,
                        lng: +place.dest_lng,
                        sub_dests: []
                    }
                    trips[prop].forEach( trip => {
                        if(!trip.sub_destid) { 
                            return
                        } else {
                            let subDest = {
                                sub_destid: trip.sub_destid,
                                sub_dest_name: trip.sub_dest_name,
                                sub_ord: trip.sub_ord,
                                sub_address: trip.sub_address,
                                lat: +trip.sub_lat,
                                lng: +trip.sub_lng
                            }
                            subDests.push(subDest)
                        }
                    })
                    subDests = _.sortBy(subDests, subDest => subDests.sub_ord)
                    mainDest.sub_dests = subDests
                    mainDests.push(mainDest)
            }
            res.status(200).send(mainDests)
        }
        })
    },
    addToItinerary: (req, res) => {
        let location = req.body
        const { destType, subDest } = req.query
        const { tripid } = req.params
        const db = req.app.get('db')

        if( destType === 'Main Stop') {
            db.trips.add_dest([tripid, location.name, location.lat, location.lng]).then( (results) => {
                res.status(200).send(results)
            })
        }

    }
}