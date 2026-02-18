let predictionsToday = Math.floor(Math.random() * 50000) + 50000;
let attempts = 0;
let bestProbability = 0;
let username = "Anonymous";

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("counter").innerText =
        predictionsToday.toLocaleString();

    // Load saved username
    const savedName = localStorage.getItem("username");
    if (savedName) {
        username = savedName;
    }

    document.getElementById("username").value = username;
    document.getElementById("userDisplay").innerText = username;

    // Auto-save username when typing
    document.getElementById("username").addEventListener("input", (e) => {
        username = e.target.value || "Anonymous";
        localStorage.setItem("username", username);
        document.getElementById("userDisplay").innerText = username;
    });

    updateLeaderboard();
    updateTitle();

    document.getElementById("calcBtn")
        .addEventListener("click", calculate);

    startMoney();
});

function calculate() {

    attempts++;
    document.getElementById("attempts").innerText = attempts;

    saveScore();
    updateTitle();

    animateProgress(() => {
        generateResult();
    });
}

function animateProgress(callback) {

    const progress = document.getElementById("progress");
    const loadingText = document.getElementById("loadingText");

    loadingText.innerText = "Analyzing financial destiny...";
    let width = 0;

    const interval = setInterval(() => {
        width += 5;
        progress.style.width = width + "%";

        if (width >= 100) {
            clearInterval(interval);
            progress.style.width = "0%";
            loadingText.innerText = "";
            callback();
        }
    }, 40);
}

function generateResult() {

    const result = document.getElementById("result");
    const extraButtons = document.getElementById("extraButtons");

    let probability = Math.floor(Math.random() * 100) + attempts;

    if (probability > bestProbability) {
        bestProbability = probability;
        localStorage.setItem("bestProbability", bestProbability);
        document.getElementById("bestProb").innerText = bestProbability + "%";
    }

    if (Math.random() < 0.05) {

        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
        });

        document.getElementById("rareSound")
            .play().catch(() => { });

        result.innerHTML =
            `🚨 RARE RESULT 🚨<br>${username}, you'll be rich NEXT YEAR!`;

    } else {

        const years = Math.floor(Math.random() * 20) + 1;

        result.innerHTML =
            `${username}, you'll be rich in ${years} years.<br>
      Success probability: ${probability}%`;
    }

    extraButtons.innerHTML = `
    <button onclick="calculate()">Try Again</button>
    <button onclick="shareResult()">Share Result</button>
  `;
}

function shareResult() {
    const text =
        `My best wealth probability is ${bestProbability}% 😤`;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
}

function updateTitle() {

    let title = "Beginner Investor";
    if (attempts > 5) title = "Curious Hustler";
    if (attempts > 15) title = "Market Grinder";
    if (attempts > 30) title = "Wealth Addict";
    if (attempts > 50) title = "Financial Overlord";

    document.getElementById("title").innerText = title;
}

function saveScore() {

    let leaderboard =
        JSON.parse(localStorage.getItem("leaderboard")) || [];

    const existing = leaderboard.find(user => user.name === username);

    if (existing) {
        existing.attempts = attempts;
    } else {
        leaderboard.push({ name: username, attempts: attempts });
    }

    leaderboard.sort((a, b) => b.attempts - a.attempts);
    leaderboard = leaderboard.slice(0, 100);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    updateLeaderboard();
}

function updateLeaderboard() {

    const leaderboardList =
        document.getElementById("attemptLeaderboard");

    leaderboardList.innerHTML = "";

    let leaderboard =
        JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} — ${user.attempts} attempts`;
        leaderboardList.appendChild(li);
    });
}

/* Floating money */
function startMoney() {
    setInterval(() => {
        const container = document.getElementById("moneyBackground");
        const money = document.createElement("div");
        money.classList.add("money");
        money.innerText = "💵";
        money.style.left = Math.random() * 100 + "vw";
        money.style.animationDuration =
            (Math.random() * 6 + 6) + "s";
        money.style.fontSize =
            (Math.random() * 20 + 20) + "px";
        container.appendChild(money);
        setTimeout(() => money.remove(), 12000);
    }, 900);
}
