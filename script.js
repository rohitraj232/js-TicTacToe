// selecting all required elements 
const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = () => { // once window loaded
    // add onclick attribute in all available section's spans
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
    selectXBtn.onclick = () => {
        // hide the select box on playerX button clicked
        selectBox.classList.add("hide");
        // show the playboard section on playerX button clicked
        playBoard.classList.add("show");
    }
    selectOBtn.onclick = () => {
        // hide the select box on playerO button clicked
        selectBox.classList.add("hide");
        // show the playboard section on playerO button clicked
        playBoard.classList.add("show");
        // adding three class name in player element
        players.setAttribute("class", "players active player");
    }
}

let playerXIcon = "fas fa-times"; // class name of fontawesome cross icon
let playerOIcon = "far fa-circle"; // class name of fontawesome circle icon
let playerSign = "X"; // let player will be X
let runBot = true;

// when user click on playBoard this function runs
function clickedBox(element) {
    // console.log(element);
    if (players.classList.contains("player")) { // if players element has contains .player
        // adding circle icon tag inside user clicked element
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.add("active");
        // if player select O then we'll change the playerSign value to O
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } 
    else {
        // adding cross icon tag inside user clicked element
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner(); // calling the winner function
    playBoard.style.pointerEvents = "none"; // once user select then user can't select any other box until box select
    // once user select any box then that box can't be selected again
    element.style.pointerEvents = "none";

    // generating random time delay so bot will delay randomly to select box
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); 

    setTimeout(() => {
        bot(runBot); // calling bot function
    }, randomDelayTime); // passing random delay time
}

// bot click function
function bot(runBot) {
    if(runBot) { // if runbot is true then run the following codes
        // first change the playerSign so if user has X value in id then bot will have O
        playerSign = "O";

        // creating empty array where we'll store unselected box index in this array
        let array = [];
        for(let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0) { // if span has no any child element
                // inserting unclicked or unselected boxes inside array means that span has no children
                array.push(i);
                // console.log(i + " " + "has no children");
            }
        }

        // getting random index from array so bot will select random unselected box
        let randomBox = array[Math.floor(Math.random() * array.length)];
        // console.log(randomBox);

        if(array.length > 0) {
            if (players.classList.contains("player")) { // if players element has contains .player
                // adding cross icon tag inside user clicked element
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.remove("active");
                // if user is O then the box id value will be X
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            } 
            else {
                // adding circle icon tag inside user clicked element
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner(); // calling the winner
        }

        // once bot select any box then user can't select or click on that box
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X"; // passing the X value
    }
}

// now select the winner
function getClass(idname) {
    return document.querySelector(".box" + idname).id; // returning id name
}

function checkClass(val1, val2, val3, sign) {
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if(checkClass(1,2,3,playerSign) || checkClass(4,5,6, playerSign) || checkClass(7,8,9, playerSign) || checkClass(1,4,7, playerSign) || checkClass(2,5,8, playerSign) || checkClass(3,6,9, playerSign) || checkClass(1,5,9, playerSign) || checkClass(3,5,7, playerSign)) {
        // console.log(playerSign + " " + "is the winner of the match");
        runBot = false; // once match won by someone then stop the bot
        bot(runBot);
        setTimeout(() => { // we'll delay to show result box
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700); 

        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    }
    else {
        // if match has drawn
        // first we'll check all id if all span has id and no one won the game then we'll draw the game
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            runBot = false; // once match won by someone then stop the bot
            bot(runBot);
            setTimeout(() => { // we'll delay to show result box
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700); 

            wonText.textContent = `Match has been drawn!`;
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload(); // reload the  current page
}