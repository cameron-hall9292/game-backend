





const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");




//GLOBAL VARS


const canvasSize = 300;

const squareSize = 20;

const canvasHeight = canvasSize;

const canvasWidth =  canvasSize; 

document.getElementById("canvas1").height = canvasHeight;

document.getElementById("canvas1").width = canvasWidth;

let gameStatus = document.getElementById("gameStatus");




let gameover = false;



let foodIncrement = 1;


let snakeColorArray = ["green", "blue", "indigo"];


let foodColorArray = ["red", "orange", "yellow"];


let gridColorArray = ["tan"];





let gridColor = gridColorArray[Math.floor(Math.random() * gridColorArray.length )];

let snakeColor = snakeColorArray[Math.floor(Math.random() * snakeColorArray.length )];

let snakeFoodColor = foodColorArray[Math.floor(Math.random() * foodColorArray.length)];


const changeAllColors = () => {
    
     gridColor = gridColorArray[Math.floor(Math.random() * gridColorArray.length )];

     snakeColor = snakeColorArray[Math.floor(Math.random() * snakeColorArray.length )];
    
     snakeFoodColor = foodColorArray[Math.floor(Math.random() * foodColorArray.length)];

 
}

changeSnakeAndFoodColors = () => {

    snakeColor = snakeColorArray[Math.floor(Math.random() * snakeColorArray.length )];
    
    snakeFoodColor = foodColorArray[Math.floor(Math.random() * foodColorArray.length)];


}


let barrierColor = "black";

console.log(gridColor);
console.log(snakeColor);
console.log(snakeFoodColor);



let score = 0;

let scoreIncrement = 1;



let snakeArray = [];



//interval speed at which game operates (how fast snake moves);

let int = 250;



//create a grid system 

let squareHeight = squareSize;

let squareWidth = squareSize;

let squareXCOR = 0;

let squareYCOR = 0;

let rowLength = 0;

let gridArray = [];


//create direction variables to track direction of snake movement

let rightDir;

let leftDir;

let upDir;

let downDir;

//determine num squares in each row to determine vertical movement

const squaresPerRow = canvasWidth/squareWidth;

const squaresPerCol = canvasHeight/squareHeight;

console.log(`sqauresPerRow: ${squaresPerRow}`)



const generateRow = (x,y,w,h) => {


    
    while(rowLength < canvasWidth){

    ctx.rect(x, y, w, h);
    
    ctx.stroke();
    
    gridArray.push({
        xcor: x,
        ycor: y,
        width: w,
        height: h,
        food: false,
        snake: false,
        corner: false,
    })

    x += w;
    rowLength += w;

    }

    rowLength = 0;


}



const generateGrid = (x,y,w,h) => {

    while (y < canvasHeight){
        generateRow(x,y,w,h);
        y += h;
    }

}

generateGrid(squareXCOR,squareYCOR,squareWidth,squareHeight);

console.log(gridArray);


    
//try to make easier to change square colors

const changeColor = (square, color) => {

ctx.fillStyle = color;

ctx.fillRect(gridArray[square].xcor, gridArray[square].ycor, gridArray[square].width, gridArray[square].height);

ctx.rect(gridArray[square].xcor, gridArray[square].ycor, gridArray[square].width, gridArray[square].height);

ctx.stroke();


}


//changeColor(4, "orange");


//create a function to initlize snake array


const createSnake = (start, length, color) => {

    while (snakeArray.length < length){
        
        snakeArray.push(gridArray[start]);

        gridArray[start].snake = true;
        
       

        changeColor(start, color);

        start+=squaresPerRow;

       

    }

    return snakeArray;


}


createSnake(Math.floor(squaresPerRow/2 + squaresPerRow * 5), 3, snakeColor);

//change color of grid squares

const changeGridColor = () => {

gridArray.forEach((square) => {

    if (square.snake == false && square.food == false) changeColor(gridArray.indexOf(square),gridColor);

});

}

changeGridColor();

//changeColor(snakeArray.length, "blue");


console.log(gridArray.indexOf(snakeArray[0]));


//create a function to move snake to the right

//downDir = true;


