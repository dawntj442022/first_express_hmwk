const express = require("express");
const fs = require("fs");
const { request } = require("http");

//create express app
const app = express();

//create template engine
app.engine("hedwig", (filePath, options, callBack) => {
  fs.readFile(filePath, (err, data) => {
    if (err) return callBack(err);
    const rendered = data
      .toString()
      .replace("#title#", `<title>${options.title}</title>`)
      .replace("#message#", `<h1>${options.message}</h1>`);
    return callBack(null, rendered);
  });
});

app.set("views", "./views");
app.set("view engine", "hedwig");

app.get("/greeting", (request, response) => {
  response.render("template", {
    title: "homework1",
    message: "Hello Stranger",
  });
});

app.get("/greeting/:Jacob", (req, res) => {
  res.render("template", {
    title: "homework1",
    message: "Hello Jacob! So Great to See you!",
  });
});

// app.get("/tip", (req, res) => {
//   res.render("template", {
//     title: "homework1",
//     message: "tip for service",
//     content: "200",
//   });
// });

// app.get("/:money", (request, response) => {
//   let total = request.params.money;
//   response.render("template", {
//     title: "homework1",
//     message: `${total} bill for service`,
//     content: `${total * 0.25} gratiuity`,
//   });
// });

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
