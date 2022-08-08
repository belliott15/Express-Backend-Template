const http = require('node:http');
const pool = require('./lib/utils/pool');
const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('🚀 Server running', server.address());
});

process.on('exit', () => {
  console.log('👋  Goodbye!');
  pool.end();
});
