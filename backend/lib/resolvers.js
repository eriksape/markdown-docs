const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const PGConnection = require('./postgres')

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
            const database = new PGConnection();
            const client = await database.client.connect();
            const query = 'INSERT INTO documents(title, content) VALUES ($1, $2) RETURNING id, title, content, updated_at';
            const values = [`new document ${number}`, `# new document ${number}`];
            const document = await client.query(query, values);
            await client.end();

            return document.rows[0];
        },

        readDocuments: async () => {
            const database = new PGConnection();
            const client = await database.client.connect();
            const documents = await client.query('SELECT id, title, content, updated_at FROM documents');
            await client.end();

            return documents.rows;
        },

        readDocument: async (obj, {id}) => {
            const database = new PGConnection();
            const client = await database.client.connect();
            const documents = await client.query('SELECT id, title, content, updated_at FROM documents where id=$1', [id]);
            await client.end();
            return documents.rows[0];
        },

        updateDocument: async (obj, {id, title, content}) => {
            const database = new PGConnection();
            const client = await database.client.connect();
            const row = (await client.query('SELECT id, title, content FROM documents where id=$1', [id])).rows[0]
            const query = 'UPDATE documents SET title=$1, content=$2, updated_at=now() where id=$3 RETURNING id, title, content, updated_at';
            const values = [title||row.title, (content ? decodeURI(content):row.content), id];
            const document = await client.query(query, values)
            await client.end();

            return document.rows[0];
        },

        deleteDocument: async(obj, {id}) => {
            const database = new PGConnection();
            const client = await database.client.connect();
            const query = 'DELETE FROM documents where id=$1';
            const document = await client.query(query, [id])
            await client.end();

            return null
        }
    },

};