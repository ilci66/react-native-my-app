import { gql } from 'apollo-server-express';

// don't forget the "!" means non-nullable
export default gql `
  extend type Query {
    notes: [Note!]
    note(id: ID!): Note!
  }

  type Note {
    id: ID!
    text: String!
  }
`;