/* eslint-disable import/first */
require('dotenv').config();

import http from 'http';
import micro from 'micro';
import handler from '.';

const PORT = 4000;
const server = new http.Server(micro(handler));
server.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
