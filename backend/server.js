const express = require("express");
const app = express();
const http = require('http')
const { Server } = require('socket.io')
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const cors = require('cors')
const cookieParser = require('cookie-parser')
//const tweetRoutes = require("./routes/tweet");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config

//Connect To Database
connectDB();


app.use(cors({
  origin: 'https://lockerroom.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'https://lockerroom.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
})
//Body Parsing
app.use(express.urlencoded({ extended: true,  limit: '25mb'}));
app.use(express.json({limit: '25mb'}));

//Logging
app.use(logger("dev"));

// Setup Sessions - stored in MongoDB
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );
  app.use(cookieParser("keyboard cat"))
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  require("./config/passport")(passport);
  //Use flash messages for errors, info, ect...
  app.use(flash());

  
   app.use("/", mainRoutes);
   io.on('connection', (socket) => {
    console.log(`user ${socket.id} has been connected`)

    socket.on("joinRoom", (roomId) => {
      console.log(roomId)
      socket.join(roomId)
      console.log(`user ${socket.id} has joined room ${roomId}`)
    })

    socket.on('send_message', (data) => {
      console.log(data)
      io.to(data.chat).emit('receive_message', [data.idk])
    })
    // socket.on("send_message", (data) => {
    //   socket.broadcast.emit("receive_message", data)
    // })
  })

  server.listen(process.env.PORT, () => {
    console.log("Server is running, you better catch it!");
  });