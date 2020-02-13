/*
* Regras de funcionamento do jogo e tratamento das teclas
*/
export default function createGame() {

    //criar jogadores e frutas
    const state = {
        players: {},
        fruits: {},
        screen: { width: 10, height: 10 }
    }

    const observers = [];

    //gerar nova fruta
    function start() {
        const frequencia = 2000; // 2 segundos

        setInterval(addFruit, frequencia);
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction);
    }

    function notifyAll(command) {
        // console.log(`Notifying ${state.observers.length} observers`);
        for (const observerFunction of observers) {
            observerFunction(command);
        }
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width);
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height);
        state.players[playerId] = {
            x: playerX,
            y: playerY
        };

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY
        });
    }

    function removePlayer(command) {
        const playerId = command.playerId;
        delete state.players[playerId];

        notifyAll({
            type: 'remove-player',
            playerId: playerId
        });
    }

    function addFruit(command) {

        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000);
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width);
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height);

        state.fruits[fruitId] = {
            fruitId: fruitId,
            x: fruitX,
            y: fruitY
        };

        notifyAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY
        });
    }

    function removeFruit(command) {
        const fruitId = command.fruitId;
        delete state.fruits[fruitId];

        notifyAll({
            type: 'remove-fruit',
            fruitId: fruitId
        });
    }

    function setState(newState) {
        Object.assign(state, newState);
    }


    function movePlayer(command) {
        //console.log(`Moving ${command.playerId} with ${command.keyPressed}`);
        notifyAll(command);

        const acceptedMovies = {
            ArrowUp(player) {
                //console.log('Moving player UP');
                player.y = player.y - 1 >= 0 ? player.y - 1 : 0;
            },
            ArrowDown(player) {
                //console.log('Moving player Down');
                player.y = player.y + 1 < state.screen.width ? player.y + 1 : state.screen.width - 1;
            },
            ArrowLeft(player) {
                //console.log('Moving player Left');
                player.x = player.x - 1 >= 0 ? player.x - 1 : 0;
            },
            ArrowRight(player) {
                //console.log('Moving player Right');
                player.x = player.x + 1 < state.screen.height ? player.x + 1 : state.screen.height - 1;
            }
        }

        //
        const keyPressed = command.keyPressed;
        const playerId = command.playerId;
        const player = state.players[playerId];
        const moveFunction = acceptedMovies[keyPressed];

        if (moveFunction && player) {
            moveFunction(player);
            checkForFruitCollision(playerId);
        }

        return
    }

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId];

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId];
            if (player.x === fruit.x && player.y === fruit.y) {
                console.log(`COLLISION between ${playerId} and ${fruitId}`);
                removeFruit({ fruitId: fruitId });
            }
        }
    }

    //pesquisar ** QuadTree **

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state,
        setState,
        subscribe,
        start
    }
}

/*
const a = new AudioContext() // browsers limit the number of concurrent audio contexts, so you better re-use'em

function beep(vol, freq, duration) {
    var v = a.createOscillator()
    var u = a.createGain()
    v.connect(u)
    v.frequency.value = freq
    v.type = "square"
    u.connect(a.destination)
    u.gain.value = vol * 0.01
    v.start(a.currentTime)
    v.stop(a.currentTime + duration * 0.001)
}
*/