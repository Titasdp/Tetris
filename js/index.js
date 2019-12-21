import Block from "./BlocksClass.js"













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
export let takenSquares = [] //?this array  saves all the positions that have been taken 
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
        let random = Math.floor(Math.random() * 7) + 1; // returns a random integer from 1 to 2

        displayOBlock.push(new Block(takenSquares, random, W, H, context))


    }

    for (const block of displayOBlock) {
        block.setKeys(keys)
        block.display()
        canDisplay = block.returnArrival()
        takenSquares = block.returnTakenSquares()
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
// export function savePositionFill(x, y, color, strokeColor = `#000000`) {
//     takenSquares.push(new SavedSquare(x, y, color, strokeColor))
// }
/**
 * this function main focus is tho draw the current block
 * * *completed
 */
function drawBlock(x, size, y, color, strokeColor) {
    context.beginPath();

    context.fillStyle = color;
    context.strokeStyle = strokeColor;
    context.fillRect(x - size, y, size, size);
    context.strokeRect(x - size, y, size, size);
    context.fill();
    context.stroke()
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
// export function yAxesContact(x, y, size) {
//     if (takenSquares.length > 0) {
//         for (const taken of takenSquares) {
//             if ((y + size) == taken.y && taken.x == x - size) {
//                 return true
//             }
//         }
//     }
//     if ((y + size) == H) {
//         return true
//     }
//     return false
// }


// //**Function that controls if "there is" objects in the left and the right of the displayed object**
// /**
//  * Function that controls objects in the left side of the object that is been displayed
//  * @param {Number} X the x value of the object that is been displayed 
//  */
// export function canMoveXLeft(X, Y) {
//     for (const taken of takenSquares) {
//         if (taken.x == X - taken.size && Y == taken.y) {
//             return true
//         }
//     }


//     if (X == 0) {
//         return true
//     }
//     return false
// }

// /**
//  * Function that controls objects in the right side of the object that is been displayed
//  * @param {Number} X the x value of the object that is been displayed 
//  */
// export function canMoveXRight(X, Y) {
//     for (const taken of takenSquares) {
//         if (taken.x == X + taken.size && Y == taken.y) {
//             return true
//         }
//     }
//     if (X == (W - 30)) {
//         return true
//     }
//     return false
// }
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


// /**
//  * this function sees if the projection the possible change that may be made to the object and looks for possible  disturbance  that could happen in the trajectory
//  * @param {number} X X position of the projection of the possible change
//  * @param {number} Y y position of the projection of the possible change
//  * @param {number} size size of the squares 
//  */
// export function obstruction(X, Y, size) {
//     console.log(X);
//     for (const taken of takenSquares) {
//         if (taken.x == X && Y == taken.y) {
//             return true
//         }
//     }
//     if ((X) < 0) {
//         return true
//     } else if ((X + size) > W) {
//         return true
//     }
//     return false
// }