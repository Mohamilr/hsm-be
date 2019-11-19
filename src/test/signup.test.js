import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('POST sign up', () => {
    it('should give error on invalid email', (done) => {
        chai.request(app)
        .post('/api/v1/signup')
        .send({
            firstName: 'mohammed',
            LastName: 'ibrahim',
            email: 'ibrahimdamymailcom',
            password: 12345678 
        })
        .end((err, res) => {
            res.should.have.status(400)
        })
     });


    it('should give error on empty body value', (done) => {
       chai.request(app)
       .post('/api/v1/signup')
       .send({
        firstName: '',
        LastName: 'ibrahim',
        email: '',
        password: 12345678 
       })
       .end((err, res) => {
           res.should.have.status(400)
       })
    });

    it('should sign up a user', (done) => {
        chai.request(app)
        .post('/api/v1/signup')
        .send({
            firstName: 'mohammed',
            LastName: 'ibrahim',
            email: 'ibrahimdamy@email.com',
            password: 12345678
        })
        .end((err, res) => {
            res.should.have.status(201);
        })
    })
})