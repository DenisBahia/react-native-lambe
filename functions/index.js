const functions = require('firebase-functions');
const cors = require("cors")({origin: true})
const fs = require("fs")
const uuid = require("uuid-v4")
const {Storage} = require("@google-cloud/storage")
const storage = new Storage({
    projectId: "lambe-f9148",
    keyFilename: "lambe-f9148-firebase-adminsdk-afj5k-56c21f4055.json"
})


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.uploadImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        try {
            fs.writeFileSync("/tmp/imageToSave.jpg", request.body.image, "base64")

            const bucket = storage.bucket("lambe-f9148.appspot.com")
            const id = uuid()
            bucket.upload("/tmp/imageToSave.jpg", {
                uploadType: "media",
                destination: `/posts/${id}.jpg`,
                metadata: {
                    contentType: "image/jpeg",
                    firebaseStorageDownloadTokens: id
                }
            }, (err, file) => {
                if (err) {
                    console.log(err)
                    return response.status(500).json({error: err})
                } else {

                    return file.getSignedUrl({
                        action: 'read',
                        expires: '03-09-2491'
                      }).then(signedUrls => {
                        // signedUrls[0] contains the file's public URL
                        console.log(signedUrls[0])
                        return response.status(201).json({imageUrl: signedUrls[0]})
                      });

                    /*
                    const filename = encodeURIComponent(file.name)
                    const imageUrl = "https://firebasestorage.googleapis.com/v0/b/"
                        + bucket.name + "/o/" + filename + "?alt=media&token=" + id
                    console.log(imageUrl)
                    return response.status(201).json({imageUrl})
                    */
                    
                   /*
                   var storageRef = storage.ref(file.name);
                    storageRef.getDownloadURL().then(function(url) {
                        console.log(url);
                        return response.status(201).json({imageUrl: url})
                    });
                    */
                }
            })
        } catch (ex) {
            console.log(ex)
            return response.status(500).json({error: err})
        }
    })
});
