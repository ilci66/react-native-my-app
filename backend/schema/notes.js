import { gql } from 'apollo-server-express';

// defining the type and extending the graphql methods with the defined types 

export default gql `
  extend type Query {
    notes: [Note!]
    note(id: ID!): Note!
  }

  extend type Mutation {
    createNewNote(text: String!): Note!
    deleteNote(id: ID!): Boolean!
    updateNote(id: ID!, text: String!): Note!
  }

  type Note {
    id: ID!
    text: String!
  }
`;