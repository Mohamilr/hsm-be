import jsonResponse from '../helper/responseHandler';

class Auth {
    static signUp (req, res, next)  {
      const { email, password } = req.body;

      if (!(/[\w]+@[a-zA-Z]+\.com$/.test(email))) {
         return jsonResponse.error(res, 'error', 400, 'Incorrect email format')
      }

      if(password.length < 3) {
        return jsonResponse.error(res, 'error', 400, 'Password should be more than 3 characters ')
      }
      next();
    }
}

export default Auth;