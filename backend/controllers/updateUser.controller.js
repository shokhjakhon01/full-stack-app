import { read, write } from "../utils/model.js";
import url from "url";

const updateUser = async (req, res) => {
  const { pathname } = url.parse(req.url);

  if (req.method == "OPTIONS") return res.end();
  if (pathname.startsWith("/albums/") && req.method === "PUT") {
    const ReqBody = new Promise((resolve, reject) => {
      let result = "";
      req.on("data", (chunk) => {
        result += chunk;
      });
      req.on("end", () => {
        resolve(JSON.parse(result));
      });
    });

    try {
      const elId = req.url.split("/").at(-1);
      const users = read("users");
      const { title, body, url } = await ReqBody;
      console.log(title, body, url);
      const existingUser = users.find((user) => user.id == elId);
      if (existingUser) {
        existingUser.title = title || existingUser.title;
        existingUser.body = body || existingUser.body;
        existingUser.imageUrl = url || existingUser.url;

        write("users", users);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(
          JSON.stringify({
            status: "success",
            message: "Information updated!",
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

export default updateUser;
