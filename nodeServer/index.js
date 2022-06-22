//Node Server to handle Socket.io conections.

const io = require('socket.io')(3000, {
    cors: {
      origin: '*',
    }
  })

const users = {}

io.on('connection', socket => {                     //io.on handles multiple connections
    socket.on('new-user-joined', name => {          //socket.on handles one perticular connection
        // console.log(name) 
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); //broadcast.emits event to all others except the user who has joined
    }); //here it emitted the event to others that xyz user has joined with their name.

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    //Let others know if user leaves
    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id])
        delete users[socket.id];
    });
})