const moveSnakeRight = () => {

    try {



        if (leftDir == true) return;

        rightDir = true;
        leftDir = false;
        upDir = false;
        downDir = false;

             //check for snake self collision

             if (gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) + 1].snake == true){
                console.log("right collision!!!");
                clearAllIntervals();
            }
    
        
            //check if snake out of bounds
    
            checkBounds();


        
        if (gridArray[gridArray.indexOf(snakeArray[0])].food == false) changeColor(gridArray.indexOf(snakeArray[0]), gridColor);
        if (gridArray[gridArray.indexOf(snakeArray[0])].food == true) changeColor(gridArray.indexOf(snakeArray[0]), snakeFoodColor);

        //turn grid back into non-snake square

        gridArray[gridArray.indexOf(snakeArray[0])].snake = false;

        snakeArray.shift();

   


        snakeArray.push(gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) + 1]);

        //turn non-snake square into a snake square

        gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1])].snake = true;

        scoreAndGrow();
        changeColor(gridArray.indexOf(snakeArray[snakeArray.length - 1]), snakeColor);

        //console.log(snakeArray);


        //console.log(`right: ${rightDir},left: ${leftDir},up: ${upDir}, down: ${downDir}`);
 } catch(err) {
    if (err) {
        console.log(err);
        clearAllIntervals();
    }

    }


}

const moveSnakeLeft = () => {

    try {

    
        if (rightDir == true) return;

        leftDir = true;
        rightDir = false;
        upDir = false;
        downDir = false;

        if (gridArray[gridArray.indexOf(snakeArray[0])].food == false) changeColor(gridArray.indexOf(snakeArray[0]), gridColor);
        if (gridArray[gridArray.indexOf(snakeArray[0])].food == true) changeColor(gridArray.indexOf(snakeArray[0]), snakeFoodColor);


        //turn grid back into non-snake square

        gridArray[gridArray.indexOf(snakeArray[0])].snake = false;

        snakeArray.shift();

        
        //check for snake self collision

        if (gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) - 1].snake == true){
            clearAllIntervals();
            console.log("left collision!!!");
        }

        
        //check if snake out of bounds

        checkBounds();


        snakeArray.push(gridArray[gridArray.indexOf(snakeArray[snakeArray.length -1]) - 1]);

        //turn non-snake square into a snake square

        gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1])].snake = true;

        scoreAndGrow();

        changeColor(gridArray.indexOf(snakeArray[snakeArray.length - 1]), snakeColor);

        //console.log(snakeArray);




        //console.log(`right: ${rightDir},left: ${leftDir},up: ${upDir}, down: ${downDir}`);

}catch(err) {
    if (err) {
        console.log(err);
        clearAllIntervals();
    }
}

}





const moveSnakeDown = () => {

    try{ 

        if (upDir == true) return;

        downDir = true;
        upDir = false;
        leftDir = false;
        rightDir = false;

        if (gridArray[gridArray.indexOf(snakeArray[0])].food == false) changeColor(gridArray.indexOf(snakeArray[0]), gridColor);
        if (gridArray[gridArray.indexOf(snakeArray[0])].food == true) changeColor(gridArray.indexOf(snakeArray[0]), snakeFoodColor);


        //turn grid back into non-snake square

        gridArray[gridArray.indexOf(snakeArray[0])].snake = false;

        snakeArray.shift();

          //check for snake self collision

          if (gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) + squaresPerRow].snake == true){
            console.log("down collision!!!");
            clearAllIntervals();
        }

        
        
        //check if snake out of bounds

        checkBounds();
        
        //check if snake out of bounds

        snakeArray.push(gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) + squaresPerRow]);

        //turn non-snake square into a snake square

        gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1])].snake = true;

        scoreAndGrow();

        changeColor(gridArray.indexOf(snakeArray[snakeArray.length - 1]), snakeColor);

        //console.log(snakeArray);


    // console.log(`right: ${rightDir},left: ${leftDir},up: ${upDir}, down: ${downDir}`);

}catch(err) {
    if (err) {
        console.log(err);
        clearAllIntervals();
    }
}

}



