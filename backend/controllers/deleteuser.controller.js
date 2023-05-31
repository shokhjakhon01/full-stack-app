import { read, write } from "../utils/model.js";
import url from "url";

const deleteUser = (req, res) => {
  const parsedUrl = url.parse(req.url);
  const path = parsedUrl.pathname;

  if (req.method == "OPTIONS") return res.end();
  if (path.startsWith("/albums/") && req.method == "DELETE") {
    try {
      const elId = path.split("/").at(-1);

      const users = read("users");
      const existingUser = users.find((user) => user.id == elId);
      if (existingUser) {
        const filteredUsers = users.filter((user) => user.id != elId);
        write("users", filteredUsers);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(
          JSON.stringify({
            status: "success",
            message: "album deleted successfully!",
          })
        );
      } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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
export default deleteUser;
