import url from "url";
import { read } from "../utils/model.js";

const getAllUSer = (req, res) => {
  let { pathname } = url.parse(req.url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method == "OPTIONS") return res.end();
  if (pathname === "/albums" && req.method === "GET") {
    try {
      const users = read("users");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({
          status: "success",
          results: users.length,
          users: {
            users,
          },
        })
      );
    } catch (error) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({
          status: "fail",
          message: error.message,
        })
      );
    }
  }
};

export default getAllUSer;
