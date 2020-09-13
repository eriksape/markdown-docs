const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

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
    Query: {
        getDocuments: async () => {
            return [{
                "id": 1,
                "title": "incubate intuitive solutions",
                "content": "Balanced systemic Graphical User Interface",
                "updated_at": new Date(2020, 1, 29, 11, 45, 5, 123)
            }, {
                "id": 2,
                "title": "repurpose granular architectures",
                "content": "Profound uniform paradigm",
                "updated_at": new Date(2020, 2, 29, 11, 45, 5, 123)
            }, {
                "id": 3,
                "title": "drive sexy infrastructures",
                "content": "Monitored local flexibility",
                "updated_at": new Date(2020, 3, 29, 11, 45, 5, 123)
            }, {
                "id": 4,
                "title": "visualize intuitive users",
                "content": "Reactive needs-based functionalities",
                "updated_at": new Date(2020, 4, 29, 11, 45, 5, 123)
            }, {
                "id": 5,
                "title": "incentivize frictionless supply-chains",
                "content": "Reactive fresh-thinking function",
                "updated_at": new Date(2020, 5, 29, 11, 45, 5, 123)
            }, {
                "id": 6,
                "title": "evolve magnetic niches",
                "content": "Progressive fresh-thinking website",
                "updated_at": new Date(2020, 6, 29, 11, 45, 5, 123)
            }, {
                "id": 7,
                "title": "embrace ubiquitous initiatives",
                "content": "Function-based neutral moderator",
                "updated_at": new Date(2020, 7, 29, 11, 45, 5, 123)
            }, {
                "id": 8,
                "title": "envisioneer user-centric applications",
                "content": "Face to face optimizing toolset",
                "updated_at": new Date(2020, 8, 10, 11, 45, 5, 123)
            }, {
                "id": 9,
                "title": "transform integrated users",
                "content": "Synergistic 6th generation framework",
                "updated_at": new Date(2020, 8, 12, 23, 45, 5, 123)
            }, {
                "id": 10,
                "title": "e-enable best-of-breed initiatives",
                "content": "Monitored composite artificial intelligence",
                "updated_at": new Date(2020, 8, 13, 7, 45, 5, 123)
            }]
        },
    },

};