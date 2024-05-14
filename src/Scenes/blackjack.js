class Blackjack extends Phaser.Scene {
    constructor(){
        super("blackjack2");

        // Sprite Holder
        this.my = {sprite: {}};

        // Physics Constants
        this.moveSpeed = 10;
        this.shotSpeed = 5;
        this.maxBullets = 3;
        this.maxEnemyBullets = 25;
        this.maxActive = 4;

        // Inputs
        this.aKey = null;
        this.dKey = null;
        this.spaceKey = null;
        this.wKey = null;
    
        // Movement Config
        this.config = {
            from: 0, 
            to: 1, 
            delay: 0, 
            duration: 2000, 
            ease: 'Sine.easeInOut', 
            repeat: 0, 
            yoyo: false, 
            rotateToPath: true, 
            rotationOffset: -90
        };
    }
    preload(){
        this.load.setPath("./assets/");

        // Graphics
        // Cards
        this.load.image("SpadesA", "cardSpadesA.png");
        this.load.image("Spades2", "cardSpades2.png");
        this.load.image("Spades3", "cardSpades3.png");
        this.load.image("Spades4", "cardSpades4.png");
        this.load.image("Spades5", "cardSpades5.png");
        this.load.image("Spades6", "cardSpades6.png");
        this.load.image("Spades7", "cardSpades7.png");
        this.load.image("Spades8", "cardSpades8.png");
        this.load.image("Spades9", "cardSpades9.png");
        this.load.image("Spades10", "cardSpades10.png");
        this.load.image("SpadesJ", "cardSpadesJ.png");
        this.load.image("SpadesQ", "cardSpadesQ.png");
        this.load.image("SpadesK", "cardSpadesK.png");
        this.load.image("HeartsA", "cardHeartsA.png");
        this.load.image("Hearts2", "cardHearts2.png");
        this.load.image("Hearts3", "cardHearts3.png");
        this.load.image("Hearts4", "cardHearts4.png");
        this.load.image("Hearts5", "cardHearts5.png");
        this.load.image("Hearts6", "cardHearts6.png");
        this.load.image("Hearts7", "cardHearts7.png");
        this.load.image("Hearts8", "cardHearts8.png");
        this.load.image("Hearts9", "cardHearts9.png");
        this.load.image("Hearts10", "cardHearts10.png");
        this.load.image("HeartsJ", "cardHeartsJ.png");
        this.load.image("HeartsQ", "cardHeartsQ.png");
        this.load.image("HeartsK", "cardHeartsK.png");
        this.load.image("ClubsA", "cardClubsA.png");
        this.load.image("Clubs2", "cardClubs2.png");
        this.load.image("Clubs3", "cardClubs3.png");
        this.load.image("Clubs4", "cardClubs4.png");
        this.load.image("Clubs5", "cardClubs5.png");
        this.load.image("Clubs6", "cardClubs6.png");
        this.load.image("Clubs7", "cardClubs7.png");
        this.load.image("Clubs8", "cardClubs8.png");
        this.load.image("Clubs9", "cardClubs9.png");
        this.load.image("Clubs10", "cardClubs10.png");
        this.load.image("ClubsJ", "cardClubsJ.png");
        this.load.image("ClubsQ", "cardClubsQ.png");
        this.load.image("ClubsK", "cardClubsK.png");
        this.load.image("DiamondsA", "cardDiamondsA.png");
        this.load.image("Diamonds2", "cardDiamonds2.png");
        this.load.image("Diamonds3", "cardDiamonds3.png");
        this.load.image("Diamonds4", "cardDiamonds4.png");
        this.load.image("Diamonds5", "cardDiamonds5.png");
        this.load.image("Diamonds6", "cardDiamonds6.png");
        this.load.image("Diamonds7", "cardDiamonds7.png");
        this.load.image("Diamonds8", "cardDiamonds8.png");
        this.load.image("Diamonds9", "cardDiamonds9.png");
        this.load.image("Diamonds10", "cardDiamonds10.png");
        this.load.image("DiamondsJ", "cardDiamondsJ.png");
        this.load.image("DiamondsQ", "cardDiamondsQ.png");
        this.load.image("DiamondsK", "cardDiamondsK.png");
        
        // Player
        this.load.image("player", "player.png");
        this.load.image("life", "chipRedWhite.png");

        // Projectiles
        this.load.image("enemyShot", "pieceBlue_single09.png");
        this.load.image("projectile", "pieceYellow_single10.png");

        // Buttons
        this.load.image("buttonGraphic", "yellow.png");

        // Audio
        // Enemy firing sound
        this.load.audio("chipShot", "chipLay1.ogg");
        // Player firing sound
        this.load.audio("chipFire", "chipsCollide1.ogg");
        // Shot - Player collision sound
        this.load.audio("chipBet", "chipsStack3.ogg");
        // Shot - Card collision sound
        this.load.audio("hitChip", "cardPlace3.ogg");
        // Card - Player collision sound
        this.load.audio("hitPlayer", "cardPlace1.ogg");
    }
    create () {
        let my = this.my;

        // Create Text
        this.gameOverText = this.add.text(200, 200, "Game Over", {align: 'center'});
        this.continueText = this.add.text(200, 250, "Do You Want To Continue?", {align: 'center'});
        this.yesText = this.add.text(200, 400, "Yes", {align: 'center'});
        this.noText = this.add.text(400, 400, "No", {align: 'center'});
        this.restartText = this.add.text(400, 400, "Restart", {align: 'center'});
        this.yourScoreText = this.add.text(400, 300, "Your score: "+this.score, {align: 'center'});
        this.scoreTrackerText = this.add.text(400, 525, "Score: "+this.score);
        this.multTrackerText = this.add.text(400, 575, "Mult: x"+this.scoreMult);

        // Create Containers
        my.sprite.bullet = [];
        my.sprite.enemyBullet = [];
        // Spawn bullets
        my.sprite.projectile = null;
        for (let i = 0; i < this.maxBullets; i++){
            my.sprite.projectile = this.add.sprite(-100, -100, "projectile");
            my.sprite.projectile.setScale(0.40);
            my.sprite.bullet.push(my.sprite.projectile);
            my.sprite.bullet[i].visible = false;
        }
        for (let i = 0; i < this.maxEnemyBullets; i++){
            my.sprite.projectile = this.add.sprite(-100, -100, "enemyShot");
            my.sprite.projectile.setScale(0.40);
            my.sprite.enemyBullet.push(my.sprite.projectile);
            my.sprite.enemyBullet[i].visible = false;
        }

        // Movement Key Objects
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.init_game("Start");

        // Projectile
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // Play Hand
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        // Create Buttons
        this.buttonYes = this.add.nineslice(-100, -100, "buttonGraphic");
        this.buttonNo = this.add.nineslice(-100, -100, "buttonGraphic");
        this.buttonRestart = this.add.nineslice(-100, -100, "buttonGraphic");
    }
    update() {
        let my = this.my;

        if (this.pause == false){
            this.bulletCooldown--;
            this.cooldown++;

            // Check Conditions
            // Player Busts
            if (my.sprite.player.checkHand() > 21){
                my.sprite.player.lives--;
                let lostLife = my.sprite.lifeCounter.getLast();
                my.sprite.lifeCounter.remove(lostLife);
                lostLife.visible = false;
                my.sprite.player.resetHand();
                this.scoreMult = 1;
                this.multTrackerText.setText("Mult: x"+this.scoreMult);
            }
            // Player runs out of chips
            if (this.score < 0){
                my.sprite.player.lives--;
                let lostLife = my.sprite.lifeCounter.getLast();
                my.sprite.lifeCounter.remove(lostLife);
                lostLife.visible = false;
                this.score = 200;
                this.scoreTrackerText.setText("Score: "+this.score);
            }
            // Player runs out of lives
            if (my.sprite.player.lives == 0){
                my.sprite.player.lives = -1;
                this.pause = true;
                this.gameOver();
            }
            // Deck runs out of winning hands
            if (my.sprite.player.checkHand() + this.deckSum() < 16){
                this.pause = true;
                //End wave
                this.continueText.visible = true;
                this.buttonYes.setPosition(200, 400);
                this.buttonNo.setPosition(400, 400);
                this.yesText.visible = true;
                this.noText.visible = true;
                this.buttonYes.setInteractive();
                this.buttonNo.setinteractive();
            }

            // Check collisions
            // Card - Player Collision
            for (let card of this.activeCards.getChildren()){
                if (this.collides(card, my.sprite.player)){
                    my.sprite.player.addCard(card);
                    this.activeCards.remove(card);
                    this.deck.remove(card);
                    card.x = 450 + (50*my.sprite.player.handSize);
                    card.y = 550;
                    card.colliding = true;
                    card.update();
                }
            }
            // Enemy Shot - Player Collision
            for (let shot of my.sprite.enemyBullet){
                if (this.collides(shot, my.sprite.player)){
                    shot.visible = false;
                    shot.x = -100;
                    shot.y = -100;
                    console.log("Score mult is "+this.scoreMult);
                    this.scoreMult++;
                    console.log("Score mult is now "+this.scoreMult);
                    this.multTrackerText.setText("Mult: x"+this.scoreMult);
                    console.log("The message SHOULD say "+this.multTrackerText.text);
                }
            }
            // Player Shot - Card Collision
            // It's 156 checks at max to start - not great, but oh well.
            for (let card of this.deck.getChildren()){
                for (let shot of my.sprite.bullet){
                    if (this.collides(card, shot)){
                        my.sprite.player.addCard(card);
                        if (this.activeCards.contains(card)){
                            this.activeCards.remove(card);
                        }
                        this.deck.remove(card);
                        card.x = 450 + (50*my.sprite.player.handSize);
                        card.y = 550;
                        card.colliding = true;
                    }
                }
            }

            // Projectile Firing
            if (this.spaceKey.isDown){
                if (this.bulletCooldown < 0){
                    for (let bullet of my.sprite.bullet) {
                        if (!bullet.visible){
                            bullet.x = my.sprite.player.x;
                            bullet.y = my.sprite.player.y;
                            this.sound.play("chipFire");
                            bullet.visible = true;
                            this.bulletCooldown = 5;
                            break;
                        }
                    }
                }
            }

            // Card Action
            if (this.cooldown%10 == 0 && this.cooldown > 30){
                if (this.activeBullets < this.maxEnemyBullets){
                    for (let card of this.deck.getChildren()){
                        if (!this.activeCards.contains(card)){
                            if (Math.floor(Math.random()*3) == 2){
                                for (let bullet of my.sprite.enemyBullet) {
                                    if (!bullet.visible){
                                        bullet.x = card.x;
                                        bullet.y = card.y;
                                        this.sound.play("chipShot");
                                        bullet.visible = true;
                                        break;
                                    }
                                }
                                this.activeBullets++;
                                if (this.activeBullets == this.maxEnemyBullets){
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            if (this.cooldown%14 == 0 && this.cooldown > 50){
                if (this.activeCards.getLength() < this.maxActive){
                    for (let card of this.deck.getChildren()){
                        if (!this.activeCards.contains(card)){
                            if (Math.floor(Math.random()*13) > 10){
                                this.makeActive(card);
                                this.activeCards.add(card);
                                if (this.activeCards.getLength() == this.maxActive){
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            // Returning cards
            for (let card of this.activeCards.getChildren()){
                if(card.returning){
                    if(card.y <= card.tempY-10){
                        card.y += 10;
                    }
                    else if (card.y < card.tempY){
                        card.y = card.tempY;
                    }
                    else{
                        card.returning = false;
                        this.activeCards.remove(card);
                    }
                }
            }
            //Play Hand
            if (Phaser.Input.Keyboard.JustDown(this.wKey)){
                let handValue = my.sprite.player.checkHand();
                if (handValue < 16){
                    //lose score = (16 - handValue)*100*hits
                    this.score -= (16 - this.handValue) * 100 * this.scoreMult;
                }
                else if (this.handValue <= 21){
                    //gain score = handValue*100*hits
                    this.score += this.handValue * 100 * this.scoreMult;
                }
                this.scoreMult = 1;
                my.sprite.player.resetHand();
                this.scoreTrackerText.setText("Score: "+this.score);
                this.multTrackerText.setText("Mult: x"+this.scoreMult);
                return;
            }

            // Projectile Motion
            for (let bullet of my.sprite.bullet){
                bullet.y -= this.shotSpeed;
                if (bullet.y < -(bullet.displayHeight/2)){
                    bullet.visible = false;
                }
            }
            for (let bullet of my.sprite.enemyBullet){
                bullet.y += this.shotSpeed;
                if (bullet.y > (bullet.displayHeight/2)+600){
                    bullet.visible = false;
                }
            }

            my.sprite.player.update();
            for (let card of this.activeCards.getChildren()){
                card.update();
            }
        }
        // Button Interactions
        // Only onscreen while game is paused, so can't be in the unpaused code.
        this.buttonYes.on('pointerdown', () => {
            this.buttonYes.setPosition(-100, -100);
            this.buttonNo.setPosition(-100, -100);
            this.init_game("continue");
        });
        this.buttonNo.on('pointerdown', () => {
            this.buttonYes.setPosition(-100, -100);
            this.buttonNo.setPosition(-100,-100);
            this.gameOver();
        });
        this.buttonRestart.on('pointerdown', () => {
            this.buttonRestart.setPosition(-100, -100);
            this.init_game("GameOver");
        });
    }

    init_game (state){
        let my = this.my;

        // Clear Variables
        if (state == "Start" || state == "GameOver"){
            this.score = 200;
        }
        this.cooldown = 0;  // Enemy ticker
        this.bulletCooldown = 0;  // Player Shots
        this.scoreMult = 1; // Score Multiplier
        this.activeBullets = 0; //count of active enemy shots

        // Text Displays
        this.gameOverText.visible = false;
        this.continueText.visible = false;
        this.yesText.visible = false;
        this.noText.visible = false;
        this.restartText.visible = false;
        this.yourScoreText.visible = false;
        this.scoreTrackerText.setText("Score: "+this.score);
        this.multTrackerText.setText("Mult: x"+this.scoreMult);
        
        // Reset Bullets
        for (let i = 0; i < this.maxBullets; i++){
            my.sprite.bullet[i].x = -100;
            my.sprite.bullet[i].y = -100;
            my.sprite.bullet[i].visible = false;
        }
        for (let i = 0; i < this.maxEnemyBullets; i++){
            my.sprite.enemyBullet[i].x = -100;
            my.sprite.enemyBullet[i].y = -100;
            my.sprite.enemyBullet[i].visible = false;
        }

        // Spawn Wave - BROKEN
        this.deck = this.add.group();
        let suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
        let values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
        let incrementer = 0;
        for (let suit of suits){
            for (let value of values){
                let texture = suit+value;
                if (value == "A"){
                    value = 11;
                }
                else if (value == "J" || value == "Q" || value == "K"){
                    value = 10;
                }
                let newX = 160+(40*(incrementer%13));
                let newY = 50+(50*(Math.floor(incrementer/13)));
                console.log(newX + ", " + newY + ", " + texture + ", " + value);
                my.sprite.card = new Card (this, newX, newY, texture, 0, value);
                console.log(my.sprite.card.texture);
                this.deck.add(my.sprite.card);
                incrementer++;
            }
        }
        this.deck.scaleXY(-0.75, -0.75);
        this.deck.shuffle();
        this.activeCards = this.add.group();

        // Spawn Character
        my.sprite.player = new Player(this, game.config.width/2, game.config.height - 100, "player", null, this.aKey, this.dKey, this.moveSpeed);
        my.sprite.player.setScale(2.00);
        my.sprite.lifeCounter = this.add.group();
        for (let i = 0; i < my.sprite.player.lives; i++){
            let lifeChip = this.add.sprite(100+(i*50), 550, "life");
            my.sprite.lifeCounter.add(lifeChip);
        }
        my.sprite.lifeCounter.scaleXY(-0.5, -0.5);
        this.pause = false;
    }

    // Helper for getting the value of the deck
    deckSum(){
        let total = 0;
        for (let card of this.deck.getChildren()){
            total += card.value;
        }
        return total;
    }

    // Collision check function
    collides (a, b){
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    gameOver(){
        this.gameOverText.visible = true;
        this.yourScoreText.updateText();
        this.yourScoreText.visible = true;
        this.restartText.visible = true;
        this.buttonRestart.setPosition(300, 500);
        this.buttonRestart.setInteractive();
    }

    makeActive(card) {
        card.active = true;

        // Snapshot coords for return
        card.tempX = card.x;
        card.tempY = card.y;

        // Determine flight path
        if (card.value <= 5){
            if (card.x > 400){
                card.points = [
                    card.x, card.y,
                    card.x - 150, 250,
                    400, 460,
                    400, 700
                ];
            }
            else {
                card.points = [
                    card.x, card.y,
                    card.x + 150, 250,
                    400, 460,
                    400, 700
                ];
            }
        }
        else if (card.value <= 9){
            card.points = [
                card.x, card.y,
                card.x + 120, 75,
                card.x + 120, 150,
                card.x, 225,
                card.x - 120, 300,
                card.x - 120, 375,
                card.x, 450,
                card.x + 120, 525,
                card.x + 120, 700
            ];
        }
        else {
            if (card.x > 400){
                card.points = [
                    card.x, card.y,
                    card.x - 150, 100,
                    card.x, 250,
                    750, 550,
                    750, 700
                ];
            }
            else {
                card.points = [
                    card.x, card.y,
                    card.x + 150, 100,
                    card.x, 250,
                    150, 550,
                    150, 700
                ];
            }
        }
        this.curve = new Phaser.Curves.Spline(card.points);

        // Follow path
        let movingCard = this.add.follower(this.curve, 10, 10, card);
        movingCard.startFollow(this.config);
    }
}