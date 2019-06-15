const app = require('./app');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4444;

const messages = [];

io.on('connection', socket => {
  socket.on("addMessage", data => {

    messages.push(data.message);
    io.emit("messages", messages);

  });

  socket.on("removeMessage", data => {
    let index = messages.indexOf(data.message);
    if (index >= 0) {
      messages.splice(index, 1);
    }
    io.emit("messages", messages);
  });
  io.emit("messages", messages);
});

http.listen(port, () => console.log(`Server on port ${port}`));
