const express = require("express");
const app = express();
 const port = 8080;
 const mongoose = require("mongoose");
 const path = require("path");
 const methodOverride = require('method-override');
app.use(methodOverride('_method'));
 const Chat = require("./models/chat.js");
 app.use(express.static(path.join(__dirname, "/public")));

 app.use(express.urlencoded({ extended: true}));

 app.set("views", path.join(__dirname, "views"));
 app.set("view engine", "ejs");

 main().then(() => {console.log("connection formed")})
 .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index Route

app.get("/chats" , async (req,res) => {
let chats = await Chat.find();
res.render("index.ejs", {chats});
});

//New Route

app.get("/chats/new", (req,res) => {
res.render("new.ejs");
})

//Create Route 

app.post("/chats", (req,res) => {
    let { from, to, msg} = req.body;
    let newChat = new Chat ({
        from: from,
        to: to,
        msg : msg,
        created_at : new Date()
    });
  newChat.save().then(res => {console.log("chat was saved..");})
  .catch(err => {console.log(err);});

  res.redirect("/chats");
});

//Edit Route

app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
  let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//Update Route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg} = req.body;
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, {runValidators: true , new: true});
    console.log(updatedChat);
    res.redirect("/chats");
});
    
//Delete Route

app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});
 app.use("/", (req,res) => {
    res.send("Sending Response");
 });

app.listen(port, (req,res) =>
{
    console.log(`app is listening on ${port}`);
});