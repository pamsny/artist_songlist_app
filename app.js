var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render("search");
});

app.get("/songlist", function(req,res){
  var query = req.query.userinput;
  var url = "https://itunes.apple.com/search?country=us&limit=100&term=" + query;
  request(url, function(error, response, body){
      if(!error && response.statusCode == 200){
          var songs = JSON.parse(body)
          res.render("songslist",{songs: songs});
    }
  });
});

app.listen(3000, function(){
  console.log("itunes app has started!");
});
