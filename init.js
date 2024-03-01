const mongoose = require("mongoose");

const Chat = require("./models/chat.js");

main().then(() => {console.log("connection formed")})
 .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


let allChats = [
    {
        from: "Siddhant",
    to: "Atan",
    msg: "Kya haal hai bhai kai....",
    created_at: new Date()
    },
    {
        from: "Siddhant",
    to: "Kashyap",
    msg: "Kya haal hai beta kai....",
    created_at: new Date()
    },
    {
        from: "Siddhant",
    to: "Saurabh",
    msg: "Kya haal hai chowmein kai....",
    created_at: new Date()
    },
    {
        from: "Siddhant",
    to: "Yash",
    msg: "Kya haal hai babu kai....",
    created_at: new Date()
    }
];

Chat.insertMany(allChats);

