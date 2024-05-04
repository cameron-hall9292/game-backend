
//global vars

let playerArr;
let dealerArr;

let splitHand1 = [];
let splitHand2 = [];
let splitHand3 = [];
let splitHand4 = [];
let splitHand5 = [];

let splitCounter = 0;
let aceSplitCounter = 0;

let dealerHasPlayed = false;

let playerHasPlayed = false;

//create variables for button elements so we can hide and reveal them when needed

let bet10But = document.getElementById('bet10');


let bet100But = document.getElementById('bet100');

let bet1000But = document.getElementById('bet1000');

let dealBut = document.getElementById('deal');

let standBut = document.getElementById('stand');

let hitBut = document.getElementById('hit');

let splitBut = document.getElementById('split');

let insuranceBut = document.getElementById('insurance');

let doubleDownBut = document.getElementById('doubleDown');

let submitBetBut = document.getElementById('submitBet');




const suites = ['clubs','spades','hearts','diamonds'];

const values = ['A','K','Q','J',10,9,8,7,6,5,4,3,2];

//CREATE A DECK OF CARDS

const deck = [];

function createDeck(){

for (let i = 0; i < suites.length; i++){
    for (let j = 0;j < values.length;j++){
        let innerArr = [];
        innerArr.push(values[j],suites[i])
        deck.push(innerArr);
    }

}
}
createDeck();
////console.log(deck);

function addImagesToDeck(){

const deckWithImages = deck.slice(0);

const sliceLastChar = deckWithImages.map(card => card[1] = card[1].slice(0,-1));
const reverseOrder = deckWithImages.map(card => {
    let temp = card[0];
    card[0] = card[1];
    card[1] = temp;
    
});

////console.log(deckWithImages);

for (let i = 0; i < deckWithImages.length; i++){
    
    deckWithImages[i] = deckWithImages[i].join('_');
    if (deckWithImages[i][0] == "h" || deckWithImages[i][0] == "d") {
        let stringWithoutFirstChar = deckWithImages[i].substring(1);
        ////console.log(stringWithoutFirstChar);
        deckWithImages[i] = deckWithImages[i].substring(0,1).toUpperCase() + stringWithoutFirstChar;
    }
    deckWithImages[i] = deckWithImages[i] + ".png"

}

//merge images into deck array
////console.log(deck);

for (let i = 0; i < deck.length; i++){
    deck[i].push(deckWithImages[i]);
}

//reverse order of first two values in each array in the deck
const reverseOrderFinal = deck.map(card => {
    let temp = card[0];
    card[0] = card[1];
    card[1] = temp;
    
});
}
addImagesToDeck();
//console.log(deck);

//SHUFFLE THE DECK OF CARDS

function shuffle(arr) {
    for (let i = 0; i < deck.length; i++){
        let temp = arr[i];
        let rand = Math.ceil(Math.random() * deck.length - 1);
        arr[i] = arr[rand];
        arr[rand] = temp;

    }
}

////console.log(`starting deck length: ${deck.length}`)

shuffle(deck);

//console.log(deck);

function monitorChangesToDeck(){
    //console.log(`current deck length: ${deck.length}`);
}



function dealToPlayer(){
   
    playerArr = deck.splice(0,2)
    ////console.log(`playerArr ${playerArr}`);
    ////console.log(playerArr);

}

function hitToPlayer(){
   
   
    playerArr = playerArr.concat(deck.splice(0,1))

    // if (splitArr.length === 2) {
    //     splitHand1 = playerArr;
    // ////alert(splitHand1);
    // }
    // else if (splitArr.length == 1){
    //     splitHand2 = playerArr;
//    ////alert(splitHand2);
    // }
}


function hitToPlayerSplit(){

    // ////alert(`splitArr.length${splitArr.length}`)

    playerArr = playerArr.concat(deck.splice(0,1))
   
   if (splitArr.length === 2) {
  
    splitHand1 = playerArr;
    // ////alert(splitHand1);
    return splitHand1;
   }
    else if (splitArr.length == 1){
   
    splitHand2 = playerArr;
//    ////alert(splitHand2);
   return splitHand2;
    }
}

