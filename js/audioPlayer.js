// Custom Audio Player for Name Pronunciation
document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('name-audio');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.querySelector('.progress-fill');
    const currentTimeDisplay = document.querySelector('.current-time');
    const durationDisplay = document.querySelector('.duration');
    const speedBtn = document.querySelector('.speed-btn');
    const speedText = document.querySelector('.speed-text');

    if (!audioPlayer) return; // Exit if audio player not found

    const speeds = [0.75, 1, 1.25, 1.5];
    let currentSpeedIndex = 1; // Start at 1x speed

    // Format time as MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Update progress bar and time display
    function updateProgress() {
        if (audioPlayer.duration) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressFill.style.width = `${progress}%`;
            currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        }
    }

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    });

    // Update play/pause button state
    audioPlayer.addEventListener('play', function () {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        playPauseBtn.setAttribute('aria-label', 'Pause pronunciation');
    });

    audioPlayer.addEventListener('pause', function () {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        playPauseBtn.setAttribute('aria-label', 'Play pronunciation');
    });

    // Update duration when metadata loads
    audioPlayer.addEventListener('loadedmetadata', function () {
        durationDisplay.textContent = formatTime(audioPlayer.duration);
    });

    // Update progress during playback
    audioPlayer.addEventListener('timeupdate', updateProgress);

    // Click to seek in progress bar
    progressBar.addEventListener('click', function (e) {
        if (audioPlayer.duration) {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const newTime = (clickX / width) * audioPlayer.duration;
            audioPlayer.currentTime = newTime;
        }
    });

    // Speed control
    speedBtn.addEventListener('click', function () {
        currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
        const newSpeed = speeds[currentSpeedIndex];
        audioPlayer.playbackRate = newSpeed;
        speedText.textContent = `${newSpeed}x`;
    });

    // Reset when audio ends
    audioPlayer.addEventListener('ended', function () {
        progressFill.style.width = '0%';
        currentTimeDisplay.textContent = '0:00';
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        playPauseBtn.setAttribute('aria-label', 'Play pronunciation');
    });

    // Initialize displays
    currentTimeDisplay.textContent = '0:00';
    durationDisplay.textContent = '0:00';
    speedText.textContent = '1x';
});