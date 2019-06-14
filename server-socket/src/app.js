const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const messages = [];

io.on('connection', socket => {

  // socket.on("getDoc", docId => {
  //   safeJoin(docId);
  //   socket.emit("document", documents[docId]);
  // });

  socket.on("addMessage", data => {
    messages.push({
      id: data.id,
      message: data.message,
    });
    io.emit("messages", messages);
    socket.emit("message", data);
  });

  socket.on("removeMessage", data => {


    io.emit("messages", messages);
    socket.emit("message", data);

  });
  io.emit("messages", messages);
});

http.listen(4444);