function dealToDealer(){
   
    dealerArr = deck.splice(0,2)
    ////console.log(`dealerArr ${dealerArr}`);
    ////console.log(dealerArr);

}

function hitToDealer(){
    dealerArr = dealerArr.concat(deck.splice(0,1))
    ////console.log(dealerArr)

}

function calcValueOfHand(arr){
    let sum = 0;
    let arrCopy = [...arr]
    for (let i = 0; i < arrCopy.length; i++){
        
    if (arrCopy[i][0] === 'K' || arrCopy[i][0] === 'Q' || arrCopy[i][0] === 'J') sum+= 10;
    if(arrCopy[i][0] !== 'A' && arrCopy[i][0] !== 'K' && arrCopy[i][0] !== 'Q' && arrCopy[i][0] !== 'J' ) sum += arrCopy[i][0]
    }
    

    for (let i = 0; i < arrCopy.length; i++){
        if (arrCopy[i][0] === 'A'){
            if (sum + 11 <= 21){
                sum += 11;
            }
            else if (sum + 11 > 21){
                sum += 1;
            }
        }
    }

    

    ////console.log(`sum ${sum}`);
    return sum;
}


function displayValueofDealerFaceUpCard(){
    let faceUpCard = dealerArr[0][0];

    if (faceUpCard === 'K' || faceUpCard === 'Q' || faceUpCard === 'J') {
        faceUpCard = 10
    }
    else if (faceUpCard === 'A'){
        faceUpCard = 11;
    }

    return faceUpCard;

}







//display card data to html page

//make new array of hand data so it displays cleanly on the 
//page

//build logic for dealer so that dealer stand when dealer score 17 or greater or hits otherwise;

function theDealerPlays(){
    while (calcValueOfHand(dealerArr) < 17){
        hitToDealer();
    }

    dealerHasPlayed = true;
   
}

//check if player has busted and set dealer as winner if player busts

function checkIfPlayerBust(){
    let playerScore = calcValueOfHand(playerArr);
    let displayWinner = document.getElementById("winner");
    if (playerScore > 21){
        displayWinner.innerHTML = "YOU LOSE!";
        playerMoney -= playerBet;
        playerBet = 0;
        if (splitArr.length == 2){
            playerArr = splitHand2;
            ////alert(splitHand2);
            render();
            
            splitArr.shift();
        }
       
        //render();
     
       
        
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]

        dealerHasPlayed = true;

        //reveal bet buttons

        betPhase();
        
        //hide buttons

        hideStandButton();
        hideHitButton();

        //update player cash
        updatePlayerMoney()

        //update player bet
        updatePlayerBet()
       
       
    }
    else return
}


function checkIfPlayerBustSplit(){
    let playerScore = calcValueOfHand(playerArr);
    let displayWinner = document.getElementById("winner");
    if (playerScore > 21){
        displayWinner.innerHTML = "YOU LOSE!";
        setTimeout(splitStand,4000);
      
    }
    else return
}

//check if player score equals 21

function checkIfPlayer21(){
    let playerScore = calcValueOfHand(playerArr);
    if (playerScore === 21) theDealerPlays(),comparePlayerAndDealerScores(playerArr,dealerArr),render();
}

//const checkif21Int = setInterval(checkIfPlayer21,1000);


//this function determines whether the dealer or player wins after the player chooses to stand

