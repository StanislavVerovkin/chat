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
    messages.push(data.message);
    io.emit("messages", messages);
    socket.emit("message", data);
  });

  // socket.on("editDoc", doc => {
  //   documents[doc.id] = doc;
  //   socket.to(doc.id).emit("document", doc);
  // });
  io.emit("messages", messages);
});

http.listen(4444);
