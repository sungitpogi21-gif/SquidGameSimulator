// Simple state manager for choices and score
let gameState = JSON.parse(localStorage.getItem('squidState')) || { score: 50, deaths: 0, alliances: [] };

function updateScore(delta) {
    gameState.score = Math.max(0, Math.min(100, gameState.score + delta));
    document.getElementById('scoreValue').textContent = gameState.score;
    localStorage.setItem('squidState', JSON.stringify(gameState));
}

function showScene(sceneId) {
    document.querySelectorAll('.scene').forEach(s => s.classList.add('hidden'));
    document.getElementById(sceneId).classList.remove('hidden');
}

function handleChoice(choice, delta, nextScene, flag = '') {
    const outcome = document.getElementById('outcome');
    outcome.innerHTML = `<p>${flag ? '[Hypothetical] ' : ''}You chose: ${choice}. Score ${delta > 0 ? '+' : ''}${delta}.</p>`;
    updateScore(delta);
    gameState.alliances.push(choice);
    setTimeout(() => showScene(nextScene), 2000);
    if (gameState.score < 20) { endGame('Greed consumes you. Game over.'); }
    if (gameState.score > 80) { endGame('Humanity prevails. A new path opens.'); }
}

function endGame(message) {
    alert(message + '\nFinal Score: ' + gameState.score);
    // Reset for replay
    localStorage.removeItem('squidState');
    window.location.href = 'index.html';
}

// Init score on load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('scoreValue')) updateScore(0);
});