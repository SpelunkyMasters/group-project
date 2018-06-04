require('dotenv').config({
    path: '../.dev.env'
})

const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRETKEY,
    region: process.env.AWS_REGION
})

const S3 = new AWS.S3()

function uploadPhoto(req, res) {
    console.log('photo in back', req.body.filename, process.env.AWS_ACCESSKEY)
    let photo = req.body,
        buf = new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
        params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Body: buf,
            Key: photo.filename,
            ContentType: photo.filetype,
            ACL: 'public-read'
        }

    console.log(buf)

    S3.upload(params, (err, data) => {
        if (err){
            res.status(500).send(err)
        }else{
           const db=req.app.get('db')
           //uploading picture to my s3 and saving link on my database
           console.log("PICTURE is", data.Location, req.user.userid)
           db.users.upload_profile_picture([data.Location,req.user.userid])
           .then(()=>res.status(200).send(data))
        }


    })
}
function sendPhoto(req, res) {
    console.log('photo in back', req.body.filename, process.env.AWS_ACCESSKEY)
    let photo = req.body,
        buf = new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
        params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Body: buf,
            Key: photo.filename,
            ContentType: photo.filetype,
            ACL: 'public-read'
        }

    console.log(buf)

    S3.upload(params, (err, data) => {
        console.log(err, data)
        if(err){
            res.status(500).send(err);
        } else {
            // the data obj will include have key called Location that will have the uploaded file's URL.
            res.status(200).send(data)
        }
    })
}

module.exports = function (app) {
    app.post('/api/photoUpload', uploadPhoto)
    app.post('/api/photoSend', sendPhoto)
}