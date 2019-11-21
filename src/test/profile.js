import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('User Profile', () => {
    before((done) => {
        mongoose.connect('mongodb+srv://hms:hms@hms-pypix.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser, useUnifiedTopology}, () => {
            mongoose.connect.db.dropDatabase();
            done();
        })
        .catch(e => console.log(e));
    });

    it('should give error on wrong token', (done) => {
        const _id = '';

       chai.request(app)
       .put(`/api/v1/user/${_id}`)
       .set('authorization', `bearer token`)
       .send({})
       .end((err, res) => {
           res.should.have.status(200)
       })
       done();
    })

    it('user should update profile', (done) => {
        const _id = '';

       chai.request(app)
       .put(`/api/v1/user/${_id}`)
       .set('authorization', `bearer token`)
       .send({})
       .end((err, res) => {
           res.should.have.status(200)
       })
       done();
    })
})