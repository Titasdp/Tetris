//!our class this will soon be implemented in an other file 
class SavedSquare {
    constructor(x, y, color, strokeColor) {
        this.x = x
        this.y = y
        this.color = color
        this.strokeColor = strokeColor
        this.size = 30
        // this.inDisplay= true 
    }

}
class OBlock {
    constructor() {
        this.keys = [] //?This array saves the list of keys that have ben press 
        this.size = 30 //?SQUARE dimensions
        this.x = 0
        this.y = 0
        this.start = true //?This variable sees if it is the first time that the block appears 
        this.xIncrement = 0 //?variable that affects the value of x 
        this.saveX = 0; //?this saves the initial value of increment x 
        this.saveY = 0 //?this saves the initial value of y
        this.TimeIncreY = 0 //?This serve as an timer , when it arrives at 120 the y value will increment
        this.arrival = false //!!!!!!!!!!!!!!!!!!!!!!!


        // *<style
        this.color = "#A30000"
        this.strokeColor = "#f3f3f3f3"
        // *style>

        // *<displayPositions
        this.displayedPositions = [] //?Saves all the display squares  that compose on piece 
        //*displayPositions>

        // *<limits
        this.objRight = false
        this.objLeft = false
        this.contactUnderY = false
        // *limits>
    }
    display() {
        // !this part of the code sees if it is the first time that the block is falling  
        this.myKeys()
        // ************don't touch here *********************************************
        if (this.start == true) {
            this.firstShow()
            this.start = false
        } else {
            this.saveX = this.xIncrement //this is the initial value of x in the display  
            this.x = this.xIncrement
        }
        // ************don't touch here *********************************************
        this.composeBlock()
        this.draw()
        this.updatePosition()
    }
    myKeys() {
        // !this part makes the  block move left and right 
        if (this.keys[39] == true && this.objRight == false) {
            this.xIncrement = this.xIncrement + this.size
            this.keys[39] = false
        }
        // left
        if (this.keys[37] == true && this.objLeft == false) {
            this.xIncrement = this.xIncrement - this.size
            this.keys[37] = false
        }
    }

    composeBlock() {
        this.contactUnderY = false
        this.objRight = false
        this.objLeft = false
        for (let i = 0; i < 4; i++) {
            // !This part of the code saves the last displayed positions 
            this.displayedPositions.push(this.x - this.size)
            this.displayedPositions.push(this.y)

            if (!this.objRight) {
                this.objRight = canMoveXRight(this.x - this.size, this.y)
            }
            if (!this.objLeft) {
                this.objLeft = canMoveXLeft(this.x - this.size, this.y)
            }

            if (!this.contactUnderY) {
                this.contactUnderY = yAxesContact(this.x, this.y, this.size)
            }

            this.xIncrement = this.xIncrement + this.size
            if (i == 1) {
                this.saveY = this.y //saves the first y value to help on the draw of the next object
                this.y = this.y + this.size //increment y so that the second line of squares will be created
                this.xIncrement = this.saveX //gives back the initial value of x 
            }
            this.x = this.xIncrement

            if (i == 3) {
                // !It will only enter here if the last  square of the block has been created
                this.y = this.saveY

            }

        }
    }


    // *<updates de  position of the block that is been display
    updatePosition() {
        this.xIncrement = this.saveX
        this.x = this.xIncrement

        //! this part of the code increment the "y" 130
        if (this.TimeIncreY == 50) {
            this.y = this.y + this.size
            this.TimeIncreY = 0
        } else {
            this.TimeIncreY++
        }
        // console.log(this.blockLimitY);

        // !this part will analyze if the object has found the bottom of the canvas 
        if (this.contactUnderY == true) {
            for (let i = 0; i < this.displayedPositions.length; i++) {

                if (i % 2 == 0) {
                    savePositionFill(this.displayedPositions[i], this.displayedPositions[i + 1], this.color, this.strokeColor)
                }
            }
            this.arrival = true
        } else {
            this.displayedPositions = []
        }

    }
    // *updates de  position of the block that is been display



    /**
     * function that draws the blocks
     * *completed
     */
    draw() {
        for (let i = 0; i < this.displayedPositions.length; i++) {
            if (i % 2 == 0) {
                drawBlock(this.displayedPositions[i] + this.size, this.size, this.displayedPositions[i + 1], this.color, this.strokeColor)
            }
        }
    }


    /**
     * function that formate the variables in the start of the display of the block
     * *completed
     */
    firstShow() {
        //*At the start the o block will appear ath the middle of the canvas
        this.xIncrement = W / 2 //this is the initial value of x in the display  
        this.saveX = this.xIncrement
        this.x = this.xIncrement

    }
    setKeys(keys) {
        this.keys = keys
    }
    returnArrival() {
        if (this.arrival == false) {
            return false
        } else {
            return true
        }
    }
}

// !Get the canvas element from the html and get the context of the canvas 
const canvas = document.querySelector("#myCanvas");
const context = canvas.getContext("2d");



//add to the window this 2 events  
window.addEventListener('keydown', ArrowPressed);
window.addEventListener('keyup', ArrowReleased);

// canvas width and canvas height 
let H = canvas.height
let W = canvas.width

//!Initial variables
let keys = [] //?This array saves the list of keys that have ben press 
let takenSquares = [] //?this array  saves all the positions that have been taken 
let displayOBlock = []
let canDisplay = true

// let contactUnderY = false


canvasStyle()
myTetris()
/**
 * This function builds the canvas backGround (it also serve as a "clearRect")
 * //*This is complete 
 */