const moveSnakeUp = () => {

    try {

        //console.log(leftDir,rightDir);

        if (downDir == true) return;

       

        upDir = true;
        downDir = false;
        leftDir = false;
        rightDir = false;


        if (gridArray[gridArray.indexOf(snakeArray[0])].food == false) changeColor(gridArray.indexOf(snakeArray[0]), gridColor);
        if (gridArray[gridArray.indexOf(snakeArray[0])].food == true) changeColor(gridArray.indexOf(snakeArray[0]), snakeFoodColor);


        //turn grid back into non-snake square

        gridArray[gridArray.indexOf(snakeArray[0])].snake = false;

        snakeArray.shift();

        
        //check for snake self collision

        if (gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) - squaresPerRow].snake == true){
            console.log("up collision!!!");
            clearAllIntervals();
        }

        
        //check if snake out of bounds

        checkBounds();

        snakeArray.push(gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) - squaresPerRow]);

        //turn non-snake square into a snake square

        gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1])].snake = true;

        scoreAndGrow();

        changeColor(gridArray.indexOf(snakeArray[snakeArray.length - 1]), snakeColor);

        //console.log(snakeArray);
    
        //console.log(`right: ${rightDir}, left: ${leftDir}, up: ${upDir}, down: ${downDir}`);
}catch (err){
    if (err){
        console.log(err);
        clearAllIntervals();

    } 
}

}


//player scores and grows

const scoreAndGrow = () => {
    
    if (gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1])].food == true) {
        console.log("food eaten!!!");
        gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1])].food = false;
        changeColor(gridArray.indexOf(snakeArray[snakeArray.length - 1]), snakeColor)
       
        playerScores(scoreIncrement)
        makeFoodOnIncrement(foodIncrement);
        grow();
    }
}

//grow snake

const grow = () => {

    checkBounds();

  


    if (rightDir){
        gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1])].snake = true;

        snakeArray.push(gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1])]);

    }

    if (leftDir){

        gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1])].snake = true;

        snakeArray.push(gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1])]);
    
        }
    

    if (downDir){

        gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1])].snake = true;

        snakeArray.push(gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1])]);

    }

    
    if (upDir){

        gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1])].snake = true;
        snakeArray.push(gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1])]);

    }

   
    changeColor(gridArray.indexOf(snakeArray[snakeArray.length - 1]), snakeColor);

    console.log(`snake len: ${snakeArray.length}`);

}







console.log(snakeArray);





//declare button variables


let rightButton = document.getElementById("right");

let leftButton = document.getElementById("left");

let downButton = document.getElementById("down");

let upButton = document.getElementById("up");

let growButton = document.getElementById("grow");

let startButton = document.getElementById("start");






//set movement intervals


var rightInterval = setInterval(moveSnakeRight, 1000);

var leftInterval = setInterval(moveSnakeLeft, 1000);

var upInterval = setInterval(moveSnakeUp, 1000);

var downInterval = setInterval(moveSnakeDown, 1000);


//clear movement intervals


var clearRightInterval = clearInterval(rightInterval);

var clearLeftInterval = clearInterval(leftInterval);

var clearUpInterval = clearInterval(upInterval);

var clearDownInterval = clearInterval(downInterval);




const clearAllIntervals = () => {

    clearLeftInterval = clearInterval(leftInterval);
    clearUpInterval = clearInterval(upInterval);
    clearDownInterval = clearInterval(downInterval);
    clearRightInterval = clearInterval(rightInterval); 
    
    console.log("INTERVALS CLEARED!!!");

    //make gameover

    gameover = true;

    //clear canvas


    // ctx.fillStyle = "white";
    // ctx.font = `${squareHeight}px serif`;
    // ctx.fillText("GAMEOVER", canvasWidth/3,canvasHeight/2);

    gameStatus.textContent = "GAMEOVER"

    //reload window

    // const reload = () => {
    //     window.location.reload();
    // }

   

    




    const resetEverything = () => {

            //reset everything

    rightDir = false;
    leftDir = false;
    upDir = false;
    downDir = false;

    //reset score to 0

    score = 0;

  
    
    //make sure no squares in grid are snake pieces

    gridArray.forEach((square) => {
        square.snake = false;
       
    })

    //reset snake food increment

    foodIncrement = 1;

   startGame();


    }

    setTimeout(resetEverything, 3000);


  


}

