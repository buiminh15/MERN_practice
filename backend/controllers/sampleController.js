let path = require("path");
const fs = require('fs');

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

// exports.getFile = (req, res, next) => {
//     const file = path.join(`${__dirname}/`,'/../uploads/16.PNG');
//     console.log(file);
//     res.download(file); // Set disposition and send it.
// }

exports.getFile = (req, res, next) => {
 
  // Check if the right request is coming through for the file type
  return (
    new Promise((resolve, reject) => {
      if (req.query.file) {
        return resolve(`${req.query.file}`);
      }
      return reject(
        `Not found`
      );
    })
      // Validate if the files exists
      .then((file) => {
        return new Promise((resolve, reject) => {
          if (fs.existsSync(path.join(`${__dirname}/`, `../files/${file}`))) {
            return resolve(path.join(`${__dirname}/`, `../files/${file}`));
          }
          return reject(`File '${file}' was not found.`);
        });
      })
      // Return the file to download
      .then((filePath) => {
        res.download(filePath);
      })
      // Catches errors and displays them
      .catch((e) => {
        res.status(400).send({
          message_MINHBB: e,
        });
      })
  );
};

// exports.getFile = (req, res, next) => {
//   const fileTypes = ['csv', 'jpg', 'pdf', 'png', 'xslx'];

//   // Check if the right request is coming through for the file type
//   return (
//     new Promise((resolve, reject) => {
//       if (
//         req.query.file &&
//         fileTypes.indexOf(req.query.file.toLowerCase()) > -1
//       ) {
//         return resolve(
//           `sample.${fileTypes[fileTypes.indexOf(req.query.file.toLowerCase())]}`
//         );
//       }
//       return reject(
//         `Please provide a file type of ?file=${fileTypes.join('|')}`
//       );
//     })
//       // Validate if the files exists
//       .then((file) => {
//         console.log(`12`, file)
//         return new Promise((resolve, reject) => {
//           console.log(`13`, path.join(`${__dirname}/`,'../files'));
//           if (fs.existsSync(path.join(`${__dirname}/`, `../files/${file}`))) {
//             return resolve(path.join(`${__dirname}/`, `../files/${file}`));
//           }
//           return reject(`File '${file}' was not found.`);
//         });
//       })
//       // Return the file to download
//       .then((filePath) => {
//         res.download(filePath);
//       })
//       // Catches errors and displays them
//       .catch((e) => {
//         res.status(400).send({
//           message_MINHBB: e,
//         });
//       })
//   );
// };