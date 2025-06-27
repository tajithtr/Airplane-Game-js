const moveSpeed = 3, gravity = 0.5;
const plane = document.querySelector('.plane');
const img = document.getElementById('airplane');

let planeProps = plane.getBoundingClientRect();
const background = document.querySelector('.game-background').getBoundingClientRect();
const scoreValue = document.querySelector('.score-value');
const message = document.querySelector('.start-message');
const scoreTitle = document.querySelector('.score-title');

let gameState = 'Start';
img.style.display = 'none';
message.classList.add('message-style');

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && gameState !== 'play') {
        document.querySelectorAll('.obstacle').forEach((e) => e.remove());
        img.style.display = 'block';
        plane.style.top = '40vh';
        gameState = 'play';
        message.innerHTML = '';
        scoreTitle.innerHTML = 'Score: ';
        scoreValue.innerHTML = '0';
        message.classList.remove('message-style');
        startGame();
    }
});

function startGame() {
    function moveObstacles() {
        if (gameState !== 'play') return;
        const obstacles = document.querySelectorAll('.obstacle');
        obstacles.forEach((obstacle) => {
            const obstacleProps = obstacle.getBoundingClientRect();
            planeProps = plane.getBoundingClientRect();

            if (obstacleProps.right <= 0) {
                obstacle.remove();
            } else {
                if (planeProps.left < obstacleProps.left + obstacleProps.width &&
                    planeProps.left + planeProps.width > obstacleProps.left &&
                    planeProps.top < obstacleProps.top + obstacleProps.height &&
                    planeProps.top + planeProps.height > obstacleProps.top) {
                    gameState = 'End';
                    message.innerHTML ='<b>Game Over</b>'.fontcolor('blue') + '<br><br><b>Restart The Page To Play Again</b>';
                    message.classList.add('message-style');
                    img.style.display = 'none';
                    return;
                } else {
                    if (obstacleProps.right < planeProps.left &&
                        obstacleProps.right + moveSpeed >= planeProps.left &&
                        obstacle.increase_score === '1') {
                        scoreValue.innerHTML = +scoreValue.innerHTML + 1;
                        obstacle.increase_score = '0';
                    }
                    obstacle.style.left = obstacleProps.left - moveSpeed + 'px';
                }
            }
        });
        requestAnimationFrame(moveObstacles);
    }
    requestAnimationFrame(moveObstacles);

    let planeDy = 0;

    function applyGravity() {
        if (gameState !== 'play') return;
        planeDy += gravity;
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                img.src = 'images/Airplane.png';
                planeDy = -7.6;
            }
        });
        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp') {
                img.src = 'images/Airplane.png';
            }
        });
        if (planeProps.top <= 0 || planeProps.bottom >= background.bottom) {
            gameState = 'End';
            message.innerHTML = '<b>Game Over</b>'.fontcolor('blue') + '<br><br><b>Restart The Page To Play Again</b>';
            message.classList.add('message-style');
            img.style.display = 'none';
            return;
        }
        plane.style.top = planeProps.top + planeDy + 'px';
        planeProps = plane.getBoundingClientRect();
        requestAnimationFrame(applyGravity);
    }
    requestAnimationFrame(applyGravity);

    let obstacleSeparation = 0;
    const obstacleGap = 30;

    function createObstacles() {
        if (gameState !== 'play') return;

        if (obstacleSeparation > 115) {
            obstacleSeparation = 0;
            const obstaclePosition = Math.floor(Math.random() * 45) + 10;

            const upperObstacle = document.createElement('div');
            upperObstacle.className = 'obstacle';
            upperObstacle.style.top = obstaclePosition - 70 + 'vh';
            upperObstacle.style.left = '100vw';
            document.body.appendChild(upperObstacle);

            const lowerObstacle = document.createElement('div');
            lowerObstacle.className = 'obstacle';
            lowerObstacle.style.top = obstaclePosition + obstacleGap + 'vh';
            lowerObstacle.style.left = '100vw';
            lowerObstacle.increase_score = '1';
            document.body.appendChild(lowerObstacle);
        }
        obstacleSeparation++;
        requestAnimationFrame(createObstacles);
    }
    requestAnimationFrame(createObstacles);
}
