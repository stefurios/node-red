module.exports = function(RED) {
    var io = require('socket.io-client');
    var jwt = require('jsonwebtoken');
    var token = jwt.sign({name:'Hiris_Client'}, "secret");
    function DsnNode(config) {
        RED.nodes.createNode(config);
        var node = this;
       // this.server = RED.nodes.getNode(config.server);
        socket = io(this.host+':'+this.port);
        node.on('input', function(msg) {
        socket.on('connect',()=>{
            socket = io(this.host+':'+this.port);
            console.log('con');
            var req_msg = {event:'sendMessage', message:'Hello from the Client!'}
            socket.emit('authenticate', {token: token});
            socket.on('authenticated',()=>{
                console.log('auth');
                socket.emit('sendMessage', 'message');
            });
            var request = {room:"Hiris' happiest room", role:'client', protocol: 'websocket'}
            socket.emit('join', request)
            socket.emit('sendMessage', req_msg)
            socket.on('sendMessage', (object)=>{
                console.log(object.message)
            })
        });

});
}
    RED.nodes.registerType("node-dsn",DsnNode);

  /* function RemoteServerNode(n) {
        RED.nodes.createNode(this,n);
        var io = require('socket.io-client');
        var node = this;
        this.host = n.host;
        this.port = n.port;
        const socket = io(this.host+':'+this.port)
    }
    RED.nodes.registerType("node-dsn-config",RemoteServerNode);*/
}