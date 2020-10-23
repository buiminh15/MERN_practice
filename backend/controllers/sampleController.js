let path = require("path");

exports.getTest = (req, res, next) => {
    res.status(200).json({data: path.join(`${__dirname}/`)})
}

exports.uploadFileToFolder = (req, res, next) => {
    console.log('aaa');
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
}

exports.getFile = (req, res, next) => {
    const file = path.join(`${__dirname}/`,'/../uploads/16.PNG');
    console.log(file);
    res.download(file); // Set disposition and send it.
}


