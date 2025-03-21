require("dotenv").config();
const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Captain service runing at http://localhost:${PORT}`);
});