function canvasStyle() {
    let size = 30
    context.beginPath();
    for (let i = 0; i < 10; i++) {

        for (let j = 0; j < 20; j++) {
            context.strokeStyle = '#f3f3f3f3';
            context.fillStyle = 'black';
            context.rect(i * size, j * size, size, size);
        }
    }
    context.fill();
    context.stroke()
    context.closePath();
}


// *************************under construction******************************
/**
 * This function focus on creating the o block peace
 * //*This is  in development 
 * //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
 */
function myTetris() {
    canvasStyle()
    isRowCompleted()
    fillTaken()


    if (canDisplay) {
        displayOBlock = []
        displayOBlock.push(new OBlock())
    }


    for (const block of displayOBlock) {
        block.setKeys(keys)
        block.display()
        canDisplay = block.returnArrival()
    }
    requestAnimationFrame(myTetris)
}

function ArrowReleased(e) {
    keys[e.keyCode] = false;
    for (const block of displayOBlock) {
        block.keys = keys
    }
}

function ArrowPressed(e) {
    keys[e.keyCode] = true;
    for (const block of displayOBlock) {
        block.keys = keys
    }

}

/**
 *Function that saves all the filled positions and their specific color  
 * @param {number} x This is the position that has been taken (x)  
 * @param {number} y This is the position that has been taken(y)
 * @param {string} color this is the color of the block that has been taken  
 * @param {string} strokeColor  color of the border of the block 
 * *completed
 */
function savePositionFill(x, y, color, strokeColor = `#000000`) {
    takenSquares.push(new SavedSquare(x, y, color, strokeColor))
}
/**
 * this function main focus is tho draw the current block
 * * *completed
 */
function drawBlock(x, size, y, color, strokeColor) {
    context.beginPath();
    context.rect(x - size, y, size, size);
    context.fillStyle = color;
    context.strokeStyle = strokeColor;
    // context.strokeRect(x - size, y, size, size);
    context.stroke()
    context.fill();
    context.closePath();
}
/**
 * this function paints all the already taken squares
 * *completed
 */
function fillTaken() {
    if (takenSquares.length > 0) {
        console.log(takenSquares.length);

        for (const taken of takenSquares) {
            context.beginPath();
            context.fillStyle = taken.color;
            context.strokeStyle = taken.strokeColor
            context.fillRect(taken.x, taken.y, taken.size, taken.size);
            // context.strokeRect(taken.x, taken.y, taken.size, taken.size);
            context.fill();
            context.stroke()
            context.closePath();
        }
    }
}

/**
 * This functions controls if there has been an contact whit a block under the block that is been displayed or that the block has found the bottom
 * *completed
 */
function yAxesContact(x, y, size) {
    if (takenSquares.length > 0) {
        for (const taken of takenSquares) {
            if ((y + size) == taken.y && taken.x == x - size) {
                return true
            }
        }
    }
    if ((y + size) == H) {
        return true
    }
    return false
}


//**Function that controls if "there is" objects in the left and the right of the displayed object**
/**
 * Function that controls objects in the left side of the object that is been displayed
 * @param {Number} X the x value of the object that is been displayed 
 */
function canMoveXLeft(X, Y) {
    for (const taken of takenSquares) {
        if (taken.x == X - taken.size && Y == taken.y) {
            return true
        }
    }


    if (X == 0) {
        return true
    }
    return false
}

/**
 * Function that controls objects in the right side of the object that is been displayed
 * @param {Number} X the x value of the object that is been displayed 
 */
function canMoveXRight(X, Y) {
    for (const taken of takenSquares) {
        if (taken.x == X + taken.size && Y == taken.y) {
            return true
        }
    }
    if (X == (W - 30)) {
        return true
    }
    return false
}
//**************************************************************************************************


// *********************Functions focused in deleting a completed row*******************************
function isRowCompleted() {

    let count = 0
    let completed = []
    let takenIn = false
    if (takenSquares.length > 1) {



        for (let i = 0; i < takenSquares.length; i++) {
            count = 0
            takenIn = false
            for (let j = 0; j < takenSquares.length; j++) {
                if (takenSquares[i].y === takenSquares[j].y) {
                    count++
                    // console.log(count);
                    // console.log(takenSquares[i].y );


                }
                if (count == 10) {
                    for (let s = 0; s < completed.length; s++) {
                        console.log(1);

                        if (completed[s] == takenSquares[i].y) {
                            takenIn = true
                        }
                    }

                    if (takenIn == false) {
                        completed.push(takenSquares[i].y)
                    }
                }

            }
        }

        if (completed.length != 0) {
            clearRow(completed)
        }

    }


}

function clearRow(completed) {
    for (const position of completed) {
        takenSquares = takenSquares.filter(
            square => square.y !== position
        )

        fallDown(position)
    }
}

function fallDown(position) {
    for (const taken of takenSquares) {
        if (taken.y < position) {
            taken.y += taken.size
        }
    }
}
//**************************************************************************************************


/**
 * this function sees if the projection the possible change that may be made to the object and looks for possible  disturbance  that could happen in the trajectory
 * @param {number} X X position of the projection of the possible change
 * @param {number} Y y position of the projection of the possible change
 * @param {number} size size of the squares 
 */
function obstruction(X, Y, size) {
    for (const taken of takenSquares) {
        if (taken.x == X && Y == taken.y) {
            return true
        }
    }
    if ((X) < 0) {
        return true
    } else if ((X + size) > W) {
        return true
    }
    return false
}