let score = 0;
let timeLeft = 60;

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

function createGarbage() {
    const garbage = document.createElement("div");

    garbage.classList.add("garbage");

    const garbageIcons = ["🗑️", "🥫", "🍾", "📦", "🧃"];
    garbage.textContent =
        garbageIcons[Math.floor(Math.random() * garbageIcons.length)];

    garbage.style.left =
        Math.random() * (window.innerWidth - 50) + "px";

    garbage.style.top =
        Math.random() * (window.innerHeight - 50) + "px";

    garbage.addEventListener("mouseenter", () => {
        if (timeLeft <= 0) return;

        score++;
        scoreDisplay.textContent = `Collected: ${score}`;

        garbage.remove();
        createGarbage();
    });

    document.body.appendChild(garbage);
}

// Spawn garbage
for (let i = 0; i < 15; i++) {
    createGarbage();
}

// Timer
const timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
        clearInterval(timer);

        document.querySelectorAll(".garbage").forEach(g => g.remove());

        alert(`Game Over!\nYou collected ${score} pieces of garbage.`);
    }
}, 1000);