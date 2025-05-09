let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameTitle = document.querySelector("h1");

let turnO = true;//playerO turn

const winPatterns = [
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],
    [2,4,6],[2,5,8],[3,4,5],[6,7,8]
]; //storing the winning pattens

const enableBoxes = () => {//used to enable boxes once reset.
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    gameTitle.style.paddingTop = "40px";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) { //playerO turn
            box.innerText = "O";
            turnO = false;
        }
        else{ //playerX turn
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    })
});

const disableBoxes = () => { //used to disable boxes once winner is achieved
    for(let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gameTitle.style.paddingTop="15px";
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        // console.log(pattern[0],pattern[1],pattern[2]); //to access the winning patterns
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]); //to access individual boxes according to win pattern
        // console.log(
        //     boxes[pattern[0]].innerText,
        //     boxes[pattern[1]].innerText,
        //     boxes[pattern[2]].innerText
        // ); // to access the content of box according to win pattern.
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
            }
        }
    }
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);