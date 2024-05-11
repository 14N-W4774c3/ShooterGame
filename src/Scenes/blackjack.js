class Blackjack extends Phaser.Scene {

    // Config for enemy movement
    config = {
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

    constructor () {
        super ("Blackjack");

        // Sprite Holder
        this.my = {sprite: {}};

        //Spawn Point
        this.playerX = 300;
        this.playerY = 450;

        this.moveSpeed = 10;
        this.shotSpeed = 5;
        this.deck = [];
        this.deckMovement = "right";
        this.activeCards = 0;
        this.activeCardsSet = [];

        // Movement polling input
        this.aKey = null;
        this.dKey = null;

        // Projectile input
        this.spaceKey = null;
        this.cooldown = 0;
        this.bulletCooldown = 0;

        // Projectile holder
        this.my.sprite.bullet = [];
        this.my.sprite.enemyBullet = [];
        this.maxBullets = 3;
        this.maxEnemyBullets = 25;

        // Play Hand input
        this.wKey = null;

        // Score Variables
        this.score = 200;
        //this.scoreMult = 1;
    }
    preload () {
        this.load.setPath("./assets/");
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
        
        this.load.image("player", "player.png");
        this.load.image("enemyShot", "pieceBlue_single09.png");
        this.load.image("projectile", "pieceYellow_single10.png");
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
        // Shuffle sound
        //this.load.audio("shuffleDeck", "cardFan2.ogg");
    }
    create () {
        let my = this.my;

        // Sprite Creation
        //my.sprite.player = this.add.sprite(this.playerX, this.playerY, "player");
        for (let i = 0; i < this.maxBullets; i++){
            my.sprite.projectile = this.add.sprite(-100, -100, "projectile");
            my.sprite.projectile.setScale(0.40);
            my.sprite.bullet.push(my.sprite.projectile);
            my.sprite.bullet[i].visible = false;
        }
        for (let i = 0; i < this.maxEnemyBullets; i++){
            my.sprite.enemyBullet.push(this.add.sprite(-100, -100, "enemyShot"));
            my.sprite.enemyBullet[i].visible = false;
        }

        // Enemy creation
        //my.sprite.enemy = this.add.sprite(this.playerX, this.playerY - 300, "SpadesA");
        //my.sprite.enemy = new Card(this, this.playerX, this.playerY-300, "cards", 11, "cardSpadesA.png", config);
        //this.deck = this.createDeck();
        //my.sprite.enemy.setScale(0.25);

        this.high = this.add.group({key: 'SpadesA', frame: 0, repeat: 12, setXY: {x: 160, y: 100, stepX: 40}});
        this.high.scaleXY(-0.75, -0.75);
        this.mid = this.add.group({key: 'Hearts7', frame: 0, repeat: 12, setXY: {x: 160, y: 150, stepX: 40}});
        this.mid.scaleXY(-0.75, -0.75);
        this.low = this.add.group({key: 'Clubs3', frame: 0, repeat: 12, setXY: {x: 160, y: 200, stepX: 40}});
        this.low.scaleXY(-0.75, -0.75);
        this.testGroup = this.add.group({classType: 'Card'});
        this.testGroup.createMultiple(13);


        // Movement Key Objects
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Projectile
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        /*
        // Play Hand
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        */

        my.sprite.player = new Player(this, game.config.width/2, game.config.height - 75, "player", null, this.aKey, this.dKey, this.moveSpeed);
        my.sprite.player.setScale(2.00);
    }
    update () {
        let my = this.my;
        this.bulletCooldown--;

        // Collision checks
        // check if card collides with player
        for (let card of this.activeCardsSet){
            if (this.collides(card, my.sprite.player)){
                card.colliding = true;
                player.addCard(card);
            }
        }

        // check if enemy shots collide with player
        for (let shot of my.sprite.enemyBullet){
            if (this.collides(shot, my.sprite.player)){
                shot.visible = false;
                my.sprite.player.lives --;  // TEMP LINE
                // MODIFY SCORE VARIABLES
                // this.scoreMult++;
            }
        }

        // check if player shot collides with card
        //for (shot in my.sprite.bullet){
            //
        //}

        /*  REENABLE ONCE GAME IS COMPLETED
        // End condition check 
        //check if player busted
        if (my.sprite.player.checkHand() > 21){
            my.sprite.player.lives --;
            my.sprite.player.resetHand();
        }
        //check if player score < 0
        if (this.score < 0){
            my.sprite.player.lives --;
            this.score = 200;
        }
        //check if player is out of lives
        if (my.sprite.player.lives == 0){
            this.gameOver();
        }
        //check if deck is out of cards
        if (this.deckSum(this.deck) < 16){
            this.endLevel();
        }
        */

        // Group movement


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

        // Enemy shots
        this.cooldown += 1;
        if (this.cooldown % 7){
            if (this.activeCards < this.maxActive){
                for (let card of this.deck){
                    if (!card.active){
                        if (Math.floor(Math.random()*13) > 10){
                            card.makeActive();
                            this.activeCards++;
                            this.activeCardsSet.push(card);
                            if (this.activeCards == this.maxActive){
                                break;
                            }
                        }
                    }
                }
            }
        }
        if (this.cooldown % 5){
            if (this.activeBullets < this.maxEnemyBullets){
                for (let card of this.deck){
                    if (!card.active){
                        if (Math.floor(Math.random()*3) == 3){
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

        /*  REENABLE ONCE GAME IS COMPLETE
        // Playing Hands
        if (Phaser.Input.Keyboard.JustDown(this.wKey)){
            this.handValue = my.sprite.player.checkHand();
            if (handValue < 16){
                //lose score = (16 - handValue)*100*hits
                this.score += (16 - this.handValue) * 100 * this.scoreMult;
            }
            else if (this.handValue <= 21){
                //gain score = handValue*100*hits
                this.score += this.handValue * 100 * this.scoreMult;
            }
            this.scoreMult = 1;
            my.sprite.player.resetHand();
            return;
        }
        */

        // Player Update
        my.sprite.player.update();
    }

    // Function for creating the deck
    createDeck () {
        this.suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
        this.values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        this.deck = [];
        this.deck.x = 0;
        this.deck.y = 0;
        this.incrementer = 0;
        this.mult = 36;
        this.multY = 48;
        for (let suit of this.suits){
            for (let value of this.values){
                this.texture = suit + value;
                if (value == "A"){
                    value = 11;
                }
                if (value == "J" || value == "Q" || value == "K"){
                    value = 10;
                }
                my.sprite.card = new Card (this, this.deck.x + (this.mult * this.incrementer % 13), this.deck.y + (this.multY * this.incrementer / 13), this.texture, value, null, config);
                this.incrementer += 1;
                my.sprite.card.setScale(0.25);
                this.deck.push(my.sprite.card);
            }
        }
        this.incrementer = 0;
        this.deck = this.shuffleDeck(this.deck);
        return this.deck;
    }

    // Function for shuffling the deck
    shuffleDeck(deck){
        for (let i = 0; i < deck.length; i++){
            let shuffle = Math.floor(Math.random()*(deck.length));
            [deck[i].x, deck[shuffle].x] = [deck[shuffle].x, deck[i].x];
            [deck[i].y, deck[shuffle].y] = [deck[shuffle].y, deck[i].y];
        }
        return deck;
    }

    // Collision check function
    collides (a, b){
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    // Function for counting value of remaining deck
    deckSum (deck){
        this.totalValue = 0;
        for (card in deck){
            this.totalValue += card.value;
        }
        return this.totalValue;
    }

    endLevel(){
        this.scene.restart();
    }

    gameOver(){
        this.scene.restart();
    }
}