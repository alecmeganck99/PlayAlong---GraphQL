/**
 * The Scalars (custom input/output types)
 */

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

module.exports = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "This type will represent a date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value));
      }
      return null;
    }
  })
}