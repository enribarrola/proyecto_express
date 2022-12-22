import app from "./app.js";

async function main() {
  app.listen(3333);
  console.log("Server on port 3333");
}

main();