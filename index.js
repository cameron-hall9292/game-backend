



const express = require("express");

const app = express();


//set view engine

//app.set('view-engine', 'html');


app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })


app.get("/api/test", (req, res) => {
    res.json("Hello New World!");

});



//render images to client

app.get("/api/:image", (req, res) => {
  const image = req.params.image;
  res.sendFile(__dirname + `/images/${image}`);
});


//render pong_clone game




app.get("/pong", (req, res) => {
  res.sendFile(__dirname + "/games/Pong_Clone.html");
});


app.get("/pong/image", (req, res) => {
  res.sendFile(__dirname + "/images/pong.jpg");
});



//get pong game sounds


app.get("/pongsounds/:sound", (req, res) => {

  const soundName = req.params.sound;

  res.sendFile(__dirname + `/games/pong_sounds/${soundName}`);
});





//render red_dot game

app.get("/redDot", (req, res) => {
  res.sendFile(__dirname + "/games/red_dot.html");
});


app.get("/redDot/image", (req, res) => {
  res.sendFile(__dirname + "/images/red-dot.jpg");
});


//get redDot game sounds

app.get("/redDotsounds/:sound", (req, res) => {

  const soundName = req.params.sound;

  res.sendFile(__dirname + `/games/red_dot_sounds/${soundName}`);
});






//render snake_clone game

app.get("/snake", (req, res) => {
  res.sendFile(__dirname + "/games/snake_clone.html");
});


app.get("/snake/image", (req, res) => {
  res.sendFile(__dirname + "/images/snake.jpg");
});




//render black_jack game

app.get("/blackjack", (req, res) => {
  res.sendFile(__dirname + "/games/blackJack/blackjack.html");
});

app.get("/blackjackcss", (req, res) => {
  res.sendFile(__dirname + "/games/blackJack/blackJack.css");
});



app.get("/blackjackjs", (req, res) => {
  res.sendFile(__dirname + "/games/blackJack/blackjack.js");
});

app.get("/blackjack/image", (req, res) => {
  res.sendFile(__dirname + "/images/blackjack-3.png");
});



//get blackjack game images


app.get("/assets/:img", (req, res) => {

  const imageName = req.params.img;

  res.sendFile(__dirname + `/games/blackJack/bj_assets/${imageName}`);
});






const listener = app.listen(process.env.PORT || 5500, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
  