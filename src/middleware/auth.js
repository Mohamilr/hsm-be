import jsonResponse from '../helper/responseHandler';

class Auth {
    static signUp (req, res, next)  {
      const { email, password, firstName, lastName, category } = req.body;

      if (!(/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(email))) {
         return jsonResponse.error(res, 'error', 400, 'Incorrect email format')
      }

      if(!password || password.length < 3) {
        return jsonResponse.error(res, 'error', 400, 'Password should be more than 3 characters ')
      }

      if(!firstName) {
        return jsonResponse.error(res, 'error', 400, 'First name is required')
      }

      if(!lastName) {
        return jsonResponse.error(res, 'error', 400, 'Last name is required')
      }

      next();
    }
}

export default Auth;