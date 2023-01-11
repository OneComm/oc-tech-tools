import fs from 'fs';
const authenticate = require('mailauth');

export default function AuthenticateMail(file) {
  const message = fs.createReadStream(file);
  const res = authenticate(message);
  console.log(res);
}