Future projects will be the absolute minimum, as I clearly don't have the skill to manage to implement any flourishes whatsoever within the duration provided.

Difficulty: 7/10
Time Spent: 12-16 hrs

There were notes here about cutting content.  Then I reviewed the project requirements and found that no, the minimum is set to the initial design, so cutting anything from that loses points.

Final Note: Turns out that my enemy class flat out does not work.  Turning this in now in order to have more time to work on the Platformer.  Plus side, collision works (as tested with the projectiles), as does the basics of scoring (in the sense that the displayed text and underlying variables change), so I should be able to manage the Platformer with less dificulty.

What does work:
-Movement
-Firing (technically, both player and enemy)
-Projectile collision (player only)
-Playing hands (technically, but you can't get cards in your hand, so it's moot)

What does not work:
-Enemies do not spawn properly
-Something follows a path, but it doesn't really exist or work properly
-As a result, scoring cannot function

Controls:
A and D - Left and right motion
Space to shoot
W - play hand

Hitting cards with your shots (yellow) and being hit by cards will add them to your hand.  Getting hit by their shots (blue) will increase your multiplier.
Play winning blackjack hands (value > 16) to score points equal to the value of the hand times 100 times the multiplier.
Playing hands with a value less than 16 will cause you to lose points equal to what you would have earned, so be careful!
Busting (hand value > 21) or running out of score will cause you to lose a life (red).
Level ends when winning hands can no longer be made.