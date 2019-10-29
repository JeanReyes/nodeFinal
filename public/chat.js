const socket = io()

//DOM elementos
let message = $('#message');
let username = $('#username');
let send = $('#send');
let output = $('#output');
let actions = $('#actions');

// send.addEventListener('click', ()=>{
//     console.log("Click");
// })

send.click(function(){
    //emito el mensaje del cliente
    socket.emit('chat:messaje', {
            username: username.val(),
            message: message.val()     
    });
});

message.keypress(()=>{
    socket.emit('chat:typing', username.val());
})

socket.on('chat:messaje', (data)=>{
    actions.html('');
    output.append('<p><strong>'+data.username+'</strong>: '+data.message+'</p>');
});

socket.on('chat:typing', (data)=>{
    actions.html('<p><em>'+data+' esta escribiendo...</em></p>')
})