import app from './app';
import * as dotenv from 'dotenv'
import Log from './bin/custom/Log';
dotenv.config()

const port = process.env.PORT;
console.log("Server has started");

app.listen(port, () => {
  Log.info('App started')
  console.log(`App Started on ${port}`);
});
