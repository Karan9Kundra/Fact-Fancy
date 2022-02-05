//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

const factsStartingContent = "Fact Fancy is a site where you can get facts about lots of topics.";
const aboutContent = "About Fact Fancy.";
const contentContent = "Fact Fancy gives you facts about loads of topics, including: sports, games, news or simply just plain facts!";
const contactContent = "Contact Us!";
const privacyContent = "Privacy Policy.";
const termsContent = "Terms And Conditions";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/factDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: contentContent,
    posts: posts
    });
});

app.get("/privacy", function(req, res) {
  res.render("privacy", {
    startingContent: privacyContent
  });
});

app.get("/terms-and-conditions", function(req, res) {
  res.render("terms-and-conditions", {
    startingContent: privacyContent
  });
});

app.get("/facts", function(req, res) {

    Post.find({}, function(err, posts){
      res.render("facts", {
        startingContent: factsStartingContent,
        posts: posts
        });
    });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if (!err){
        res.redirect("/facts");
    }
  });
});


app.get("/posts/:postId", function(req, res) {

    const requestedPostId = req.params.postId;

    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
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

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
