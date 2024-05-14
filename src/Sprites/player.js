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
        for (let i = 0; i < this.hand.length; i++){
            this.score += this.hand[i].value;
        }
        if (this.score > 21){
            // In blackjack, Aces can be either 11 or 1
            let aces = this.checkAces();
            while (this.score > 21){
                if (aces > 0){
                    aces--;
                    this.score -= 10;
                }
                else{
                    break;
                }
            }
        }
        return this.score;
    }

    // Helper function for adding cards to hand
    // DO NOT USE ON NON-CARD OBJECTS
    addCard (card) {
        this.hand.push(card);
        return;
    }

    // Function for clearing the hand
    resetHand(){
        this.hand = [];
        return;
    }

    // Helper Function for dealing with Aces
    checkAces(){
        let aces = 0;
        for (let i = 0; i < this.hand.length; i++){
            if (this.hand[i].value == 11){
                aces++;
            }
        }
        return aces;
    }
}