//LOGIC OF IF KEY IS PRESSED THEN WHAT ALL WILL HAPPEN

score = 0;
cross = true;

audio = new Audio('backmusic.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1);


document.onkeydown = function(e){                   /*onkeydown is an event which tells us that on pressing this key it will perform the action that is written within the function*/
    console.log("Key code is : ", e.keyCode);               //in this  function keycode is used to make the rabbit jump when the key code of any key pressed is 38, if any other key is pressed the rabbit won't jump as the keycode doesnt match and if key of keycode 38 is  pressed the rabbit will jump
    if(e.keyCode == 38){
        rabbit = document.querySelector(".rabbit");         // it is used to get the first rabbit class elements from the "css" file
        rabbit.classList.add('animateRabbit');              // now add a class to animate the rabbit called animateRabbit 
        setTimeout(() => {                                  // we want the rabbit to jump using arrow key and then come down to the ground as well so we use setTime out so that the rabbit can jump for a few seconds and come back  to its original position i.e.on the ground
            rabbit.classList.remove('animateRabbit');       //we want the class to run for 700 milisecond and then stop running so the rabbit can come back to the ground and later on when some other obstacle comes the class can be run again.
        }, 700);
    }
    if(e.keyCode==39){
        rabbit = document.querySelector(".rabbit");         
        rabbitX = parseInt(window.getComputedStyle(rabbit, null).getPropertyValue('left'));              
        rabbit.style.left = rabbitX + 112 + "px";
    }
    if(e.keyCode==37){
        rabbit = document.querySelector(".rabbit");         
        rabbitX = parseInt(window.getComputedStyle(rabbit, null).getPropertyValue('left'));              
        rabbit.style.left = (rabbitX - 112) + "px";
    }

}

//setinterval is used to do a work or action repeatedly after some time interval
setInterval(() => {             //it will check if the rabbit and obstacles are being clashed into each other or not
    rabbit = document.querySelector('.rabbit');         // we just selected the rabbit
    gameOver = document.querySelector('.gameOver');     
    obstacle = document.querySelector('.obstacle');     // used to delect the obstacle

    rx = parseInt(window.getComputedStyle(rabbit, null).getPropertyValue('left'));        // this will give the computed left value of rabbit (getComputeredStyle - is a method used to get the value of rabbit( rx  -- x of rabbit))
    ry = parseInt(window.getComputedStyle(rabbit, null).getPropertyValue('top'));  

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left')); 
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));   

    offsetX = Math.abs(rx-ox);
    offsetY = Math.abs(ry-oy);
    //console.log(offsetX, offsetY)

    if(offsetX < 113 && offsetY < 52){
        gameOver.innerHTML = "Game Over - Reload to start over"
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1);
    }
    else if(offsetX < 145 && cross){
        score+=100;
        updateScore(score);
        cross = false;          // if cross is true then the score will icrease or else gameover
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;          //Dur - duration
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);
    }

}, 100)

function updateScore(score){
    scoreCont.innerHTML = "Your Score: " + score;
}

const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener('click', () =>{
    gameOver.innerHTML = `
     <div class = "result">
        <button class = "reload-button" onclick="location.reload()">Replay🔄</button>
    </div>
`;
});