const startGame = () => {

    gameStatus.textContent = `SCORE: ${score}`

    if (gameover){

        changeAllColors();
       
        //change grid back to normal state

        gridArray.forEach((square) => {

            square.food = false;
            square.snake = false;
            changeColor(gridArray.indexOf(square),gridColor);
            
           
        });

        //rerender game barrier

        renderGameBarrier();

        
   
        gameover = false;

        snakeArray.splice(0, snakeArray.length);
             
   

        createSnake(Math.floor(squaresPerRow/2 + squaresPerRow * 5), 3, snakeColor)
        
      
        makeFood();

        //render new score

        gameStatus.textContent = `SCORE: ${score}`

        foodIncrement = 1;

        //downInt(int);
        
       
        
        
    }
}

//detect if snake out of bounds and clear intervals if it is

const gridWidth = canvasWidth - squareWidth;

const gridHeight = canvasHeight - squareHeight;

const borderWidth = squareWidth;

const borderHeight = squareHeight;

//create barriers

const rightBarrier = gridWidth - borderWidth;

const leftBarrier = borderWidth;

const topBarrier = borderHeight;

const bottomBarrier = gridHeight - borderHeight;



//find grid corners and calculate inner corners from them

// const leftTopCorner = {xcor: 0, ycor: 0, width: 20, height: 20, snake: false, food: false};

const leftTopCorner = {food: false, height: 20, snake: false, width: 20, xcor: 0, ycor: 0};

const rightTopCorner = {xcor: gridWidth, ycor: 0, width: squareWidth, height: squareHeight};

const leftBottomCorner = {xcor: 0, ycor: gridHeight, width: squareWidth, height: squareHeight};

const rightBottomCorner = {xcor: gridWidth, ycor: gridHeight, width: squareWidth, height: squareHeight};

//determine inner corners

const innerLeftTopCorner = {xcor: squareWidth, ycor: squareHeight, width: squareWidth, height: squareHeight, food: false, snake: false};

const innerRightTopCorner = {xcor: gridWidth - squareWidth, ycor: squareHeight, width: squareWidth, height: squareHeight};

const innerLeftBottomCorner = {xcor: squareWidth, ycor: gridHeight - squareHeight, width: squareWidth, height: squareHeight};

const innerRightBottomCorner = {xcor: gridWidth - squareWidth, ycor: gridHeight - squareHeight, width: squareWidth, height: squareHeight};




//check if snake out of bounds


const checkBounds = () => {

    


    //right border

    if (rightDir){

        if (gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) + 1].xcor > rightBarrier){
            console.log(` BOUNDS snakeHead.xcor: ${gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) + 1].xcor}`);
            clearAllIntervals();
        }
    }

    //left border

    if (leftDir){

        if (gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) - 1].xcor < leftBarrier){
            console.log(`snakeHead.xcor: ${gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) - 1].xcor}`);
            clearAllIntervals();
        }

    }
    //top border

    if (upDir){

        if (gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) - squaresPerRow].ycor < topBarrier){
            console.log(` snakeHead.ycor: ${gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) - squaresPerRow].ycor}`);
            clearAllIntervals();
        }

    }
    //bottom border

    if (downDir){

        if (gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) + squaresPerRow].ycor > bottomBarrier){
            console.log(` snakeHead.ycor: ${gridArray[gridArray.indexOf(snakeArray[snakeArray.length - 1]) + squaresPerRow].ycor}`);
            clearAllIntervals();
        }

    }


}




    const rightInt = (interval) => {

        if (!rightDir && !leftDir) {

            moveSnakeRight();
            clearLeftInterval = clearInterval(leftInterval);
            clearUpInterval = clearInterval(upInterval);
            clearDownInterval = clearInterval(downInterval);
            rightInterval = setInterval(moveSnakeRight, interval);
            //console.log("right button pressed");

    }

    }

    const leftInt = (interval) => {


        
        if (!leftDir && !rightDir){

            moveSnakeLeft();
            clearRightInterval = clearInterval(rightInterval);  
            clearUpInterval = clearInterval(upInterval); 
            clearDownInterval = clearInterval(downInterval);
            leftInterval = setInterval(moveSnakeLeft, interval);
            //console.log("left button pressed");
    }

    }


    const upInt = (interval) => {

        if (!upDir && !downDir){

            //reverse snakeArray at game start so can move up
            if (!leftDir && !rightDir){
                for (let i = 0, j = snakeArray.length - 1; i < j; i++, j--){
                    let temp = snakeArray[i];
                    snakeArray[i] = snakeArray[j];
                    snakeArray[j] = temp;
                }
            }


            moveSnakeUp();
            clearRightInterval = clearInterval(rightInterval);
            clearLeftInterval = clearInterval(leftInterval);
            clearDownInterval = clearInterval(upInterval);
            upInterval = setInterval(moveSnakeUp, interval);
            //console.log("up button pressed");
         
    }

    }


    const downInt = (interval) => {

        if (!downDir && !upDir){

            moveSnakeDown();
            clearRightInterval = clearInterval(rightInterval);
            clearLeftInterval = clearInterval(leftInterval);
            clearUpInterval = clearInterval(upInterval);
            downInterval = setInterval(moveSnakeDown, interval);
            //console.log("down button pressed");
    }

    }


   




