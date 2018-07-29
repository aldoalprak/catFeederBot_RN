const functions = require('firebase-functions');
const cors = require("cors")({ origin: true });
const fs = require("fs")
const gcconfig = {
    projectId: "catfeeder-38829",
    keyFilename: "catFeederBot.json"
}
const gcs = require("@google-cloud/storage")(gcconfig)
const UUID = require("uuid-v4")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const body = JSON.parse(request.body);
        fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
            console.log(err)
            return response.status(500).json({ error: err })
        })

        const bucket = gcs.bucket("catfeeder-38829.appspot.com")
        const uuid = UUID()

        bucket.upload("/tmp/uploaded-image.jpg", {
            uploadType: "media",
            destination: "/" + uuid + ".jpg",
            metadata: {
                metadata: {
                    contentType: "image/jpeg",
                    firebaseStorageDownloadTokens: uuid
                }
            }
        }, (err, file) => {
            if (!err) {
                response.status(201).json({
                    imageUrl: "https://firebasestorage.googleapis.com/v0/b/" +
                        bucket.name +
                        "/o/" +
                        encodeURIComponent(file.name) +
                        "?alt=media&token=" +
                        uuid
                });
            } else {
                console.log(err);
                response.status(500).json({ error: err })
            }
        })
    })
});
