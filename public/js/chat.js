let socket = io();

const colors = ['--avatar-red', '--avatar-blue', '--avatar-green', '--avatar-purple','--avatar-yellow', '--avatar-grey']
const random_number =  Math.floor(Math.random() * 5);

const form = document.getElementById('form');
const input = document.getElementById('input');
var chat = document.getElementById('messages');

const nickname = prompt('Enter nickname');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {

        socket.emit('chat message', { 'name': nickname, 'msg': input.value, 'color': colors[random_number] });
        input.value = '';
    }
});

socket.on('chat message', (html) => {
    chat.innerHTML += html
    window.scrollTo(0, document.body.scrollHeight);
})
