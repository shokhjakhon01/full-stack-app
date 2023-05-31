import { read, write } from "../utils/model.js";

const createUser = async (req, res) => {
  if (req.url === "/albums" && req.method === "POST") {
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
      const users = read("users");
      let { title, body, url } = await ReqBody;

      const id = users.at(-1).id + 1 || 1;
      const existingUser = users.find((user) => user.title === title);

      if (!existingUser) {
        const newUser = {
          id,
          title,
          body,
          url,
        };

        users.push(newUser);
        write("users", users);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(201, { "Content-type": "application/json" });
        res.end(
          JSON.stringify({
            status: "success",
            user: {
              newUser,
            },
          })
        );
      } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(400, { "Content-type": "application/json" });
        res.end(
          JSON.stringify({
            status: "fail",
            message: "Invalid user already exist",
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

export default createUser;
