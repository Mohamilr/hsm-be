import jsonResponse from '../helper/responseHandler';


const verify = (req, res, next) => {
  const header = req.headers['authorization'];
  

  if(typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    req.token = token;
    next();
  }
  else {
     jsonResponse.error(res, 'error', 403 , 'forbidden')
  
};
}

export default verify;