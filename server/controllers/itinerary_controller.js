const _ = require('lodash')

module.exports = {
    getItinerary: (req, res) => {
        const {tripid} = req.params
        const db = req.app.get('db')
        db.trips.get_all_dests([tripid]).then(results => {
            if(results.length === 0) {
                res.sendStatus(204)
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
                        place_id: place.dest_place_id,
                        dest_address: place.dest_address,
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
                                lng: +trip.sub_lng,
                                place_id: trip.dest_place_id,
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
        const { destType, destid } = req.query
        const { tripid } = req.params
        const db = req.app.get('db')
        if( destType === 'Main_Stop') {
            db.trips.get_dests([tripid]).then(results => {
                let flag = true
                results.forEach(place => {
                    if(location.place_id === place.place_id) flag = false;
                })
                if(flag) {
                    db.trips.add_dest([tripid, location.name, location.address, location.lat, location.lng, location.place_id]).then( (results) => {
                        res.status(200).send(results)
                    })

                } else {
                    res.sendStatus(501)
                }
            })
        } else if ( destType === 'Minor_Stop') {
            if(destid !== '') {                
                db.trips.get_subDests([destid]).then(results => {
                    let flag = true;
                    results.forEach(place => {
                        if(place.place_id === location.place_id) flag = false;
                    })
                    if(flag) {
                        db.trips.add_subDest([destid, location.name, location.address, location.lat, location.lng, location.place_id]).then(results =>{
                            res.status(200).send(results)
                        })
                    }
                })
            } else {
                res.sendStatus(500)
            }
        } else {
            res.sendStatus(502)
        }
    },
    deleteDestination: (req, res) => {
        const { destid } = req.params
        const db = req.app.get('db')
        db.trips.rmv_dest([destid]).then( () => {
            res.sendStatus(200)
        }).catch( err => console.log(err))
    },
    deleteSubDestination: (req, res) => {
        const { sub_destid } = req.params
        const db = req.app.get('db')
        db.trips.rmv_subDest([sub_destid]).then(() => {
            res.sendStatus(200)
        }).catch( err => console.log(err))
    }
}