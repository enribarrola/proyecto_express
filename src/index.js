import app from "./app.js";
import * as dotenv from 'dotenv'
dotenv.config()
const port = process.env.APP_PORT || 3333;
async function main() {
  app.listen(port);
  console.log(`Server on port ${port}`);
}

main();