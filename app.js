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
const aboutTitle = "About Us | ";
const factsTitle = "Facts | ";
const contactTitle = "Contact | ";
const homeTitle = "Home | ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-karan:Testpwd!234@cluster0.2s20q.mongodb.net/factsDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: contentContent,
    posts: posts,
    title: homeTitle
    });
});

app.get("/facts", function(req, res) {

  Post.find({}, function(err, posts){
    res.render("facts", {
      startingContent: factsStartingContent,
      posts: posts,
      title: factsTitle
      });
  });
});

app.get("/privacy", function(req, res) {
  res.render("privacy", {
    startingContent: privacyContent
  });
});

app.get("/terms-and-conditions", function(req, res) {
  res.render("terms-and-conditions", {
    startingContent: termsContent
  });
});

app.get("/compose/add-a-new-fact/V1faVFhHVCFrhoGKf07us2taSSe7DcxIT1mx664ntlGrKxdwr8PEfserIFSMk112ne7GfOUqmdQSaSDIodcWEQOYfHrKb08tTZOf/Cs3DQqfVVlKbVQkuTJNYlK2aMr1RHLrOz5snrKjCsw5gCNgsdfzq6LtoJrFKhvORIvwly12XJjp76nbAnZRREl3nACd0mvNvf5sL", function(req, res) {
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

app.get("/about-us", function(req, res) {
  res.render("about", {
    startingContent: aboutContent,
    title: aboutTitle
  });
});

app.get("/contact_us", function(req, res) {
  res.render("contact", {
    startingContent: contactContent,
    title: contactTitle
  });
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
