class Card extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, value, frame, config){
        super (scene, x, y, texture, value, frame, config);
        this.waiting = false;
        this.active = false;
        this.inHand = false;
        this.colliding = false;
        this.grouped = true;
        this.tock = 0;
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
                // return to stage
            }
        }
    }

    // Function to trigger swooping behavior
    // Curves need to vary based on position and card value
    // Low cards go for the middle of the screen
    // Mid cards zig-zag, but stay aligned with where they started from
    // High cards go for the edges of the screen
    // Low and High curves differ based on which side of the screen they're on,
    // in order to maximize time on-screen
    makeActive() {
        this.active = true;
        if (this.value <= 5){
            if (this.x > 400){
                this.points = [
                    this.x, this.y,
                    this.x - 150, 250,
                    400, 460,
                    400, 700
                ];
            }
            else {
                this.points = [
                    this.x, this.y,
                    this.x + 150, 250,
                    400, 460,
                    400, 700
                ];
            }
        }
        else if (this.value <= 9){
            this.points = [
                this.x, this.y,
                this.x + 120, 75,
                this.x + 120, 150,
                this.x, 225,
                this.x - 120, 300,
                this.x - 120, 375,
                this.x, 450,
                this.x + 120, 525,
                this.x + 120, 700
            ];
        }
        else {
            if (this.x > 400){
                this.points = [
                    this.x, this.y,
                    this.x - 150, 100,
                    this.x, 250,
                    750, 550,
                    750, 700
                ];
            }
            else {
                this.points = [
                    this.x, this.y,
                    this.x + 150, 100,
                    this.x, 250,
                    150, 550,
                    150, 700
                ];
            }
        }
        this.curve = new Phaser.Curves.Spline(this.points);
        this.add.follower(this.curve, 10, 10, "enemyShip");
        this.follow(this.config);
    }
}