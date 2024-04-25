const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const BlogPosts = require("./BlogPosts");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.use(cors());
app.post("/api/newpost", jsonParser, (req, res) => {
  const post = {
    slug: req.body.slug,
    title: req.body.title,
    description: req.body.description,
  };
  BlogPosts.BlogPosts.push(post);
  res.status(200).send({ message: "Posted successful" });
});

app.post("/api/login", jsonParser, (req, res) => {
  const creds = {
    username: req.body.username,
    password: req.body.password,
  };
  if (creds.username === "admin" && creds.password === "123") {
    res.status(200).send({ message: "Login successful" });
  } else {
    res.status(400).send({ message: "Login failed" });
  }
});

app.get("/api/posts", function (req, res) {
  res.send(JSON.stringify(BlogPosts.BlogPosts));
});
app.get("/api/post/:slug", function (req, res) {
  const slug = req.params.slug;
  const post = BlogPosts.BlogPosts.find((element) => element.slug === slug);
  if (post) res.send(JSON.stringify(post));
  else res.status(404).send("Not found");
});
app.get("/", (req, res) => {
  res.send("sever is running!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
