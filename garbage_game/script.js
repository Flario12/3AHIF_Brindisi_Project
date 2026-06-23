let score = 0;
const startTime = 30;
let timeLeft = startTime;
let bottomLimit = -20;
let upperLimit = 50;
let spawnIntervalTime = 450; 
let spawnInterval;

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const garbageImages = 
[
    "images/garbage1.png",
    "images/garbage2.png"
];

let gameRunning = true;



function OneGarbage (){

    const garbage = document.createElement("img");

    garbage.classList.add("garbage");
    garbage.style.width = "120px";
    garbage.style.height = "120px";

    // Takes a random image from the garbageImages array
    garbage.src = garbageImages[
        Math.floor(Math.random() * garbageImages.length)
    ];

    garbage.style.left =
        Math.random() * (window.innerWidth - 150) + "px";

    garbage.style.top =
        Math.random() * (window.innerHeight - 150) + "px";
            
    document.body.appendChild(garbage);


    const penaltyTimer = setTimeout(() => {
        if (garbage.parentNode) {
           score -= 3;
            scoreDisplay.textContent = `Collected: ${score}`;
            garbage.remove();
        }}, 2000); 
    

        checkScore();
   


    garbage.addEventListener("mouseenter", () => {
        if (timeLeft <= 0) return;
        clearTimeout(penaltyTimer);

        score += 2;
        scoreDisplay.textContent = `Collected: ${score}`;

        garbage.remove();
        //createGarbage();
    });
}



// Function to start the spawn interval with a given time
function startSpawnInterval(ms) {
    clearInterval(spawnInterval);
    spawnInterval = setInterval(() => {
        if (gameRunning) {
            createGarbage();
        }
    }, ms);
}



function createGarbage() {
    let n = 1;
    scoreDisplay.textContent = `Collected: ${score}`;

    if (timeLeft <= startTime / 2) {
        n = 2;
        
        if (spawnIntervalTime !== 1200) {
            spawnIntervalTime = 650;
            startSpawnInterval(spawnIntervalTime);
        }
    }

    for (let i = 0; i < n; i++) {
        OneGarbage();
    }
}



function endGame(message) {
    gameRunning = false;
    clearInterval(timer);
    clearInterval(spawnInterval);

    document.querySelectorAll(".garbage").forEach(g => g.remove());

    alert(message);
}



function checkScore() {
     if (score <= bottomLimit) {
        endGame("Game Over! You collected too much garbage.");
        
    } else if (score >= upperLimit) {
        endGame("Congratulations! You collected enough garbage to win!");
        
    }
}



// Spawn garbage
spawnInterval = setInterval(() => {
    if (gameRunning) {
        createGarbage();
    }
}, spawnIntervalTime);
    


// Timer
const timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
        endGame("Time's up! Game Over!");
    }
}, 1000);