//event listeners for buttons

// growButton.addEventListener("pointerup", (e) => {
//     e.preventDefault();
//     grow();

    
   
// })




rightButton.addEventListener("pointerup", (e) => {

    if (gameover == false){
        e.preventDefault();
        rightInt(int);
    }
});


leftButton.addEventListener("pointerup", (e) => {

    if (gameover == false){
        e.preventDefault(e);
        leftInt(int);
    }



} )


downButton.addEventListener("pointerup", (e) => {
    if (gameover ==false){
        e.preventDefault(e);
        downInt(int);
    }
});

upButton.addEventListener("pointerup", (e) => {

    if (gameover == false){
        e.preventDefault();
        upInt(int);
    }
});

//event listeners for arrow keys

window.addEventListener("keyup", (e) => {
    console.log(`gameover: ${gameover}`)

    if (gameover == false){
        e.preventDefault();

        //console.log(`e.key: ${e.key}`)

        if (e.key == "ArrowLeft") leftInt(int);
        else if (e.key == "ArrowUp") upInt(int);
        else if (e.key == "ArrowRight") rightInt(int);
        else if (e.key == "ArrowDown") downInt(int);

        else if (e.key == "e") grow();
    }
});




for (let square of gridArray) {

    if ((square.xcor == squareWidth && square.ycor == squareHeight) || (square.xcor == gridWidth - squareWidth && square.ycor == squareHeight) || (square.xcor == squareWidth && square.ycor == gridHeight - squareHeight) || (square.xcor == gridWidth - squareWidth && square.ycor == gridHeight - squareHeight)){

        square.corner = true;;
    }
       
    
}






const makeFood = () => {


// const innerLeftTopCorner = {xcor: squareWidth, ycor: squareHeight, width: squareWidth, height: squareHeight, food: false, snake: false};

// const innerRightTopCorner = {xcor: gridWidth - squareWidth, ycor: squareHeight, width: squareWidth, height: squareHeight};

// const innerLeftBottomCorner = {xcor: squareWidth, ycor: gridHeight - squareHeight, width: squareWidth, height: squareHeight};

// const innerRightBottomCorner = {xcor: gridWidth - squareWidth, ycor: gridHeight - squareHeight, width: squareWidth, height: squareHeight};

    //filter out snake squares so we can spawn food in a location where the snake is not occupying that space


    let nonSnakeSquares = gridArray.filter((square) => {
         return square.snake != true && square.food != true;
    });

    //filter out barrier squares so we don't put food in them

    let nonBorderSquare = nonSnakeSquares.filter((square) => {
        return square.xcor > leftBarrier - squareWidth && square.xcor < rightBarrier + squareWidth && square.ycor > topBarrier - squareHeight && square.ycor < bottomBarrier + squareHeight;
    });


    //find corners and then remove them

    // let findCorner = nonBorderSquare.map((square) => {
    //     if ((square.xcor == squareWidth && square.ycor == squareHeight) || (square.xcor == gridWidth - squareWidth && square.ycor == squareHeight) || (square.xcor == squareWidth && square.ycor == gridHeight - squareHeight) || (square.xcor == gridWidth - squareWidth && square.ycor == gridHeight - squareHeight) )
    //         changeColor(gridArray.indexOf(square), "black");
    // })

    //filter out inner borders

    let noInnerCorners = nonBorderSquare.filter((square) => {
        return square.corner != true;
    })

    // let displayFinalGrid = noInnerCorners.map((square) => {
    //     changeColor(gridArray.indexOf(square), "purple");
    // })

  
   

    //square.xcor < leftBarrier && square.xcor > rightBarrier && square.ycor < topBarrier && square.ycor > bottomBarrier;

 

    const length = noInnerCorners.length - 1;

    console.log(length);

    const randomNumber = Math.ceil(Math.random() * length);

    console.log(randomNumber);

    //use random number and filtered squares to create food

    //first isolate square from filterd squared

    let snakeFood = gridArray.indexOf(noInnerCorners[randomNumber]);

    //create loop to make sure snakefood is not a inner corner

    // for (let i = 0; i < cornerArr.length; i++) {

    //     if (gridArray[snakeFood] == cornerArr[i]) {
    //         snakeFood = gridArray.indexOf(nonBorderSquare[randomNumber]);
    //         i = 0;
    //     }

       
    
    // }

      


    

    console.log(snakeFood);

    gridArray[snakeFood].food = true;

   

    changeColor(snakeFood, snakeFoodColor);




}

