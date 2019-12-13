'use strict'
// const promisesAll = require('promises-all')



const fs = require('fs');
const storeFS = ({ stream, filename }) => {
  const uploadDir = '../../uploads';
  const path = `${uploadDir}/${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // delete the truncated file
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ path }))
  );
}

module.exports = {
  Mutation: {
    uploadFile: async (args) => {
      const { description, tags } = args;
      const { filename, mimetype, createReadStream } = await args.file;
      const stream = createReadStream();
      const pathObj = await storeFS({ stream, filename });
      const fileLocation = pathObj.path;
      /*
      const photo = await models.Photo.create({
          fileLocation,
          description,
          tags
      })
      */
      return null;
    }
    ,
  }
}

