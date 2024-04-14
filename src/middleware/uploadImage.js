const multer = require('multer');
const path = require("path")
const responseHelper = require("../helpers/responseHelper")
const {SERVERERROR, FAILURE} = require("../../config/key")
const {makeFolderOnLocal} = require("../helpers/helper")

//middleware for adding image
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "petPicture") {
            makeFolderOnLocal("public/uploads/pet");
            cb(null, path.join(__dirname, `../../public/uploads/pet`))
        } else {
            let folderName = req.baseUrl.split("/").pop();
            makeFolderOnLocal("public/uploads/image");
            makeFolderOnLocal("public/uploads/user");
            cb(null, path.join(__dirname, `../../public/uploads/${folderName}`))
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
// module.exports = storage

module.exports.upload = multer({storage: storage})

module.exports.uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
            return cb(new Error("Please upload an image!"), false);
        }
        cb(undefined, true);
    },
});

module.exports.validMulterUploadMiddleware = (multerUploadFunction) => {
    return (req, res, next) =>
        multerUploadFunction(req, res, (err) => {
            // handle Multer error
            if (err && err.name && err.name === "MulterError") {
                return responseHelper.error(res, res.__("SomethingWentWrongPleaseTryAgain"), SERVERERROR);
            }

            if (err) {
                // handle other errors
                return responseHelper.error(res, res.__("UploadValidImage"), FAILURE);
            }
            next();
        });
};