function comparePlayerAndDealerScores(player,dealer){

    dealerHasPlayed = true;
    let playerScore = calcValueOfHand(player);
    let dealerScore = calcValueOfHand(dealer);
    let displayWinner = document.getElementById("winner");

    if (playerScore <= 21 && dealerScore <=21){
        if (playerScore > dealerScore){
        
           
            
        displayWinner.innerHTML = "YOU WIN!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" +  dealerArr[1][2];
        playerMoney += playerBet;
        playerBet = 0;
        //render();
       
     
        }
        else if (playerScore === dealerScore){

        displayWinner.innerHTML = "TIE!";
        document.getElementById("dealerCard2").src ="http://localhost:5500/assets/" +  dealerArr[1][2]
       
        playerBet = 0;
        //render();
        

        }
        else displayWinner.innerHTML = "YOU LOSE!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
        playerMoney -= playerBet;
        playerBet = 0;
        //render();
        
    }

    if (playerScore <=21 && dealerScore > 21){

        displayWinner.innerHTML = "YOU WIN!"
        document.getElementById("dealerCard2").src ="http://localhost:5500/assets/" +  dealerArr[1][2]
        playerMoney += playerBet;
        playerBet = 0;
        //render();
   

    }
  //reset player bet to zero
  playerBet = 0;

  //reveal bet buttons 
  betPhase()

  //hide buttons
  hideStandButton();
  hideHitButton();

  //update player cash
  updatePlayerMoney()

  //update player bet
  updatePlayerBet()
}

function comparePlayerAndDealerScoresSplit(player1,player2,player3,player4,player5,dealer){
    
    dealerHasPlayed = true;
    let playerScore1 = calcValueOfHand(player1);
    let playerScore2 = calcValueOfHand(player2);
    let playerScore3 = calcValueOfHand(player3);
    let playerScore4 = calcValueOfHand(player4);
    let playerScore5 = calcValueOfHand(player5);





    let splitFactor = 0;

    if (splitCounter === 1){
        splitFactor = 1/2;
    }
    else if(splitCounter == 2){
        splitFactor = 1/3
    }
    else if (splitCounter = 3){
        splitFactor = 1/4
    }
    else if (splitCounter = 4){
        splitFactor = 1/5
    }
    else if (splitCounter = 5){
        splitFactor = 1/6
    }

    //alert(`splitCounter: ${splitCounter}`)

    let dealerScore = calcValueOfHand(dealer);
    let displayWinner = document.getElementById("winner");

    if (playerScore1 <= 21 && dealerScore <=21){
        if (playerScore1 > dealerScore){
        
           
            
        displayWinner.innerHTML = "YOU WIN!"
        document.getElementById("dealerCard2").src = "http://http://localhost:5500/assets/" + dealerArr[1][2];
        playerMoney += playerBet * splitFactor;
        //alert(`playerBet ${playerBet}`)
        //alert(`playerMoney ${playerMoney}`)
        //playerBet = 0;
        //render();
       
     
        }
        else if (playerScore1 === dealerScore){

        displayWinner.innerHTML = "TIE!";
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
       
        //playerBet = 0;
        //render();
        

        }
        else { displayWinner.innerHTML = "YOU LOSE!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
        playerMoney -= playerBet * splitFactor;

        //alert(`playerBet ${playerBet}`)
        //alert(`playerMoney ${playerMoney}`)
        //playerBet = 0;
        //render();
    }
    }

    if (playerScore1 <=21 && dealerScore > 21){

        displayWinner.innerHTML = "YOU WIN!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
        playerMoney += playerBet * splitFactor;

        //alert(`playerBet ${playerBet}`)
        //alert(`playerMoney ${playerMoney}`)
       // playerBet = 0;
        //render();
   

    }

    if (playerScore1 > 21 && dealerScore <=21){
        displayWinner.innerHTML = "YOU LOSE!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
        playerMoney -= playerBet * splitFactor;

        //alert(`playerBet ${playerBet}`)
        //alert(`playerMoney ${playerMoney}`)
    }
    if (playerScore1 > 21 && dealerScore > 21){
        displayWinner.innerHTML = "TIE!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
       
    }


    if (playerScore2 <= 21 && dealerScore <=21){
        if (playerScore2 > dealerScore){
        
           
            
        displayWinner.innerHTML = "YOU WIN!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2];
        playerMoney += playerBet * splitFactor;

       
       
     
        }
        else if (playerScore2 === dealerScore){

        displayWinner.innerHTML = "TIE!";
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
    
        

        }
        else { displayWinner.innerHTML = "YOU LOSE!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
        playerMoney -= playerBet * splitFactor;

      
    }
    }

    if (playerScore2 <=21 && dealerScore > 21){

        displayWinner.innerHTML = "YOU WIN!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
        playerMoney += playerBet * splitFactor;

     
    }
        
    if (playerScore2 > 21 && dealerScore <=21){
        displayWinner.innerHTML = "YOU LOSE!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
        playerMoney -= playerBet * splitFactor;

   
    }

    if (playerScore2 > 21 && dealerScore > 21){
        displayWinner.innerHTML = "TIE!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
  
    }




    //////////
if (splitCounter >= 2){
    if (playerScore3 <= 21 && dealerScore <=21){
        if (playerScore3 > dealerScore){
        
           
            
        displayWinner.innerHTML = "YOU WIN!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2];
        playerMoney += playerBet * splitFactor;

 
       
     
        }
        else if (playerScore3 === dealerScore){

        displayWinner.innerHTML = "TIE!";
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
       
   

        }
        else { displayWinner.innerHTML = "YOU LOSE!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
        playerMoney -= playerBet * splitFactor;

       
    }
    }

    if (playerScore3 <=21 && dealerScore > 21){

        displayWinner.innerHTML = "YOU WIN!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
        playerMoney += playerBet * splitFactor;

        
    }
        
    if (playerScore3 > 21 && dealerScore <=21){
        displayWinner.innerHTML = "YOU LOSE!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
        playerMoney -= playerBet * splitFactor;

    }

    if (playerScore3 > 21 && dealerScore > 21){
        displayWinner.innerHTML = "TIE!"
        document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
       
    }
   
}
/////////////////

if (splitCounter >= 3){
if (playerScore4 <= 21 && dealerScore <=21){
    if (playerScore4 > dealerScore){
    
       
        
    displayWinner.innerHTML = "YOU WIN!"
    document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2];
    playerMoney += playerBet * splitFactor;
  
   
 
    }
    else if (playerScore4 === dealerScore){

    displayWinner.innerHTML = "TIE!";
    document.getElementById("dealerCard2").src ="http://localhost:5500/assets/" +  dealerArr[1][2]
   
   
    

    }
    else { displayWinner.innerHTML = "YOU LOSE!"
    document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
    playerMoney -= playerBet * splitFactor;

}
}

if (playerScore4 <=21 && dealerScore > 21){

    displayWinner.innerHTML = "YOU WIN!"
    document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
    playerMoney += playerBet * splitFactor;
 
}
    
if (playerScore4 > 21 && dealerScore <=21){
    displayWinner.innerHTML = "YOU LOSE!"
    document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
    playerMoney -= playerBet * splitFactor;
 
}

if (playerScore4 > 21 && dealerScore > 21){
    displayWinner.innerHTML = "TIE!"
    document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
 
}

}

