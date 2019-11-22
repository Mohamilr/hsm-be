import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import jsonResponse from '../helper/responseHandler';

const updateProfile = (req, res) => {
    const _id = req.params.id;
    const { category, phone, dateOfBirth, gender, address, localGovernment, state, country, bloodGroup, height, weight, genotype, maritalStatus } = req.body;

    // verify token
    jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
        // incorrect token
        if (err) {
            return jsonResponse.error(res, 'error', 403, 'forbidden route')
        }

        // new profile entry
        const newProfile = new User({
            _id,
            category: category,
            phone: phone,
            dateOfBirth: dateOfBirth,
            gender: gender,
            address: address,
            localGovernment: localGovernment,
            state: state,
            country: country,
            bloodGroup: bloodGroup,
            height: height,
            weight: weight,
            genotype: genotype,
            maritalStatus: maritalStatus
        })
        // update user profile
        User.updateOne({ _id }, newProfile)
            .then(() => {
                return jsonResponse.success(res, 'success', 201, 'User profile successfully updated')
            })
            .catch(e => console.log(e))
    })
};

export default updateProfile;