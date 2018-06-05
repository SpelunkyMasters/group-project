module.exports = {
    getUserHistory: (req, res) => {
        const { userid } = req.user
        const db = req.app.get('db')

        db.travel_history.get_user_history([userid]).then( results => {  
            res.status(200).send(results)
        })
    },
    addHistory: (req, res) => {
        // const { userid } = req.user
        const { location } = req.body
        const db = req.app.get('db')
        console.log(location)

        db.travel_history.add_history([req.user.userid, location.name, location.address, location.lat, location.lng, location.place_id]).then(() => {
            res.sendStatus(200)
        })
    }
}