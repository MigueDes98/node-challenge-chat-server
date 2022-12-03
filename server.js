const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
   console.log("Listening on port 3000")
  });

  app.get("/messages", function(req, res){
    res.json(messages);
  });

  app.post("/messages",(req, res) => {
  const newId = messages.length > 0 ? messages[messages.length - 1].id + 1: 0;
  const newMessage = {
    id: newId, 
    ...req.body,
  };
  messages.push(newMessage);
  res.json(newMessage);  
});

app.get("/messages/:messages_id", (req, res) => {
  const messagesId = req.params.messages_id;
  const result = messages.find((q) => q.id == messagesId);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send("Not Found");
  }
});

  app.post("/messages",(req, res) => {
  const newId = messages.length > 0 ? messages[messages.length - 1].id + 1: 0;
  const newMessage = {
    id: newId, 
    ...req.body,
  };
  messages.push(newMessage);
  res.json(newMessage);  
});

app.delete("/messages/:messages_id", (req, res) => {
  const messagesId = req.params.messages_id;
  const messagesIdx = messages.findIndex((q) => q.id == messagesId);
  if (messagesIdx > -1) {
    messages.splice(messagesId, 1);
    res.status(200).json(messages);
  } else {
    res.status(404).send("Not Found");
  }
});
