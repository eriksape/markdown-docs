const chai = require('chai');

const expect = chai.expect;
const url = `http://backend:3000`;
const request = require('supertest')(url);

describe('GraphQL', () => {
    it('create a new document', (done) => {
        request.post('/api')
            .send({ query: '{ createDocument(number:1) { id title content updated_at } }'})
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);
                expect(res.body.data.createDocument).have.property('id')
                expect(res.body.data.createDocument).have.property('content')
                expect(res.body.data.createDocument).have.property('title')
                expect(res.body.data.createDocument).have.property('updated_at')
                done();
            })
    });

    it('Returns all documents', (done) => {
        request.post('/api')
            .send({ query: '{ readDocuments { id } }' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.data.readDocuments.length).greaterThan(0)
                done()
            });
    });

    it('read a document', (done) => {
        request.post('/api')
            .send({ query: '{ readDocument(id:1) { id, title } }' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.data.readDocument).have.property('id')
                expect(res.body.data.readDocument).have.property('title')
                expect(res.body.data.readDocument.title).equal('new document 1')
                done()
            });
    });

    it('update a document', (done) => {
        request.post('/api')
            .send({ query: '{ updateDocument(id:1 title:"hello test") { id, title } }' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.data.updateDocument).have.property('id')
                expect(res.body.data.updateDocument).have.property('title')
                expect(res.body.data.updateDocument.title).equal('hello test')
                done()
            });
    });

    it('delete a doccument', (done) => {
        request.post('/api')
            .send({ query: '{ deleteDocument(id:1) }' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.data.deleteDocument).equal(null)
                done()
            });
    });

});