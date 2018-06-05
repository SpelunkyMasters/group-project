module.exports = {
    getUserHistory: (req, res) => {
        const { userid } = req.user
        const db = req.app.get('db')

        db.travel_history.get_user_history([userid]).then( results => {  
            res.status(200).send(results)
        })
    },
    addHistory: (req, res) => {
        
    }
}