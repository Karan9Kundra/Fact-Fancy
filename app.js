//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const factsStartingContent = "Fact Fancy is a site where you can get facts about lots of topics.";
const aboutContent = "About Fact Fancy.";
const contentContent = "Fact Fancy gives you facts about loads of topics, including: sports, games, news or simply just plain facts!";
const contactContent = "Contact Us!";
const privacyContent = "Privacy Policy.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res) {
  res.render("home", {
    startingContent: contentContent
  });
});

app.get("/privacy", function(req, res) {
  res.render("privacy", {
    startingContent: privacyContent
  });
});

app.get("/facts", function(req, res) {
  res.render("facts", {
    startingContent: factsStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    startingContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    startingContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/facts");

});


app.get("/posts/:postname", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postname);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {

      res.render("post", {
        title: post.title,
        content: post.content
      });

    }
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
