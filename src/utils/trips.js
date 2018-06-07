module.exports = {
    getCurrentTrip: (tripArray, tripId) => {
        let filteredTrips = tripArray.filter( trip => trip.tripid === +tripId);
        return filteredTrips[0]
    }
}