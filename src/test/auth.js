import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../app';

chai.should();

chai.use(chaiHttp);

describe('Users Authentication', () => {
  before(done => {
    mongoose
      .connect(
        'mongodb+srv://hms:hms@hms-pypix.mongodb.net/test?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true },
        function() {
          mongoose.connection.db.dropDatabase();
          done();
        }
      )
      .catch(e => {
        console.log(e);
      });
  });
  describe('POST /api/v1/auth/signup', () => {
    it('should add a user', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'test@gmail.com',
          firstName: 'test',
          lastName: 'tester',
          password: 'Password1!'
        });
      const { body } = res;
      expect(res.status).to.equal(201);
      expect(body).to.contain.property('status');
      expect(body).to.contain.property('data');
      expect(body.data).to.contain.property('user');
      expect(body.status).to.equal('success');
      expect(body.data).to.be.an('object');
    });

    it('should add a user', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'test2@gmail.com',
          firstName: 'test',
          lastName: 'tester',
          password: 'Password1!'
        });
      const { body } = res;
      expect(res.status).to.equal(201);
      expect(body).to.contain.property('status');
      expect(body).to.contain.property('data');
      expect(body.data).to.contain.property('user');
      expect(body.status).to.equal('success');
      expect(body.data).to.be.an('object');
    });

    it('should check if user exists', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'test2@gmail.com',
          firstName: 'test',
          lastName: 'tester',
          password: 'Password1!'
        });
      const body = res.body;
      expect(res.status).to.equal(400);
      expect(body).to.contain.property('status');
      expect(body).to.contain.property('error');
      expect(body.status).to.equal('error');
      expect(body.error).to.be.a('string');
      expect(body.error).to.equal(
        'A user with the email already exists, please sign in'
      );
    });

    it('should check for missing first name input field', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          lastName: 'asd',
          email: 'asd@as.com',
          password: 'asdfgh'
        });
      const body = res.body;
      expect(res.status).to.equal(400);
      expect(body).to.contain.property('error');
      expect(body).to.contain.property('status');
      expect(body.error).to.be.a('string');
    });

    it('should check for missing last name input field', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'asd',
          email: 'asd@as.com',
          password: 'asdfgh'
        });
      const body = res.body;
      expect(res.status).to.equal(400);
      expect(body).to.contain.property('error');
      expect(body).to.contain.property('status');
      expect(body.error).to.be.a('string');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should log in a user', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test2@gmail.com',
          password: 'Password1!'
        });
      const body = res.body;
      expect(res.status).to.equal(200);
      expect(body).to.contain.property('status');
      expect(body).to.contain.property('data');
      expect(body.data).to.contain.property('token');
      expect(body.status).to.equal('success');
      expect(body.data).to.be.an('object');
    });

    it('should check if user does not exist', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'tes@test.co',
          password: 'Password1!'
        });
      const body = res.body;
      expect(res.status).to.equal(401);
      expect(body).to.contain.property('status');
      expect(body).to.contain.property('error');
      expect(body.status).to.equal('error');
      expect(body.error).to.be.a('string');
      expect(body.error).to.equal('Invalid Credentials');
    });

    it('should for wrong email-password combination', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'Password1!r'
        });
      const body = res.body;
      expect(res.status).to.equal(401);
      expect(body).to.contain.property('status');
      expect(body).to.contain.property('error');
      expect(body.status).to.equal('error');
      expect(body.error).to.be.a('string');
      expect(body.error).to.equal('Invalid Credentials');
    });

    it('should return error for incomplete body request', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          password: ''
        });
      const body = res.body;
      expect(res.status).to.equal(400);
      expect(body).to.contain.property('status');
      expect(body).to.contain.property('error');
      expect(body.status).to.equal('error');
      expect(body.error).to.be.a('string');
      expect(body.error).to.equal('Input field cannot be blank');
    });
  });
});