//////////////////////////////////////////////////////////
if (splitCounter >= 4) {
if (playerScore5 <= 21 && dealerScore <=21){
    if (playerScore5 > dealerScore){
    
       
        
    displayWinner.innerHTML = "YOU WIN!"
    document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2];
    playerMoney += playerBet * splitFactor;
   
 
    }
    else if (playerScore5 === dealerScore){

    displayWinner.innerHTML = "TIE!";
    document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
   
    

    }
    else { displayWinner.innerHTML = "YOU LOSE!"
    document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
    playerMoney -= playerBet * splitFactor;
 
}
}

if (playerScore5 <=21 && dealerScore > 21){

    displayWinner.innerHTML = "YOU WIN!"
    document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
    playerMoney += playerBet * splitFactor;
  
}
    
if (playerScore5 > 21 && dealerScore <=21){
    displayWinner.innerHTML = "YOU LOSE!"
    document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]
    playerMoney -= playerBet * splitFactor;

}

if (playerScore5 > 21 && dealerScore > 21){
    displayWinner.innerHTML = "TIE!"
    document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2]

}

}


//round player money

playerMoney = Math.floor(playerMoney);

    console.log(`playerScore1 ${playerScore1}`)
    console.log(`playerScore2 ${playerScore2}`)
    console.log(`playerScore3 ${playerScore3}`)
    console.log(`playerScore4 ${playerScore4}`)
    //console.log(`playerScore5 ${playerScore5}`)

    console.log(`playermoney: ${playerMoney}`)
    console.log(`playerbet: ${playerBet}`)

    console.log(`splitCounter: ${splitCounter}`)
    console.log(`splitFactor: ${splitFactor}`)
   
  //reset player bet to zero
  playerBet = 0;

  //reveal bet buttons

  betPhase();

