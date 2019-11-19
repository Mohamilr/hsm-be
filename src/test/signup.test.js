import chai from 'chai';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import UniqueValidator from 'mongoose-unique-validator';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);
chai.should();

const TestSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'patient',
        required: true
    }
});

const TestUser = mongoose.model('TestUser', TestSchema);

TestSchema.plugin(UniqueValidator);



describe('POST sign up', () => {
    before((done) => {
        // mongoose.connect('mongodb://localhost/testDatabase', function() {
        //     mongoose.connection.db.dropDatabase();
        //     done();
        // });
        mongoose.connect('mongodb://localhost/testDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('connected')
            })
            .catch(e => {
                console.log(e);
            })
        // const database = mongoose.connection;

        done();
    })

    it('should give error on invalid email', (done) => {
        chai.request(app)
            .post('/api/v1/signup')
        const newUser = new TestUser({
            firstname: 'mohammed',
            Lastname: 'ibrahim',
            email: 'ibrahim@email.com',
            password: '12345678'
        })
        newUser.save();
        done();
    });


    it('should give error on empty body value', (done) => {
        chai.request(app)
            .post('/api/v1/signup')
        const newUser = new TestUser({
            firstname: '',
            Lastname: 'i',
            email: 'ibrahim@email.com',
            password: '12345678'
        })
        newUser.save()
        done();
    });

    it('should give error if user with email exist', (done) => {
        chai.request(app)
            .post('/api/v1/signup')
        TestUser.findOne({
            email: 'ibrahim@email.com'
        }, (err, email) => {
           if(err){ throw err}
           if(email) {throw new Error ('error')}
           
        })
        done();
        
    });


    it('should sign up a user', (done) => {
        chai.request(app)
            .post('/api/v1/signup')
            const newUser = new TestUser({
                firstname: 'mohammed',
                Lastname: 'ibrahim',
                email: 'ibrahim@email.com',
                password: '12345678'
            })
            newUser.save();
            done();
    })

    after((done) => {
        mongoose.connection.dropDatabase(() => {
            mongoose.connection.close();
            done();
        })
    })
})