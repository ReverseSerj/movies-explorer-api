const allowedCors = [
  'https://petrov-films.nomoredomains.xyz',
  'http://petrov-films.nomoredomains.xyz',
  'https://api.petrov-films.nomoredomains.xyz',
  'http://api.petrov-films.nomoredomains.xyz',
  'http://localhost:3000',
  'http://localhost:3001',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.status(200).send();
  }
  next();
};