//update player cash
updatePlayerMoney()

//update player bet
updatePlayerBet()


//hide buttons
hideStandButton();
hideHitButton();
    
}

//create a function to reset and play next hand

function playNextHand(){
    if (playerBet === 0){return}
    else {

    //reset dealer play boolean so that stand and hit functions will execute

    dealerHasPlayed = false;

    playerHasPlayed = false;
     
    //clearout split hands if any exist
    splitHand1.splice(0);
    splitHand2.splice(0);
    splitArr.splice(0);
    doubles.splice(0);

    //reset stand and hit function back to nonsplit if previously changed

    let changeStandFuncBack = document.getElementById('stand');
    let changeHitFuncBack = document.getElementById('hit');

    changeStandFuncBack.onclick = function() {standButton()};
    changeHitFuncBack.onclick = function() {hitButton()};

    //clear out counters
    splitCounter = 0;
    aceSplitCounter = 0;
    insurancePlayed = false;
    let displayWinner = document.getElementById("winner");
    displayWinner.innerHTML = "PLAY HAND!"
   
    if (playerArr != undefined){

    splitArr = splitArr.splice(0);
    playerArr = playerArr.splice(0);
    dealerArr = dealerARr = dealerArr.splice(0);
    }
    createAndReshuffleDeck(deck);
    fillDoubles(9)

    function resetAfterShuffle(){
    dealToPlayer();
    dealToDealer();
    render();
}
resetAfterShuffle();

//hide deal button
hideButton(dealBut);

//reveal buttons
revealStandButton();
revealHitButton();
    }
}

//create function to create and reshuffle deck when the deck length is 10 cards or less

function createAndReshuffleDeck(deck){

    if (deck.length <= 10){
    let displayWinner = document.getElementById("winner");
    displayWinner.innerHTML = "shuffling"
    function eraseShufflingLabel(){
    let displayWinner = document.getElementById("winner");
    displayWinner.innerHTML = "PLAY HAND!"
    }
    setTimeout(eraseShufflingLabel,10000);
    //deck = [];
    deck.splice(0,deck.length)
   
    createDeck();
    addImagesToDeck();
    shuffle(deck);
    //console.log(deck);
    }
    else return

}

//create function to allow players to bet

let playerMoney = 5000;

let playerBet = 0;

function bet10(){

    playerBet += 10;
    let playersBet = document.getElementById('playerBet');

playersBet.innerHTML = playerBet;
    //playerMoney -= 10;

}

function bet100(){

    playerBet += 100;
    let playersBet = document.getElementById('playerBet');

playersBet.innerHTML = playerBet;
    //playerMoney -= 100;

}

function bet1000(){

    playerBet += 1000;
    let playersBet = document.getElementById('playerBet');

playersBet.innerHTML = playerBet;
    //playerMoney -= 1000;

}

//create insurance function

let insurancePlayed = false;

function insurance(){
    
    if (dealerArr[0][0] !== "A" || insurancePlayed == true){
        return
    }
    else {
        insurancePlayed = true;
        let sideBet = playerBet * 0.5;
        if (dealerArr[1][0] === "K" || dealerArr[1][0] === "Q" || dealerArr[1][0] === "J" || dealerArr[1][0] === 10){
            playerMoney += sideBet * 2;
            document.getElementById("dealerCard2").src = "http://localhost:5500/assets/" + dealerArr[1][2];
            updatePlayerMoney();
          
           
            //setTimeout(playNextHand,5000);
        }
        else {

            // document.getElementById("dealerCard2").src = dealerArr[1][2];

            playerMoney -= sideBet;

            updatePlayerMoney();
     
         
            //document.getElementById("dealerCard2").src = dealerArr[1][2];
        
        }
    }
}

