import jsonResponse from '../helper/responseHandler';
import { type } from 'os';

class Auth {
    static signUp (req, res, next)  {
      const { email, password } = req.body;

      if (!(/[\w]+@[a-zA-Z]+\.com$/.test(email))) {
         return jsonResponse.error(res, 'error', 400, 'incorrect email format')
      }

      if(password.length < 6) {
        return jsonResponse.error(res, 'error', 400, 'password should be more than 5 characters ')
      }
      next();
    }
}

export default Auth;