class Player extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame, leftKey, rightKey, playerSpeed) {
        super (scene, x, y, texture, frame);
        this.hand = [];
        this.left = leftKey;
        this.right = rightKey;
        this.playerSpeed = playerSpeed;
        scene.add.existing(this);
        this.lives = 3;
        return this;
    }
    update () {
        // Moving left
        if (this.left.isDown) {
            // Check to make sure the sprite can actually move left
            if (this.x > (this.displayWidth/2)) {
                this.x -= this.playerSpeed;
            }
        }

        // Moving right
        if (this.right.isDown) {
            // Check to make sure the sprite can actually move right
            if (this.x < (game.config.width - (this.displayWidth/2))) {
                this.x += this.playerSpeed;
            }
        }
    }

    // Helper function for getting value of hand
    checkHand () {
        this.score = 0;
        for (card in this.hand){
            this.score += card.value;
        }
        return this.score;
    }

    // Helper function for adding cards to hand
    addCard (card) {
        this.hand.push(card);
        return;
    }

    // Function for converting cards to score
    playHand (){
        this.handValue = this.checkHand();
        if (handValue < 16){
            //lose score = (16 - handValue)*100*hits
        }
        else if (handValue <= 21){
            //gain score = handValue*100*hits
        }
        this.resetHand();
        return;
    }

    // Function for clearing the hand
    resetHand(){
        this.hand = [];
        return;
    }
}