function doubleDown(){
if (playerArr.length === 2){
    if (calcValueOfHand(playerArr) >= 9 && calcValueOfHand(playerArr) <= 11){
        playerBet += playerBet;
        hitButton();
        standButton();
    }
}
}

let splitArr = [];

function split() {
    if (playerArr[0][0] !== playerArr[1][0] || splitCounter >=3){
        // ////alert(playerArr[0][0])
        // ////alert(playerArr[1][0])
        return
    }

    //if the hand is aces and one hand of aces has already been split in the same round, player split a pair of aces again.
    else if ((playerArr[0][0] === 'A' || playerArr[1][0] === 'A') && aceSplitCounter > 0){
        alert('YOU CANNOT SPLIT ACES MORE THAN ONCE!')
        return
    }
    else {

        //change stand and hit onclick function so that it does not function off the standard stand and hit functions

        let changeStandFunc = document.getElementById('stand');
        let changeHitFunc = document.getElementById('hit');

        changeStandFunc.onclick = function() {splitStand()}
        changeHitFunc.onclick = function() {splitHit()}

        splitCounter++;

        //check if hand is pair of aces. if so, increment acesplitcounter so that aces can't be split mroe than once

        if (playerArr[0][0] === 'A' || playerArr[1][0] === 'A') aceSplitCounter++;

        //console.log(`splitCounter: ${splitCounter}`)

        if (splitArr.length <= 1){
        // splitHand1.splice(0);
        // splitHand2.splice(0);

        splitHand1 = [];
        splitHand2 = [];
        splitHand1.push(playerArr[0],deck.shift());
        splitHand2.push(playerArr[1],deck.shift());
        // ////alert(`hand1: ${splitHand1}`);
        // ////alert(`hand2: ${splitHand2}`);
        // ////alert(`splitArr.length: ${splitArr.length}`);
        //playerArr = splitHand1;
        splitArr.splice(0);
        splitArr.push(splitHand1,splitHand2);
        playerArr = splitArr[0];
      
        playerBet += playerBet;
  
        render();
        // ////alert(`splitArr: ${splitArr}`)

        }
        else if(splitArr.length === 2){
            // if (playerArr === splitHand1){
            // splitHand1 = [];
            // splitHand1 = [playerArr[0],deck.shift()]
            // }
            // else if (playerArr === splitHand2){
            //     splitHand2 = [];
            //     splitHand2 = [playerArr[0],deck.shift()]
            // }

            ////alert(`splitArr.length: ${splitArr.length}`);
            splitHand1 = [];
            splitHand3 = [];
            splitHand1.push(playerArr[0],deck.shift());
            splitHand3.push(playerArr[1],deck.shift());
          
            // ////alert(`hand1: ${splitHand1}`);
            // ////alert(`hand2: ${splitHand2}`);
            // ////alert(`hand3: ${splitHand3}`);
            //playerArr = splitHand1;
            splitArr.splice(0);
           
            splitArr.push(splitHand1,splitHand2,splitHand3);
            //splitArr.push(splitHand3);
            playerArr = splitArr[0];
            playerBet += playerBet;
            render();
            // ////alert(`splitArr: ${splitArr}`)
            // ////alert(`splitArr.length: ${splitArr.length}`)

        }

        else if (splitArr.length === 3){
        
            splitHand4 = [];
            splitHand1 = [];
            splitHand1.push(playerArr[0],deck.shift());
            splitHand4.push(playerArr[1],deck.shift());
            // ////alert(splitHand4);
           // playerArr = splitHand1;

           splitArr.splice(0);
           splitArr.push(splitHand1,splitHand2,splitHand3,splitHand4);
      
            playerArr = splitArr[0];
            playerBet += playerBet;
            render();
     
        }

        else if (splitArr.length === 4){
          
            splitHand5 = [];
            splitHand1 = [];
            splitHand1.push(playerArr[0],deck.shift());
            splitHand5.push(playerArr[1],deck.shift());
            // ////alert(splitHand5);
            //playerArr = splitHand5;

            splitArr.splice(0);
            splitArr.push(splitHand1,splitHand2,splitHand3,splitHand4,splitHand5);
        
            playerArr = splitArr[0];
            playerBet += playerBet;
            render();


        }

        else if (splitArr.length > 4){
         
        }
        
    }
}

