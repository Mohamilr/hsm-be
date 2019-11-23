import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

let token, _id;

describe('User Profile', () => {
  it('should log in a user', done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@gmail.com',
        password: 'Password1!'
      })
      .then(res => {
        const body = res.body;
        expect(res.status).to.equal(200);
        expect(body).to.contain.property('status');
        expect(body).to.contain.property('data');
        expect(body.data).to.contain.property('token');
        expect(body.status).to.equal('success');
        expect(body.data).to.be.an('object');

        token = body.data.token;
        _id = body.data.user.id;
        done();
      });
  });

  it('should give error on wrong token', done => {
    const _id = '5dd7cbdd6121092514c71753';

    chai
      .request(app)
      .put(`/api/v1/profile/${_id}`)
      .set('authorization', `bearer wrong token`)
      .send({
        _id,
        category: 'category',
        phone: 'phone',
        dateOfBirth: 'dateOfBirth',
        gender: 'gender',
        address: 'address',
        localGovernment: 'localGovernment',
        state: 'state',
        country: 'country',
        bloodGroup: 'bloodGroup',
        height: 'height',
        weight: 'weight',
        genotype: 'genotype',
        maritalStatus: 'maritalStatus'
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('error');
      });
    done();
  });

  it('user should update profile', done => {
    chai
      .request(app)
      .put(`/api/v1/profile/${_id}`)
      .set('authorization', `bearer ${token}`)
      .send({
        _id,
        category: 'category',
        phone: 'phone',
        dateOfBirth: 'dateOfBirth',
        gender: 'gender',
        address: 'address',
        localGovernment: 'localGovernment',
        state: 'state',
        country: 'country',
        bloodGroup: 'bloodGroup',
        height: 'height',
        weight: 'weight',
        genotype: 'genotype',
        maritalStatus: 'maritalStatus'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        res.body.should.have.property('data');
      });
    done();
  });
});
describe("Fetch patient's data", () => {
  it("It should fetch a patient's data", async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/profile/${_id}`)
      .set('authorization', `bearer ${token}`);
    const body = res.body;
    expect(res.status).to.equal(201);
    expect(body).to.contain.property('status');
    expect(body).to.contain.property('data');
    expect(body.status).to.equal('success');
    expect(res.body.data).to.have.keys(
      'category',
      'phone',
      'dateofbirth',
      'gender',
      'address',
      'localgovernment',
      'state',
      'country',
      'bloodgroup',
      'height',
      'weight',
      'genotype',
      'maritalstatus',
      '_id',
      'firstname',
      'lastname',
      'email',
      'password',
      '__v'
    );
  });
  it('It should return an error on wrong token', async () => {
    let _id = '5dd68506e6af2948bc61faf4';
    const res = await chai
      .request(app)
      .get(`/api/v1/profile/${_id}`)
      .set('authorization', `bearer ${token}`);
    const body = res.body;
    expect(res.status).to.equal(401);
    expect(body).to.contain.property('status');
    expect(body).to.contain.property('error');
    expect(body.error).to.equal('unauthorized');
  });
});
