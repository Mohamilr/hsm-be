import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('User Profile', () => {
    before((done) => {
        mongoose.connect('mongodb+srv://hms:hms@hms-pypix.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
            mongoose.connection.db.dropDatabase();
            done();
        })
        .catch(e => console.log(e));
    });

    it('should give error on wrong token', (done) => {
        const _id = '5dd7cbdd6121092514c71753';

       chai.request(app)
       .put(`/api/v1/profile/${_id}`)
       .set('authorization', `bearer wrong token`)
       .send({
        _id,
        category: "category",
        phone: "phone",
        dateOfBirth: "dateOfBirth",
        gender: "gender",
        address: "address",
        localGovernment: "localGovernment",
        state: "state",
        country: "country",
        bloodGroup: "bloodGroup",
        height: "height",
        weight: "weight",
        genotype: "genotype",
        maritalStatus: "maritalStatus"
       })
       .end((err, res) => {
           res.should.have.status(403);
           res.body.should.be.a('object');
           res.body.should.have.property('status');
           res.body.status.should.equal('error');
       })
       done();
    })

    it('user should update profile', (done) => {
        const _id = '5dd7cbdd6121092514c71753';

       chai.request(app)
       .put(`/api/v1/profile/${_id}`)
       .set('authorization', `bearer ${process.env.TEST_TOKEN}`)
       .send({
        _id,
        category: "category",
        phone: "phone",
        dateOfBirth: "dateOfBirth",
        gender: "gender",
        address: "address",
        localGovernment: "localGovernment",
        state: "state",
        country: "country",
        bloodGroup: "bloodGroup",
        height: "height",
        weight: "weight",
        genotype: "genotype",
        maritalStatus: "maritalStatus"
       })
       .end((err, res) => {
           res.should.have.status(201);
           res.body.should.be.a('object');
           res.body.should.have.property('status');
           res.body.status.should.equal('success');
           res.body.should.have.property('data');
       })
       done();
    })
})