import url from "url";
import { read } from "../utils/model.js";

const getSingleUser = (req, res) => {
  const { pathname } = url.parse(req.url);

  if (req.method == "OPTIONS") return res.end();
  if (pathname.startsWith("/albums/") && req.method === "GET") {
    try {
      const elId = pathname.split("/").at(-1);
      const users = read("users");

      const existingUser = users.find((user) => user.id == elId);
      if (existingUser) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(
          JSON.stringify({
            status: "success",
            data: {
              existingUser,
            },
          })
        );
      } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(404, { "Content-type": "application/json" });
        res.end(
          JSON.stringify({
            status: "fail",
            message: "User not found",
          })
        );
      }
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

export default getSingleUser;
