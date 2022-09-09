
// const User=require('.../models/user.js')
score = 0;
cross = true;

//  const gameuser=User.find({username:req.body.username});

document.onkeydown = function (e) {
    if (e.keyCode == 38) {
        console.log("Key code is: ", e.keyCode)
        avatar = document.querySelector('.avatar');
        avatar.classList.add('animateAvatar');
        setTimeout(() => {
            avatar.classList.remove('animateAvatar')
        }, 700);
    }
    if (e.keyCode == 39) {
        avatar = document.querySelector('.avatar');
        avatarX = parseInt(window.getComputedStyle(avatar, null).getPropertyValue('left'));
        avatar.style.left = avatarX + 112 + "px";
    }
    if (e.keyCode == 37) {
        avatar = document.querySelector('.avatar');
        avatarX = parseInt(window.getComputedStyle(avatar, null).getPropertyValue('left'));
        avatar.style.left = (avatarX - 112) + "px";
    }
}

setInterval(() => {
    avatar = document.querySelector('.avatar');
    gameOver = document.querySelector('.gameOver');
    enemy = document.querySelector('.enemy');
   
    dx = parseInt(window.getComputedStyle(avatar, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(avatar, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(enemy, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            enemy.style.animationDuration = newDur + 's';
            
        }, 500);

    }
    else if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Press Enter to Play Again"
        enemy.classList.remove('enemyAni')   
        if (window.localStorage.getItem("highScore")<score){
            window.localStorage.setItem("highScore", score);
            gameOver.innerHTML = "Congrats you have achieved your highest Score.Game Over - Press Enter to Play Again"
        }
        else {
            gameOver.innerHTML = "Game Over - Press Enter to Play Again"
        }
        console.log(score)
         console.log(window.localStorage.getItem("highScore"))
        document.onkeydown = function(e){
            if(e.keyCode==13){
                location.reload()
            }
        }
    }
    // else 

}, 10);


function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}

