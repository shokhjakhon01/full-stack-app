import http from "http";
import getAllUSer from "./controllers/getAlluser.controller.js";
import createUser from "./controllers/createuser.controller.js";
import deleteUser from "./controllers/deleteuser.controller.js";
import updateUser from "./controllers/updateUser.controller.js";
import getSingleUser from "./controllers/getsingleUser.controller.js";

const server = (req, res) => {
  // get all user
  getAllUSer(req, res);

  //get Single user
  getSingleUser(req, res);

  //create user
  createUser(req, res);

  //update user
  updateUser(req, res);

  //delete user
  deleteUser(req, res);
};

http.createServer(server).listen(5000, console.log("runnning on port " + 5000));
