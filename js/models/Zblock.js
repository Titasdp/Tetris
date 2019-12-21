
    class ZBlock {
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

            // *<display formate
            this.form = 1
            this.formChangeObstacle = false
            // *display formate>

            // *<style
            this.color = "#05B2DC"
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

            //********<this is important 

            if (this.start == true) {
                this.firstShow()
                this.start = false

            } else {
                this.saveX = this.xIncrement //this is the initial value of x in the display  
                this.x = this.xIncrement
                this.saveY = this.y
            }
            this.updateFormation()
            this.draw()
            this.updatePosition()
            //*********this is important>
        }


        myKeys() {
            // console.log(keys);

            // !this part makes the  block move left and right 
            if (this.keys[39] == true && this.objRight == false) {
                this.xIncrement = this.xIncrement + this.size
                this.keys[39] = false
                console.log(keys);
            }
            // left
            if (this.keys[37] == true && this.objLeft == false) {
                this.xIncrement = this.xIncrement - this.size
                // this.limRight++
                // this.limLeft--
                this.keys[37] = false
            }
            if (this.keys[38] == true && this.formChangeObstacle == false) {
                if (this.form == 1) {
                    this.form = 2
                } else if (this.form == 2) {
                    this.form = 3
                } else if (this.form == 3) {
                    this.form = 4
                } else {
                    this.form = 1
                }

                this.keys[38] = false
            }
        }
        // * formation of the block
        //  first Form
        composeBlock1() {
            this.contactUnderY = false
            this.objRight = false
            this.objLeft = false
            for (let i = 0; i < 4; i++) {

                if (i == 0) {
                    this.confTransition2(this.x - this.size, this.y)
                }
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
                if (i == 0) {
                    //! YOU HAVE TO SAVE THE CENTER DATAS TO USE THEM US REFERENCE IN THE DEVELOPMENT OF THE OTHER PARTS OF THE CANVAS 
                    // this.saveY = this.y //saves the first y value to help on the draw of the next object
                    this.saveX = this.xIncrement
                    this.xIncrement = this.xIncrement - this.size
                }
                if (i == 1) {
                    this.xIncrement = this.saveX
                    this.y = this.y + this.size //increment y so that the second line of squares will be created

                }
                if (i == 2) {
                    this.xIncrement = this.xIncrement + this.size
                }
                if (i == 3) {
                    this.y = this.saveY

                }
                this.x = this.xIncrement
            }
        }
        //  Second Form
        composeBlock2() {
            this.contactUnderY = false
            this.objRight = false
            this.objLeft = false
            for (let i = 0; i < 4; i++) {

                if (i == 0) {
                    this.confTransition3(this.x - this.size, this.y)
                }


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

                if (i == 0) {
                    //! YOU HAVE TO SAVE THE CENTER DATAS TO USE THEM US REFERENCE IN THE DEVELOPMENT OF THE OTHER PARTS OF THE CANVAS 
                    this.saveY = this.y //saves the first y value to help on the draw of the next object
                    this.saveX = this.xIncrement
                    this.y = this.y + this.size

                    this.xIncrement = this.xIncrement
                }

                if (i == 1) {
                    this.y = this.saveY
                    this.xIncrement -= this.size
                }
                if (i == 2) {
                    this.y -= this.size
                }


                if (i == 3) {
                    this.xIncrement = this.saveX
                    this.y = this.saveY
                }
                this.x = this.xIncrement

            }

        }
        // third Form 
        composeBlock3() {
            this.contactUnderY = false
            this.objRight = false
            this.objLeft = false
            for (let i = 0; i < 4; i++) {

                if (i == 0) {
                    this.confTransition2(this.x - this.size, this.y)
                }
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
                if (i == 0) {
                    //! YOU HAVE TO SAVE THE CENTER DATAS TO USE THEM US REFERENCE IN THE DEVELOPMENT OF THE OTHER PARTS OF THE CANVAS 
                    // this.saveY = this.y //saves the first y value to help on the draw of the next object
                    this.saveX = this.xIncrement
                    this.xIncrement = this.xIncrement - this.size
                }
                if (i == 1) {
                    this.xIncrement = this.saveX
                    this.y = this.y - this.size //increment y so that the second line of squares will be created

                }
                if (i == 2) {
                    // this.y = this.saveY

                    this.xIncrement = this.xIncrement + this.size
                }
                if (i == 3) {
                    this.y = this.saveY

                }
                this.x = this.xIncrement
            }
        }
        //  fourth Form
        composeBlock4() {
            this.contactUnderY = false
            this.objRight = false
            this.objLeft = false
            for (let i = 0; i < 4; i++) {

                if (i == 0) {
                    this.confTransition3(this.x - this.size, this.y)
                }


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

                if (i == 0) {
                    //! YOU HAVE TO SAVE THE CENTER DATAS TO USE THEM US REFERENCE IN THE DEVELOPMENT OF THE OTHER PARTS OF THE CANVAS 
                    this.saveY = this.y //saves the first y value to help on the draw of the next object
                    this.saveX = this.xIncrement
                    this.y = this.y - this.size

                    this.xIncrement = this.xIncrement
                }

                if (i == 1) {
                    this.y = this.saveY
                    this.xIncrement += this.size
                    // this.y = this.y + this.size

                }
                if (i == 2) {
                    // this.y = this.saveY
                    this.y += this.size
                }


                if (i == 3) {
                    this.xIncrement = this.saveX
                    this.y = this.saveY
                }
                this.x = this.xIncrement

            }

        }

        // ************************



        // !Essas funções recriam a possibilidade do utilizador querer realizar uma alteracao no formato do objeto e procura osbtrucoes 
        confTransition1(X, Y) {
            this.formChangeObstacle = false
            let saveY = 0
            let xIncrement = X
            let saveX = 0
            for (let i = 0; i < 4; i++) {
                if (!this.formChangeObstacle) {
                    this.formChangeObstacle = obstruction(X, Y, this.size)
                }
                if (i == 0) {
                    //! YOU HAVE TO SAVE THE CENTER DATAS TO USE THEM US REFERENCE IN THE DEVELOPMENT OF THE OTHER PARTS OF THE CANVAS 
                    // this.saveY = this.y //saves the first y value to help on the draw of the next object
                    saveX = xIncrement
                    xIncrement -= this.size
                }
                if (i == 1) {
                    xIncrement = saveX
                    Y = Y + this.size //increment y so that the second line of squares will be created

                }
                if (i == 2) {
                    xIncrement += this.size
                }
                if (i == 3) {
                    Y = saveY
                }
                X = xIncrement
            }


        }
        confTransition2(X, Y) {
            this.formChangeObstacle = false
            let saveY = 0
            let xIncrement = X
            let saveX = 0
            for (let i = 0; i < 4; i++) {
                if (!this.formChangeObstacle) {
                    this.formChangeObstacle = obstruction(X, Y, this.size)
                }
                if (i == 0) {
                    //! YOU HAVE TO SAVE THE CENTER DATAS TO USE THEM US REFERENCE IN THE DEVELOPMENT OF THE OTHER PARTS OF THE CANVAS 
                    saveY = Y //saves the first y value to help on the draw of the next object
                    saveX = xIncrement
                    Y += this.size

                    xIncrement = xIncrement
                }

                if (i == 1) {
                    Y = saveY
                    xIncrement -= this.size
                    // this.y = this.y + this.size

                }
                if (i == 2) {
                    // this.y = this.saveY
                    Y -= this.size
                }


                if (i == 3) {
                    xIncrement = this.saveX
                    Y = saveY
                }
                X = xIncrement
            }
        }
        confTransition3(X, Y) {
            this.formChangeObstacle = false
            let saveY = 0
            let xIncrement = X
            let saveX = 0
            for (let i = 0; i < 4; i++) {
                if (!this.formChangeObstacle) {
                    this.formChangeObstacle = obstruction(X, Y, this.size)
                }
                if (i == 0) {
                    //! YOU HAVE TO SAVE THE CENTER DATAS TO USE THEM US REFERENCE IN THE DEVELOPMENT OF THE OTHER PARTS OF THE CANVAS 
                    saveX = xIncrement
                    xIncrement += this.size
                }
                if (i == 1) {
                    xIncrement = saveX
                    Y -= this.size
                }
                if (i == 2) {
                    xIncrement -= this.size
                }

                X = xIncrement
            }


        }
        confTransition4(X, Y) {
            this.formChangeObstacle = false
            let saveY = 0
            let xIncrement = X
            let saveX = 0
            for (let i = 0; i < 4; i++) {
                if (!this.formChangeObstacle) {
                    this.formChangeObstacle = obstruction(X, Y, this.size)
                }
                if (i == 0) {
                    //! YOU HAVE TO SAVE THE CENTER DATAS TO USE THEM US REFERENCE IN THE DEVELOPMENT OF THE OTHER PARTS OF THE CANVAS 
                    saveY = Y //saves the first y value to help on the draw of the next object
                    saveX = xIncrement
                    Y -= this.size

                    xIncrement = xIncrement
                }

                if (i == 1) {
                    Y = saveY
                    xIncrement += this.size
                }
                if (i == 2) {

                    Y += this.size
                }
                X = xIncrement
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


        // *<updates block formation
        updateFormation() {
            if (this.form == 1) {
                this.composeBlock1()
            } else if (this.form == 2) {
                this.composeBlock2()
            } else if (this.form == 3) {
                this.composeBlock3()
            } else if (this.form == 4) {
                this.composeBlock4()
            }
        }
        // *updates block formation>
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
            this.y += this.size
            this.saveX = this.xIncrement
            this.x = this.xIncrement
        }

        /**
         * that get the keys pressed by the players  and set them in the class  
         * *completed
         */
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