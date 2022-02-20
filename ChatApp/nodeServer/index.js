//Node Server which will handle socket io connections
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket => {
    //if any new user is connect  to the server know!
    socket.on('new-user-joined', name => {
        // console.log("New user",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);

    });
    //if Someone send a message broadcast it to other people
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

})