import graphql from "graphql";
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;
import db from '../db/index.js';


// copied from data sql files

// create table mock_drawing (
// 	drawing_uid UUID NOT NULL PRIMARY KEY,
// 	uri VARCHAR(2050),
// 	info VARCHAR(300)
// );
const DrawingType = new GraphQLObjectType({
  name: 'Drawing',
  fileds: () => ({
    drawing_uid: {type:GraphQLID},
    info: {type:GraphQLString},
    uri: {type:GraphQLString},
    objects: {
      type: new GraphQLList(ObjectType),
      resolve(parent, args){
        // example query from docs
        // db.query('SELECT * FROM users WHERE id = $1', [req.params.id], (err, result) => {})
        return db.query('SELECT ARRAY_AGG(type) type, ARRAY_AGG(object_uid) FROM drawing_object_relation INNER JOIN mock_drawing USING(drawing_uid) INNER JOIN mock_object USING(object_uid) WHERE object_uid = $1  GROUP BY info', [parent.drawing_uid], (err, result) => {
          if(err) console.log(err);
          return result.rows
        })
      }
    }
  })
});



// create table mock_object (
// 	 object_uid UUID NOT NULL PRIMARY KEY,
// 	 type VARCHAR(300)
// );

const ObjectType = new GraphQLObjectType({
  name: 'Object',
  fields: () => ({
    object_uid: {type: GraphQLID},
    type: {type: GraphQLString},
    drawings: {
      type: new GraphQLList(DrawingType),
      resolve(parent, args){
        return db.query('SELECT drawing_uid, info, object_uid FROM drawing_object_relation INNER JOIN mock_drawing USING(drawing_uid) INNER JOIN mock_object USING(object_uid) WHERE object_uid = $1', [parent.object_uid], (err, result) => {
          if(err) console.log(err);
          return result.rows
        })
      }
    }
  })
});

// this one doesn't seem necessary to use directly
// create table drawing_object_relation (
//   relation_uid UUID NOT NULL PRIMARY KEY,
//   object_uid UUID REFERENCES mock_object(object_uid),
//   drawing_uid UUID REFERENCES mock_drawing(drawing_uid)
// );


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    drawing: {
      type: DrawingType,
      args: { drawing_uid: { type: GraphQLID } },
      resolve(parent, args){
        return db.query('SELECT ARRAY_AGG(uri) uri, ARRAY_AGG(info) info,ARRAY_AGG(type) type FROM drawing_object_relation INNER JOIN mock_drawing USING(drawing_uid) INNER JOIN mock_object USING(object_uid) WHERE drawing_uid = $1', [args.drawing_uid], (err, result) => {
          if(err) console.log(err);
          return result.rows;
        })
      }
    },
    // don't know what to do with it yet but sure, why not have it 
    object: {
      type: ObjectType,
      args: { object_uid: { type: GraphQLID } },
      resolve(parent, args){
        return db.query('SELECT uri,info, ARRAY_AGG(type) type from mock_object JOIN drawing_object_relation USING(object_uid) JOIN mock_drawing USING(drawing_uid) WHERE object_uid = $1', [args.object_uid], (err, result) => {
          if(err) console.log(err);
          return result.rows;
        })
      
      }
    },
    drawings: {
      type: new GraphQLList(DrawingType),
      resolve(parents, args){
        // return all the drawings, with all their objects
        return db.query('SELECT drawing_uid, uri, info, ARRAY_AGG(type) type, ARRAY_AGG(object_uid) object_uid FROM drawing_object_relation INNER JOIN mock_drawing USING(drawing_uid) INNER JOIN mock_object USING(object_uid) GROUP BY info, uri, drawing_uid', [], (err, result) => {
          if(err) console.log(err);
          return result.rows;
        })
      }
    },
    objects: {
      type: new GraphQLList(ObjectType),
      resolve(parents, args){
        return db.query('SELECT * FROM mock_object', [], (err, result) => {
          if(err) console.log(err);
          return result.rows;
        })
      }
    }
  }
});


// I don't need any mutations for now, maybe later... 
export default new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutation
});