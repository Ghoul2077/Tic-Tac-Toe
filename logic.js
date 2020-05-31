window.onload = () => {
    const grid = document.getElementById("grid");
    const cells = Array.from(grid.children);
    const selectPage = document.getElementById("select-page");
    const gamePage = document.getElementById("game-page");
    const first_player = document.getElementById("player-1");
    const second_player = document.getElementById("player-2");
    const winningMsg = document.getElementById("winning-msg");
    const winningOverlay = document.getElementById("winning-overlay");
    const score_p1 = document.getElementById("player-1-score");
    const score_p2 = document.getElementById("player-2-score");
    const winningCond = Array.from([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]);
    let modeFlag;
    let turnFlag = 0;
    let turnCount = 0;
    let scoreCount = [0, 0];

    initialize = () => {
        score_p1.innerHTML = scoreCount[0];
        score_p2.innerHTML = scoreCount[1];
        winningOverlay.style.display = "none";
        turnCount = 0;
        turnFlag = 0;
        if (modeFlag) {
            first_player.innerHTML = "Player 1";
            first_player.style.left = "-8%";
            second_player.innerHTML = "Player 2";
            second_player.style.right = "-8%";
        } else {
            first_player.innerHTML = "You";
            first_player.style.left = "-5%";
            second_player.innerHTML = "Comp";
            second_player.style.right = "-5%";
        }

        cells.forEach(element => {
            element.innerHTML = "";
            element.isSet = false;
            element.removeAttribute("style");
        });

        beginTurn();
    }

    beginTurn = () => {
        if (!hasWon() && turnCount !== 9) {
            cells.forEach(element => {
                if (!element.isSet) {
                    if (!turnFlag) {
                        element.innerHTML = "X";
                    } else {
                        element.innerHTML = "O";
                    }
                }
            });
        } else if (hasWon()) {
            if (modeFlag) {
                winner = (turnFlag ? "Player 1" : "Player 2");

                if (winner == "Player 1") {
                    scoreCount[0]++;
                } else {
                    scoreCount[1]++;
                }
            } else {
                winner = (turnFlag ? "You" : "Comp");

                if (winner == "You") {
                    scoreCount[0]++;
                } else {
                    scoreCount[1]++;
                }
            }

            showOverlay(winner);

        } else {
            winner = "draw";
            showOverlay(winner);
        }
    }

    hasWon = () => {
        return winningCond.some(combination => {
            return combination.every(block => {
                return (cells[block].innerHTML === (turnFlag ? "X" : "O")) && (cells[block].isSet == true);
            });
        });
    }

    setMode = (flag) => {
        // 0 is 1 player mode, 1 is 2 player mode
        modeFlag = flag;
        gameStart();
    }

    gameStart = () => {
        selectPage.style.display = "none";
        gamePage.style.display = "block";
        initialize();
    }

    changeMode = () => {
        selectPage.style.display = "block";
        gamePage.style.display = "none";
    }

    resetBtn = () => {
        scoreCount = [0, 0];
        initialize();
    }

    set = e => {
        e.style.color = "black";
        e.style.cursor = "not-allowed";
        e.isSet = true;
        turnCount++;
        turnFlag = !turnFlag;
        beginTurn();
    }

    showOverlay = winner => {
        if (winner === "Comp") {
            winningMsg.innerHTML = "Computer Wins, Better Luck Next Time 👍";
        } else if (winner === "You") {
            winningMsg.innerHTML = `${winner} win 🎉`;
        } else if (winner === "draw") {
            winningMsg.innerHTML = `It's a draw <br /> ¯\_(ツ)_/¯`;
        } else {
            winningMsg.innerHTML = `${winner} wins 🎉`;
        }

        winningOverlay.style.display = "block";
    }
}