
function createGame() {


    function movePlayer(command) {
        console.log(`Moving ${command.playerId} with ${command.keyPressed}`);

        const player = state.players[currentPlayer];
        const keyPressed = command.keyPressed;

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
    }

    return {
        movePlayer,
        state
    }
}