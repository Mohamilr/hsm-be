import jsonResponse from '../helper/responseHandler';


const verify = (req, res, next) => {
  const headers = req.headers['authorization'];
  

  if(typeof headers !== 'undefined') {
    const bearer = headers.split(' ');
    const token = bearer[1];

    req.token = token;
    next();
  }
  else {
     jsonResponse.error(res, 'error', 403 , 'forbidden')
  
};

export default verify;