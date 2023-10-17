import { createServer } from 'http';
import dotenv from 'dotenv';
dotenv.config();

createServer((req, res) => {
  res.write('Hello World!');
  res.end();
}).listen(process.env.PORT, () => {
  console.log("server is listening");
});
