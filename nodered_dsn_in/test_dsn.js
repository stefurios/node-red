var io = require('socket.io-client')
var jwt = require('jsonwebtoken')

var token = jwt.sign({name:'Hiris_Client'}, "secret")
const socket = io('http://localhost:'+4040)

socket.on('connect',()=>{
    socket.on('authenticated',()=>{
        var request = {room:"Hiris' happiest room", role:'client', protocol: 'websocket'}
        var req_msg = {event:'sendMessage', message:'Hello from the Client!'}
        console.log('Connecting to DSN...')
        socket.emit('join', request)
        socket.on('sendMessage', (object)=>{
            console.log(object.message)
        }).emit('sendMessage', req_msg)
    }).emit('authenticate', {token: token});
}) 