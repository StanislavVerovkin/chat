const app = require('./app');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4444;

const Message = require('../models/Message');
const LoggedUser = require('../models/LoggedUsers');

io.on('connection', socket => {

  socket.on("addMessage", data => {
    Message({
      message: data.message
    }).save()
      .then(() => {
        Message.find({})
          .then(data => {
            io.emit("messages", data);
          });
      });
  });

  socket.on('getMessages', () => {
    Message.find({})
      .then((data) => {
        io.emit("messages", data);
      })
  });

  socket.on("removeMessage", data => {
    Message.findByIdAndRemove(data.id, () => {
      Message.find({})
        .then((data) => {
          io.emit("messages", data);
        })
    })
  });

  socket.on("addLoggedUser", data => {

    LoggedUser({
      email: data.email,
      name: data.name,
      token: data.token
    })
      .save();
  });

  socket.on("getLoggedUsers", () => {
    LoggedUser.find({})
      .then((data) => {
        io.emit("users", data);
      })
  });

  socket.on("changeStatusLogin", (id) => {
    LoggedUser.remove({_id: id})
      .then(() => {
        LoggedUser.find({})
          .then((data) => {
            io.emit("users", data);
          });
      })
  });
});

http.listen(port, () => console.log(`Server on port ${port}`));
