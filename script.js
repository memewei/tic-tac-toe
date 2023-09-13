const newPlayer = (name, marker) =>{
    return{name, marker};
}

const gameBoard = (() =>{
    let board = [];
    for(i=0; i<9; i++){
        board.push("");
    }
    const gameContainer = document.getElementById("game-board");
    for(i=0; i<board.length; i++){
        const markerBox = document.createElement('div');
        markerBox.classList.add('marker-box');

        gameContainer.appendChild(markerBox);
    }

    Array.from(gameContainer.children).forEach((box, index) =>{
        box.addEventListener('click', ()=>{
            box.classList.add(gamePlay.activePlayer.marker);
            box.setAttribute('data', gamePlay.activePlayer.marker);
            board[index] = gamePlay.activePlayer.marker;
            box.style.pointerEvents = 'none';
            gamePlay.remainingSpots -= 1;
            gamePlay.checkWinner();

            if(gamePlay.winnerDeclared == false){
                if(gamePlay.remainingSpots >0){
                    gamePlay.alertNextPlayer();
                    gamePlay.nextTurn();
                }else if(gamePlay.remainingSpots == 0){
                    gamePlay.tieGame();
                }
            }
        })
    });

    return{
        board
    };
})();

const gamePlay = (() =>{
    const player1 = newPlayer('Player 1', "x");
    const player2 = newPlayer('Player 2', "o");

    let activePlayer = player1;
    let winnerDeclared = false;
    let remainingSpots = 9;
    
    let subtext = document.querySelector('.winner-subtext');
    let playerName = document.querySelector('.player-name');

    const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    ];

    function checkWinner(){
        winningConditions.forEach((item, index) =>{
            if(gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker){
                console.log("Winner!");
                subtext.innerHTML = `<p>${this.activePlayer.name} wins!</p>`;
                this.winnerDeclared = true;
            }
        });
    }

    function alertNextPlayer(){
        this.activePlayer === player1 ? playerName.textContent = "Player 2's turn!" : playerName.textContent = "Player 1's turn!";
        console.log('nextPlayer() function ran')
        console.log('active player: ' + activePlayer.name);
    }

    function nextTurn(){
        this.activePlayer === player1 ? this.activePlayer = player2 : this.activePlayer = player1;
    }

    function tieGame(){
        subtext.innerHTML = `<p>Boo! No one won that game!</p>`;
    }

    return{
        activePlayer,
        remainingSpots,
        checkWinner,
        alertNextPlayer,
        nextTurn,
        tieGame,
        winnerDeclared
    };
})();

