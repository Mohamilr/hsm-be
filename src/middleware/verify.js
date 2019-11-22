import jsonResponse from '../helper/responseHandler';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';


const verify = async (req, res, next) => {
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded, req.params.id)
    if(req.params.id != decoded.userId){
        jsonResponse.error(res, 'error', 401 , 'unauthorized')
    }

    req.token = token;
    req.id = decoded.userId;
    
    next();
  }
  else {
     jsonResponse.error(res, 'error', 401 , 'unauthorized')
  
    };
}

export default verify;
