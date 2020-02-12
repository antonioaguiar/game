function createKeyboardListener() {
    const state = {
        observers: []
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    function notifyAll(command) {
        console.log(`Notifying ${state.observers.length} observers`);

        for (const observerFunction of state.observers) {
            observerFunction(command);
        }
    }

    document.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(event) {
        const keyPressed = event.key;

        const command = {
            playerId: currentPlayer,
            keyPressed
        }

        //notificar todos os observers
        notifyAll(command);
    }

    return {
        subscribe
    }
}
