
/*
* Regras de funcionamento do jogo e tratamento das teclas
*/
function createGame() {


    //criar jogadores e frutas
    const state = {
        players: {},
        fruits: {
            //'fruit1': { x: 4, y: 1 }
        }
    }


    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = command.playerX;
        const playerY = command.playerY;
        state.players[playerId] = {
            x: playerX,
            y: playerY
        };
    }

    function removePlayer(command) {
        const playerId = command.playerId;
        delete state.players[playerId];
    }

    function movePlayer(command) {
        console.log(`Moving ${command.playerId} with ${command.keyPressed}`);

        const acceptedMovies = {
            ArrowUp(player) {
                console.log('Moving player UP');
                player.y =  player.y - 1 >= 0 ? player.y - 1 : 0;
            },
            ArrowDown(player) {
                console.log('Moving player Down');
                player.y = player.y + 1 < screen.width ? player.y + 1 : screen.width - 1 ;
            },
            ArrowLeft(player) {
                console.log('Moving player Left');
                player.x = player.x - 1 >= 0 ? player.x - 1 : 0;
            },
            ArrowRight(player) {
                console.log('Moving player Right');
                player.x =  player.x + 1 < screen.height  ? player.x + 1: screen.height - 1;
            }
        }

        const player = state.players[currentPlayer];
        const keyPressed = command.keyPressed;
        const moveFunction = acceptedMovies[keyPressed];

        if (moveFunction)
            moveFunction(player);

        return;
        /*
        if (keyPressed === 'ArrowUp' && player.y - 1 >= 0) {
            player.y = player.y - 1;
            return
        }
        if (keyPressed === 'ArrowDown' && player.y + 1 < screen.width) {
            player.y = player.y + 1;
            return
        }
        if (keyPressed === 'ArrowLeft' && player.x - 1 >= 0) {
            player.x = player.x - 1;
            return
        }
        if (keyPressed === 'ArrowRight' && player.x + 1 < screen.height) {
            player.x = player.x + 1;
            return
        }
        */
    }

    return {
        addPlayer,
        removePlayer,
        movePlayer,
        state
    }
}