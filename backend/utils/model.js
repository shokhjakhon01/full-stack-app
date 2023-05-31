import fs from "fs";
import { resolve } from "path";

function read(filename) {
  const data = fs.readFileSync(
    resolve("database", filename + ".json"),
    "utf-8"
  );
  return JSON.parse(data);
}

function write(filename, data) {
  fs.writeFileSync(
    resolve("database", filename + ".json"),
    JSON.stringify(data, null, 2)
  );
  return true;
}

export { read, write };
