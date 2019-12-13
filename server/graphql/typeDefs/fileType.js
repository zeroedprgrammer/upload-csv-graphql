export default `
scalar JSON
scalar Upload

type File {
  id: ID
  path: String!
  filename: String!
  mimetype: String!
  url: String
}

input FileInput {
  path: String!
  filename: String!
  mimetype: String!
}

type Mutation {
  uploadFile(file: Upload!): File!
}
`