//render play hand when game starts
let displayWinner = document.getElementById("winner");
    displayWinner.innerHTML = "PLAY HAND!"

//create one function to render everything to the DOM

const render = () =>{
    //console.log(dealerArr);

let playerCash = document.getElementById('playerMoney');

playerCash.innerHTML = playerMoney;

let playersBet = document.getElementById('playerBet');

playersBet.innerHTML = playerBet;



let playerHand = document.getElementById('playerId');

//playerHand.innerHTML = playerArr;

let playerScore = document.getElementById('playerScore');

playerScore.innerHTML = calcValueOfHand(playerArr);

let dealerHand = document.getElementById('dealerId');

//dealerHand.innerHTML = dealerArr;

let dealerScore = document.getElementById('dealerScore');

if (dealerHasPlayed == false){


dealerScore.innerHTML = displayValueofDealerFaceUpCard();

}
else if (dealerHasPlayed == true){

dealerScore.innerHTML = calcValueOfHand(dealerArr);

}

console.log(`dealerHasPlayed: ${dealerHasPlayed}`)


let deckLength = document.getElementById('deckLength');

deckLength.innerHTML = deck.length;

//render card images to the DOM



//render player card images to the DOM

for (let i = 1; i < playerArr.length + 1; i++){
    let numVar = i.toString();
    let idName = "playerCard" + numVar;
    document.getElementById(idName).src = "http://localhost:5500/assets/" + playerArr[i -1][2]
}

//blank out old player card images after rendering current ones

for (let i = 8; i > playerArr.length; i--){
    let numVar = i.toString();
    let idName = "playerCard" + numVar;
    document.getElementById(idName).src = " ";
}

//render dealer card images to the DOM 


//insert conditional to hide dealer's second card

if (dealerArr.length === 2){
    document.getElementById("dealerCard1").src =  "http://localhost:5500/assets/" + dealerArr[0][2];
    document.getElementById("dealerCard2").src = "http://localhost:5500/assets/BackgroundBlack.png";

}

else if (dealerArr.length > 2){

for (let i = 1; i < dealerArr.length + 1; i++){
    let numVar = i.toString();
    let idName = "dealerCard" + numVar;
    document.getElementById(idName).src = "http://localhost:5500/assets/" + dealerArr[i -1][2]
}
}

//blank out old player card images after rendering current ones

for (let i = 8; i > dealerArr.length; i--){
    let numVar = i.toString();
    let idName = "dealerCard" + numVar;
    document.getElementById(idName).src = " ";
}



}

//create function for buttons

function hitButton(){
  
    let playerScore = calcValueOfHand(playerArr);

    console.log(`dealerHasPlayed: ${dealerHasPlayed}`)
    
    if (playerScore > 21 || dealerHasPlayed == true) return 
    else if (playerScore < 21) {hitToPlayer(),render(),checkIfPlayerBust();playerHasPlayed = true;}
    else if (playerScore === 21)  standButton();//theDealerPlays(),render(),comparePlayerAndDealerScores();
}

function splitHit(){
    if (dealerHasPlayed == true){
        return
    }
    else{

    playerHasPlayed = true
    let playerScore = calcValueOfHand(playerArr);
    //alert(playerArr);
    
    if (playerScore > 21 || playerScore === 21){return }
    else if (aceSplitCounter > 0) { 
        alert('YOU CANNOT HIT ON SPLIT ACES')
        return
    }
    else if (playerScore < 21) hitToPlayerSplit(),render() //,checkIfPlayerBustSplit();
}
}

let standButtonPress = false;

function setStandButtonPressToFalse(){
    standButtonPress = false;
}

function standButton(){
    
    if (dealerHasPlayed == true) {return}
    else theDealerPlays(),render(),comparePlayerAndDealerScores(playerArr,dealerArr);standButtonPress = true;playerHasPlayed = true;

    //theDealerPlays(),render(),comparePlayerAndDealerScores();
    
   //setTimeout(setStandButtonPressToFalse,2500);
}

