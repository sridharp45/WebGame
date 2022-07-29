score = 0;
cross = true;
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if(document.getElementById('start-screen').textContent != "Game Over - Reload to Play Again"){
    document.getElementById("start-screen").style.visibility = "hidden";
    document.querySelector('.bg').classList.add('bgani');
    document.querySelector('.enemy').classList.add('enemyani');
    // document.querySelector('.enemy').classList.add('dragonrun');
    document.querySelector('.avatar').classList.add('runani');
  }
    if ((e.keyCode == 38 || e.keyCode == 32) && document.getElementById('start-screen').textContent != "Game Over - Reload to Play Again") {
        character = document.querySelector('.avatar');
        character.classList.remove('runani');
        character.classList.add('avatarani');
        setTimeout(() => {
            character.classList.remove('avatarani');
            character.classList.add('runani');
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
    startscreen = document.getElementById('start-screen');
    enemy = document.querySelector('.enemy');

    dx = parseInt(window.getComputedStyle(avatar, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(avatar, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 63 && offsetY < 52) {
        startscreen.textContent = "Game Over - Reload to Play Again"
        startscreen.style.visibility = "visible";
        enemy.classList.remove('enemyani');
        document.querySelector('.bg').classList.remove('bgani');
        avatar.classList.remove('runani');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
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

}, 10);

function updateScore(score) {
    document.querySelector('.score').textContent = "Your Score: " + score
}
