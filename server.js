const express = require("express");
const fs = require("fs");

const app = express();

app.engine("hedwig", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    const rendered = content
      .toString()
      .replace("#title#", `<title>${options.title}</title>`)
      .replace("#message#", `<h1>${options.message}</h1>`)
      .replace(
        "#content#",
        `<a href="http://localhost:3000/${options.content}">"Hello"</a>`
      );
    return callback(null, rendered);
  });
});

app.set("views", "./views");
app.set("view engine", "hedwig");

app.get("/", (req, res) => {
  res.send("<h1>Hello Stranger!</h1>");
  res.render("template", {
    message: "So Great to See You!",
  });
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
