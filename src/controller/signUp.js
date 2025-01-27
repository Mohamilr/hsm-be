import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import jsonResponse from '../helper/responseHandler';
import { User } from '../models/User';

const SignUp = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    // if body values are empty
    if(!firstName || !lastName || !email || !password) {
        return jsonResponse.error(res, 'error', 400, 'Input field cannot be blank');
    }

    // if email exists
    User.findOne({
        email
    }).then(email => {
        if(email) {
            return jsonResponse.error(res, 'error', 400, 'user with email already exist, please sign in')
        }
    })
    // catch error
    .catch(e => {
        console.log(e)
    });

    // hash password
     bcrypt.hash(password.toString(), 10).then(hashPassword => {
        //  create new user
        const user = new User({
            firstname: firstName,
            lastname: lastName,
            email,
            password: hashPassword
        });
        user.save()
        .then(user => {
            // generate token
            jwt.sign({email, password}, process.env.SECRET_KEY, {expiresIn: '24h'}, (err, token) => {
                const data = {
                    user,
                    token
                }
                return jsonResponse.success(res, 'success', 201, data)
            })
        })
        // catch error
        .catch((e) => {
            console.log(e);
        })
     })
}

export default SignUp;