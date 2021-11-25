import { gql } from "apollo-server-express";
    
import noteSchema from "./notes";

// leaving empty for now

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;