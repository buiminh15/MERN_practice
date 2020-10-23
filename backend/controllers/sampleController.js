let path = require("path");

exports.getTest = (req, res, next) => {
    res.status(200).json({data: path.join(`${__dirname}/`)})
}

exports.uploadFileToFolder = (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
}