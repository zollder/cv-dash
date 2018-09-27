
const app = require('express')();
const http = require('http').Server(app);
const utils = require('./utils');

const io = require('socket.io')(http);

const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/workload', (req, res) => {
   res.send(utils.workload);
});

setInterval(function() {
    utils.updateWorkload();
    io.sockets.emit('workload', utils.workload[utils.workload.length - 1]);
}, 60000);

io.on('connection', function(socket) {
    console.log('user connected');
});

http.listen(port, () => {
    console.log(`Listening on *:${port}`);
});

/*io.on('connect', function (socket) {
    socket.emit('connected', {
        status: 'connected',
        type: osm.os.type(),
        cpus: osm.os.cpus()
    });

    io.on('disconnect', function (socket) {
        socket.emit('disconnected');
    });
});*/
