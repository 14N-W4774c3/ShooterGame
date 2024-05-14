class Card extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame, value){
        super (scene, x, y, texture, frame);
        this.value = value;

        // State variables
        this.waiting = false;
        this.active = false;
        this.inHand = false;
        this.returning = false;
        this.colliding = false;

        // Return Timer
        this.tock = 0;

        // Snapshot Variables
        this.tempX = 0;
        this.tempY = 0;

        return this;
    }
    update () {
        if (this.active){
            // If offscreen, deactivate and start waiting
            if (this.y > 600){
                this.active = false;
                this.waiting = true;
            }
        }
        // If colliding, disable and enter the player's hand
        if (this.colliding){
            this.grouped = false;
            this.active = false;
            this.inHand = true;
        }
        // If waiting, wait for 5 ticks, then return to the group
        if (this.waiting){
            this.tock += 1;
            if (this.tock == 5){
                this.tock = 0;
                this.waiting = false;
                this.returning = true;
                this.x = this.tempX;
                this.y = 0;
            }
        }
    }
}