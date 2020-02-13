/*
* Regras de funcionamento do jogo e tratamento das teclas
*/
export default function createGame() {

    //criar jogadores e frutas
    const state = {
        players: {},
        fruits: {},
        screen: {width: 10, height: 10}
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

    function addFruit(command){
        const fruitId = command.fruitId
        const fruitX = command.fruitX;
        const fruitY = command.fruitY;
        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        };
    }


    function removePlayer(command) {
        const playerId = command.playerId;
        delete state.players[playerId];
    }

    function removeFruit(command) {
        const fruitId = command.fruitId;
        delete state.fruits[fruitId];
    }


    function movePlayer(command) {
        //console.log(`Moving ${command.playerId} with ${command.keyPressed}`);

        const acceptedMovies = {
            ArrowUp(player) {
                //console.log('Moving player UP');
                player.y =  player.y - 1 >= 0 ? player.y - 1 : 0;
            },
            ArrowDown(player) {
                //console.log('Moving player Down');
                player.y = player.y + 1 < state.screen.width ? player.y + 1 : state.screen.width - 1 ;
            },
            ArrowLeft(player) {
                //console.log('Moving player Left');
                player.x = player.x - 1 >= 0 ? player.x - 1 : 0;
            },
            ArrowRight(player) {
                //console.log('Moving player Right');
                player.x =  player.x + 1 < state.screen.height  ? player.x + 1: state.screen.height - 1;
            }
        }

        //
        const keyPressed = command.keyPressed;
        const playerId = command.playerId;
        const player = state.players[playerId];
        const moveFunction = acceptedMovies[keyPressed];

        if (moveFunction && player){
            moveFunction(player);
            checkForFruitCollision(playerId);
        }

        return
    }

    //a implementação original passa somente o ID, mas depois na função vai
    //buscar no array o objeto do player corresnpondente ao ID, mas pra que
    //se já temos o "cara" quando moveu?
    function checkForFruitCollision(playerId){
        //for(const playerId in state.players){
            const player = state.players[playerId];
            
            for(const fruitId in state.fruits){
                const fruit = state.fruits[fruitId];
                // console.log(`checking ${playerId}>${player.x}x${player.y} and ${fruitId}>${fruit.x}x${fruit.y}`);

                if (player.x === fruit.x && player.y === fruit.y){
                    console.log(`COLLISION between ${playerId} and ${fruitId}`);
                    removeFruit({fruitId: fruitId});
                    
                    beep(20, 1000, 30);
                    //teste
                    //gerar nova fruta
                    const newFruitId = Math.floor(Math.random() * 1000);
                    const newFruitX = Math.floor(Math.random() * 10);
                    const newFruitY = Math.floor(Math.random() * 10);
                    const novaFruta = {fruitId: newFruitId, fruitX: newFruitX, fruitY: newFruitY};
                    addFruit(novaFruta);
                }
            }

        //} 
    }

    //pesquisar ** QuadTree **
    
    


    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    }
}


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