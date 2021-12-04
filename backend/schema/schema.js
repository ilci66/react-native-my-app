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
        return db.query('SELECT ARRAY_AGG(type) type FROM drawing_object_relation INNER JOIN mock_drawing USING(drawing_uid) INNER JOIN mock_object USING(object_uid) WHERE drawing_uid = $1', [args.drawing_uid], (err, result) => {
          if(err) console.log(err);
          return result.rows;
        })
      }
    },
    object: {
      // gonna continue after my break
    }
  }
})