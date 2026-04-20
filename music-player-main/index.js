const audioPlayer = document.getElementById('audioPlayer');

const musicCards = document.querySelectorAll('.music');

const playPauseBtn = document.getElementById('playPauseBtn');

musicCards.forEach(card => {
    card.addEventListener('click', () => {
        const musicSource = card.getAttribute('data-src');
        if (musicSource) {
            audioPlayer.src = musicSource;
            audioPlayer.play();
            playPauseBtn.textContent = "⏸";
        // remove destaque anterior
            musicCards.forEach(item => {
                item.classList.remove('active');
            });
            card.classList.add('active'); // adiciona destaque atual
        }
    });
});

// BOTÃO PLAY / PAUSE
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = "⏸";
    } 
    else {
        audioPlayer.pause();
        playPauseBtn.textContent = "▶";
    }
});

// BARRA DE PROGRESSO
const progressBar = document.getElementById('progressBar');
const currentTimeText = document.getElementById('currentTime');
const durationText = document.getElementById('duration');
audioPlayer.addEventListener('timeupdate', () => { // atualizar tempo enquanto toca
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    if (duration) {
        progressBar.value = 
            (currentTime / duration) * 100;
        currentTimeText.textContent = 
            formatTime(currentTime);
        durationText.textContent = 
            formatTime(duration);
    }
});

progressBar.addEventListener('input', () => { // mudar posicao da musica
    const duration = audioPlayer.duration;
    if (duration) {
        audioPlayer.currentTime = 
            (progressBar.value / 100) * duration;
    }
});

function formatTime(seconds){ // funcao formatar tempo
    const minutes = 
        Math.floor(seconds / 60);
    const secs = 
        Math.floor(seconds % 60);
    return `${minutes}:${secs
        .toString()
        .padStart(2,'0')}`;
}