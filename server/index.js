const express = require('express')
const cors = require('cors')

const { makeExecutableSchema } = require('graphql-tools')
const gqlMiddleware = require('express-graphql')
const { graphqlUploadExpress } = require('graphql-upload')

const app = express()
const port = process.env.API_PORT || 7000

import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})


const start = async () => {
  
  app.use(cors("*"))
  app.use('/api',
    graphqlUploadExpress({ maxFileSize: 5000000, maxFiles: 20 }),
    gqlMiddleware({
      schema: schema,
      rootValue: resolvers,
      graphiql: true
    }))


  app.listen(port, () => {
    console.log(`Server is listening  at http://localhost:${port}/api`)
  })
}

start()

/*
    src:
    https://levelup.gitconnected.com/how-to-add-file-upload-to-your-graphql-api-34d51e341f38


    https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
    
    https://github.com/krissnawat/simple-react-upload

    https://github.com/zeroedprgrammer/geocode-excel
*/


/*

const storeUpload = async (upload, newname = '') => {
  try {
    const { createReadStream, filename, mimetype } = await upload
    const stream = createReadStream()
    const file = { filename: (newname || filename) + filename.substring(filename.lastIndexOf(".")), mimetype, }
    // Store the file in the filesystem.
    await new Promise((resolve, reject) => {
      stream
        .pipe(
          propertiesBucket.file((file.filename))
            .createWriteStream({
              resumable: false,
              gzip: true
            })
        )
        .on('error', reject)
        .on('finish', resolve)
    });
    Object.assign(file, {
      url: getPublicThumbnailUrlForItem(file.filename)
    })
    return file
  } catch (error) {
    throw error
  }

}
*/