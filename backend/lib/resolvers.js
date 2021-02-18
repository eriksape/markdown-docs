const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const models = require('./../models');

module.exports = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return new Date(+ast.value) // ast value is always in string format
            }
            return null;
        },
    }),
    Void: new GraphQLScalarType({
        name: 'Void',

        description: 'Represents NULL values',

        serialize() {
            return null
        },

        parseValue() {
            return null
        },

        parseLiteral() {
            return null
        }
    }),
    Query: {
        createDocument: async(obj, {number}) => {
            const document = models.documents.build({
                title: `new document ${number}`,
                content: `# new document ${number}`
            });
            await document.save();

            return await models.documents.findByPk(document.id);
        },

        readDocuments: async () => {
            const documents = await models.documents.findAll({
                order:[['created_at', 'ASC']]
            });

            return documents.map(document => ({
                ...document.dataValues,
                content: decodeURIComponent(document.dataValues.content),
            }))
        },

        readDocument: async (obj, {id}) => {
            const document = models.documents.findByPk(id);
            document.content = decodeURIComponent(document.content);
            return document
        },

        updateDocument: async (obj, {id, title, content}) => {
            await models.documents.update({title, content}, {where: {id}})
            return await models.documents.findByPk(id);
        },

        deleteDocument: async(obj, {id}) => {
            await models.documents.destroy({where: {id}});
            return null
        }
    },

};