const checkIfAllFoodEaten = (square)  => {
    if (square.food == true) return true
    else return false;
    
}

const makeFoodOnIncrement = (increment) => {

    console.log(` checkFood ${gridArray.find(checkIfAllFoodEaten)}`)

    if (gridArray.find(checkIfAllFoodEaten) == undefined){

        while (increment > 0) {
            makeFood();
            increment--;
        }

       changeSnakeAndFoodColors();

        //changeAllColors();
       
    
    }

}




//make game barrier visible to player

const renderGameBarrier = () => {

    const getLeftBarrier = gridArray.filter((square) => {
        return square.xcor < leftBarrier;
    });

    const getRightBarrier = gridArray.filter((square) => {
        return square.xcor > rightBarrier;
    });

    const getTopBarrier = gridArray.filter((square) => {
        return square.ycor < topBarrier;
    });

    const getBottomBarrier = gridArray.filter((square) => {
        return square.ycor > bottomBarrier;
    });

    getLeftBarrier.forEach((square) => {
        ctx.fillStyle = barrierColor;
        ctx.fillRect(square.xcor,square.ycor,square.width,square.height);

    });

    getRightBarrier.forEach((square) => {
        ctx.fillStyle = barrierColor;
        ctx.fillRect(square.xcor,square.ycor,square.width,square.height);
    })

    getTopBarrier.forEach((square) => {
        ctx.fillStyle = barrierColor;
        ctx.fillRect(square.xcor,square.ycor,square.width,square.height);
    })

    getBottomBarrier.forEach((square) => {
        ctx.fillStyle = barrierColor;
        ctx.fillRect(square.xcor,square.ycor,square.width,square.height);
    })

    //find border squares and highlight them so we can filter them from where snake food spawns

    //changeColor(gridArray.indexOf(innerLeftBottomCorner), "black");

//   console.log(`innerLeftTop: ${gridArray.indexOf(innerLeftTopCorner)}`);
}

renderGameBarrier();


//initiate the start of the game


startButton.addEventListener("pointerup", (e) => {
    e.preventDefault();
    //moveSnakeRight();

    makeFood();
    


});


window.addEventListener("keyup", (e) => {
    e.preventDefault();
    
    if (e.key == "Enter"){
    
    startGame();
    // makeFood();
    //downInt(int);
    }

});

//create a function for updating score

const playerScores = (increment) => {

    score += increment;
   
    gameStatus.textContent = `SCORE: ${score}`

    if (gridArray.find(checkIfAllFoodEaten) == undefined) foodIncrement++;

    console.log(`food increment: ${foodIncrement}`)
}



//initalize game when it is starte

const initalizeGame = () => {

    makeFood();
    gameStatus.textContent = "Press arrow keys to start game"

}



initalizeGame();



//spawn a bunch of food for testing purposes

const makeTonsOfFood = (quant) => {

    while (quant > 0) {
        makeFood();
        quant--;

}

}


//makeTonsOfFood(20);