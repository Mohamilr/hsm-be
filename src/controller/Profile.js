import { User } from '../models/User';
import jsonResponse from '../helper/responseHandler';

const Profile = {
  async updateProfile(req, res) {
    const _id = req.params.id;
    const {
      category,
      phone,
      dateOfBirth,
      gender,
      address,
      localGovernment,
      state,
      country,
      bloodGroup,
      height,
      weight,
      genotype,
      maritalStatus
    } = req.body;

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
    });
    // update user profile
    User.updateOne({ _id }, newProfile)
      .then(() => {
        return jsonResponse.success(
          res,
          'success',
          201,
          'User profile successfully updated'
        );
      })
      .catch(e => console.log(e));
  },
  async fetchUserRecord(req, res) {
    try {
      const user = await User.findById(req.params.id);
      return jsonResponse.success(res, 'success', 201, user);
    } catch (error) {
      console.log(error);
    }
  }
};

export default Profile;
