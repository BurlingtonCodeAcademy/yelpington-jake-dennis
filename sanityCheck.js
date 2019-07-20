#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// perform a JS escape on the given object or string
function escaped(o) {
  return JSON.stringify(o.toString());
}

let baseDir = ".";
let ignore = ["all.json", "package.json", "package-lock.json"];

fs.readdir(baseDir, function(err, items) {
  for (let item of items) {
    if (!ignore.includes(item) && item.endsWith(".json")) {
      let pathname = path.join(baseDir, item);
      fs.readFile(pathname, function(err, data) {
        console.log();
        try {
          let parsed = JSON.parse(data.toString());
          if (!parsed.id.match(/^[a-z0-9-]*$/)) {
            console.error(
              pathname + ": id contains non-alphanumeric characters"
            );
          } else {
            console.log(pathname + ": OK");
            for (var key in parsed) {
              console.log("\t" + key + "\t" + parsed[key]);
            }
          }
        } catch (error) {
          console.error(pathname + ": " + escaped(error));
        }
      });
    }
  }

  fs.readFile(path.join(baseDir, "all.json"), function(err, data) {
    let parsed = JSON.parse(data.toString());
    for (let id of parsed) {
      if (!items.includes(id + ".json")) {
        console.error(
          "all.json mentions " +
            escaped(id) +
            " but there is no JSON file with that name"
        );
      }
    }
  });
});
