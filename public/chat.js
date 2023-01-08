//make connection

var socket = io.connect('http://localhost:4000');


//dom maninpulation

let message = document.getElementById('message')
let handle = document.getElementById('handle');
let btn = document.getElementById('btn')
let output = document.getElementById('chat-output')
let feedback = document.getElementById('feedback')

//emit event
btn.addEventListener('click',()=>{
    socket.emit('chat',{
        message:message.value,
        handle: handle.value
    })
    console.log(message.value,handle.value)
});

message.addEventListener('keypress',()=>{
    socket.emit('typing',handle.value);
})

//client side listener
socket.on('chat',(data)=>{
    feedback.innerHTML = ''
    output.innerHTML += '<p><strong>'+data.handle + ':</strong>'+data.message+'</p>';
})

socket.on('typing',(data)=>{
    feedback.innerHTML = '<p><em>'+data+'is typing a message' +'</em></p>';
})