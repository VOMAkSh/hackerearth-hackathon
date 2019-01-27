const functions = require("firebase-functions");
const express = require("express");
const sendEmails = require("./mailer/mailer");
const bodyParser = require("body-parser");
const facebook = require("fb-messenger-bot-api");
const messagingClient = new facebook.FacebookMessagingAPIClient(
  "EAAEf2hIET3cBAMI41jZBPetb3miLLuZChDh4ATmjkgarU0B9cZCAJ31LD4JVZAGQCD6AAJk9GZBWEwLAZBRHn6RvAUsQLcqW7QOrTSAZCu86etuCUfFO8xQajfQOu37HuNiTbmwrsW9kRemAqu4hmUpLZBJXmfYTbYwvh8uluqFUxuqevDGjbdPD"
);
const messageParser = facebook.FacebookMessageParser;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/sendBulkEmails", (req, res) => {
  sendEmails(
    ["vomaksh@gmail.com"],
    "This is my TEST Subject",
    "This is my TEST text",
    "<b>TEST Body</b> in mail"
  );
  res.send("Email sent successfully");
});

app.get("/messengerWebhook", facebook.ValidateWebhook.validateServer);

app.post("/messengerWebhook", (req, res) => {
  const incomingMessages = messageParser.parsePayload(req.body);
  messagingClient
    .markSeen(senderId)
    .then(() => client.toggleTyping(senderId, true))
    .catch(err => console.log(error));
  messagingClient
    .sendTextMessage(senderId, "Hello")
    .then(result => console.log(`Result sent with: ${result}`));
  messagingClient.sendTextMessage(senderId, "Hello", result =>
    console.log(`Result sent with: ${result}`)
  );
  messagingClient.sendTextMessage(senderId, "Hello");
});

module.exports.allRoutes = functions.https.onRequest(app);
