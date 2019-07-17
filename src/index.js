const app = require('./app');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4444;

const Message = require('../models/Message');
const User = require('../models/User');

io.on('connection', socket => {

  socket.on('addMessage', data => {
    Message({
      message: data.message,
      name: data.name
    }).save()
      .then(() => {
        Message.find({})
          .then(data => {
            io.emit('messages', data);
          });
      });
  });

  socket.on('getMessages', () => {
    Message.find({})
      .then((messages) => {
        io.emit('messages', messages);
      })
  });

  socket.on('getMessageById', (id) => {
    Message.findOne({_id: id})
      .then((message) => {
        io.emit('message', message)
      })
  });

  socket.on('updateMessageById', (data) => {
    Message.findByIdAndUpdate(data.id, {message: data.message}, (err) => {
      if (err) {
        return console.log(err);
      }
    })
      .then(data => {
        io.emit('message', data.message)
      })
  });

  socket.on('removeMessage', data => {
    Message.findByIdAndRemove(data.id, () => {
      Message.find({})
        .then((data) => {
          io.emit("messages", data);
        })
    })
  });

  socket.on('getUsers', () => {
    User.find({})
      .then((data) => {
        io.emit('users', data)
      })
  });

  socket.on('logout', (id) => {
    User.findByIdAndUpdate(id, {isLogin: false}, (err) => {
      if (err) {
        return console.log(err);
      }
      User.find({isLogin: true})
        .then((data) => {
          io.emit('users', data);
        })
    });
  });

  socket.on('typing', data => {
    io.emit('typingMessage', data);
  })
});

http.listen(port, () => console.log(`Server on port ${port}`));