function splitStand(){
  
    if (dealerHasPlayed == true){
        return
    }
    else {

    playerHasPlayed = true;
    
     if (splitArr.length > 4){
        //playerArr = splitHand2;
        //render();
        splitArr.shift();
        playerArr = splitArr[0];
        render();


    }
    else if (splitArr.length == 4){
        //playerArr = splitHand2;
        //render();
        splitArr.shift();
        playerArr = splitArr[0];
        render();


    }

    else if (splitArr.length == 3){
   
        splitArr.shift();
        playerArr = splitArr[0];
        render();


    }
    
    else if (splitArr.length == 2){
        splitArr.shift();
        playerArr = splitArr[0];
        render();


    }
    else if (splitArr.length == 1){
      
        theDealerPlays(),render(),comparePlayerAndDealerScoresSplit(splitHand1,splitHand2,splitHand3,splitHand4,splitHand5,dealerArr);
    }
    }

}

//create functions to force specific player hands for code testing purposes

let doubles = [];

function fillDoubles(card) {
    for (let i = 0; i < deck.length; i++){
    if (deck[i][0] === card){
        doubles.push(deck[i]);
        //////alert(doubles);
    }
    // else if (doubles.length == 2){
    //     break;
    // }
    
}
}
//fillDoubles();
function createDouble(){

playerArr.splice(0);
playerArr.push(doubles[Math.floor(Math.random() * doubles.length)],doubles[Math.floor(Math.random() * doubles.length)]);
doubles.unshift()
render();
//doubles.splice(0);
}




function hideButton(button){

    button.hidden = true;

}

function revealButton(button){

    button.hidden = false;

}


//hideButton(bet10But);

function submitBet(){

    if (playerBet === 0){
        alert("YOU MUST PLACE A BET!")
        return
    }
    else{

    hideButton(bet10But);
    hideButton(bet100But);
    hideButton(bet1000But);
    hideButton(submitBetBut);
    revealButton(dealBut);
    }

}

function betPhase(){

    revealButton(bet10But);
    revealButton(bet100But);
    revealButton(bet1000But);
    revealButton(submitBetBut);

}

function revealStandButton(){
    revealButton(standBut)
}

function revealHitButton(){
    revealButton(hitBut);
}

function hideStandButton(){
    hideButton(standBut);
}

function hideHitButton(){
    hideButton(hitBut);
}

function revealSplitButton(){
    revealButton(splitBut)
}


function hideSplitButton(){
    hideButton(splitBut);
}

function splitInterval(){

    if (playerArr == undefined){
        return
    }
    else{
    if (playerArr[0][0] === playerArr[1][0] && playerArr.length === 2){
        revealSplitButton()
    }
    else{
        hideSplitButton();
    }
}
}

const checkSplitStatus = setInterval(splitInterval,500);

function doubleDownInt(){

    if (playerArr == undefined) {
        return
    }
    else{

    

    if (calcValueOfHand(playerArr) >= 9 && calcValueOfHand(playerArr) <= 11 && playerHasPlayed == false){
        revealButton(doubleDownBut);
    }

    else {
        hideButton(doubleDownBut);
    }
}
}

const checkDoubleDownStatus = setInterval(doubleDownInt,500);

function insuranceInt(){
    if (playerArr == undefined){
        return
    }
    else{

    
    if (dealerArr[0][0] === "A" && insurancePlayed == false && dealerHasPlayed == false && playerHasPlayed == false){
        revealButton(insuranceBut);
    }
    else{
        hideButton(insuranceBut);
    }
}
}

const checkInsuranceStatus = setInterval(insuranceInt,500);


//update cash values for player money and player bet

function updatePlayerMoney(){
    let playerCashMoney = document.getElementById('playerMoney');
    playerCashMoney.innerHTML = playerMoney;
}

function updatePlayerBet(){
    let playerBetRender = document.getElementById('playerBet');
    playerBetRender.innerHTML = playerBet
}