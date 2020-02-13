import express from 'express';
import http from 'http';
import createGame from './public/js/game.js';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static('public'));

//iniciar o game 
const game = createGame();
game.start();

game.subscribe((command) => {
    console.log(`> Emitting ${command.type}`);
    sockets.emit(command.type, command);
});

//game.addPlayer({ playerId: "aguiar", playerX: 1, playerY: 1 });
//game.addPlayer({ playerId: "player1", playerX: 5, playerY: 5 });
//game.addPlayer({ playerId: "player2", playerX: 6, playerY: 7 });

//game.addFruit({ fruitId: "pera", fruitX: 7, fruitY: 7 });
//game.addFruit({ fruitId: "maçâ", fruitX: 3, fruitY: 4 });


// beep(20, 1000, 30);

console.log(game.state);

//socket para comunicação com client.
sockets.on('connection', (socket) => {
    const playerId = socket.id;
    console.log(`> Player connected on Server with id: ${playerId}`);

    game.addPlayer({ playerId: playerId });
    //console.log(game.state);

    //manda mensagem para todos usuários conectados com a posicao do jogo
    socket.emit('setup', game.state);

    socket.on('disconnect', () => {
        game.removePlayer({ playerId: playerId })
        console.log(`> Player disconnected: ${playerId}`);
    });

    socket.on('move-player', (command) => {
        command.playerId = playerId;
        command.type = 'move-player';

        game.movePlayer(command);
    });



});


server.listen(3000, () => {
    console.log('>> server listening on port: 3000');
});