//document.getElementById("block20").style.display = "block";


const GameBoard = ( function(){

    let board =[];
    for (let x = 0; x<3; x++)
    {
        board[x] = [];
        for (let y =0; y<3; y++) {
            board[x][y] = "a";
        }
    }

    return {board}

})();

const turns = (function() {
    let count = 0;
    const get = function() {
        return count;
    }
    const add = function() {
        return count++;
    }
    return {get,add}
})();



function Player1(name) {
    const token = "X";
    const position = function(x,y) {
        GameBoard.board[x][y] = token;
        return GameBoard.board[x][y];
    }
    
   
    return {name,position, token};
    
}


function Player2(name) {
    const token = "O";
    const position = function(x,y) {
        GameBoard.board[x][y] = token;
        return GameBoard.board[x][y]
    }

    return {name, position, token}
}

function Names() {
    const getNames1 = function() {
    let name1 = document.getElementById("player1").value ;
    if (name1 == "" || name1 == null) {
        name1 = "Player 1";
    }
  
    console.log(name1);
    return name1;
}

    const getNames2 = function () {
    let name2 = document.getElementById("player2").value;
    if (name2 == "" || name2 == null) {
        name2 = "Player 2";
    }
    console.log(name2);
    return name2;
} 
    return {getNames1, getNames2}
} 




document.getElementById("btn").onclick = function(e) {
    e.preventDefault();
    document.querySelectorAll(".block").forEach(function(btn){
        btn.style.display = "block";
    })
    
 ;

    
    
};

const player1 = Player1("Dave");
const player2 = Player2("Steve");



const checkWin = (function () {
    const win = function () {
        
        for (let x = 0; x < 3; x++) {
            let count1 = 0;
            let count2 = 0;
            for (let y=0; y<3; y++)
                {
                    if (GameBoard.board[x][y] == `${player1.token}`)
                    {
                        count1++;
                        if (count1 == 3)
                        {
                            return 1;
                        } 
                    }
                if (GameBoard.board[x][y] == `${player2.token}`)
                {
                    count2++;
                    if (count2 == 3) 
                    {
                        return 2;
                    }
                }
            }
        }

        for (let x = 0; x< 3; x++)
        {
            let count1 = 0;
            let count2 = 0;
            for (let y = 0; y<3; y++)
            {
                if (GameBoard.board[y][x] == player1.token)
                {
                    count1++;
                    if (count1 == 3)
                    {
                        return 1;
                    }
                }
                if (GameBoard.board[y][x] == player2.token)
                {
                    count2++;
                    if (count2 == 3)
                    {
                        return 2;
                    }
                }
            }
        }

        if ((GameBoard.board[0][0] == player1.token && GameBoard.board[1][1] == player1.token && GameBoard.board[2][2] == player1.token ) 
            || (GameBoard.board[0][2] == player1.token && GameBoard.board[1][1] == player1.token && GameBoard.board[2][0] == player1.token))
        {
            return 1;
        }

        if ((GameBoard.board[0][0] == player2.token && GameBoard.board[1][1] == player2.token && GameBoard.board[2][2] == player2.token ) 
            || (GameBoard.board[0][2] == player2.token && GameBoard.board[1][1] == player2.token && GameBoard.board[2][0] == player2.token))
        {
            return 2;
        }



        return "no win";
    }
    return {win};
})();



const makeBoard = (function(){
    let gameBox = document.createElement("div");
    gameBox.id = "box";
    document.querySelector("#wrapper").appendChild(gameBox);
    for(let x = 0; x<3;x++)
    {
        for (let y=0; y<3;y++)
        {
            let block = document.createElement("div");
            block.id = `block${x}${y}`;
            block.className = "block";
            block.style.display = "none";
            document.querySelector("#box").appendChild(block);
        }
        
    }

})();



   function endGame() {
        console.log("end game");
        document.querySelectorAll(".block").forEach(function(e) {
            e.style.pointerEvents = "none";
        })
    }
   


const playGame = (function(){

    const block = document.querySelectorAll(".block");
    block.forEach(function(e) {
        e.addEventListener("click", function() {
            turns.add();
            document.getElementById(`${e.id}`).style.pointerEvents = "none";
            let x = parseInt(`${e.id[5]}`);
            let y = parseInt(`${e.id[6]}`);
            if (turns.get() == 9) 
            {
                console.log("TIE");
                document.getElementById("win").innerText = "Tie!";
            }
            if (turns.get() % 2 != 0) {
                e.innerText = player1.token;
                player1.position(x,y);
            }

            else {
                e.innerText = player2.token;
                player2.position(x,y);
            }
            console.log(checkWin.win());
            const N = Names();
            if (checkWin.win() == 1)
            {
                const name1 = N.getNames1();
                document.getElementById("win").innerText = `${name1} Wins!`;
                endGame();
            }
            if (checkWin.win() == 2)
            {
                const name2 = N.getNames2();
                document.getElementById("win").innerText = `${name2} Wins!`;
                endGame();
            }

        })
    })

})();

   