<template>
  <div id="audio-player-container">
  <audio src="https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3" preload="metadata" loop></audio>
  <p>audio player ish</p>
  <button id="play-icon"></button>
  <span id="current-time" class="time">0:00</span>
  <input type="range" id="seek-slider" max="100" value="0">
  <span id="duration" class="time">0:00</span>
  <output id="volume-output">100</output>
  <input type="range" id="volume-slider" max="100" value="100">
  <button id="mute-icon"></button>
</div>
</template>

<script>
import lottieWeb from 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.7.13/lottie.min.js';

const playIconContainer = document.getElementById('play-icon');
const audioPlayerContainer = document.getElementById('audio-player-container');
const seekSlider = document.getElementById('seek-slider');
const volumeSlider = document.getElementById('volume-slider');
const muteIconContainer = document.getElementById('mute-icon');
let playState = 'play';
let muteState = 'unmute';

const playAnimation = lottieWeb.loadAnimation({
  container: playIconContainer,
  path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: "Play Animation",
});

const muteAnimation = lottieWeb.loadAnimation({
    container: muteIconContainer,
    path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: "Mute Animation",
});

playAnimation.goToAndStop(14, true);

playIconContainer.addEventListener('click', () => {
    if(playState === 'play') {
        audio.play();
        playAnimation.playSegments([14, 27], true);
        requestAnimationFrame(whilePlaying);
        playState = 'pause';
    } else {
        audio.pause();
        playAnimation.playSegments([0, 14], true);
        cancelAnimationFrame(raf);
        playState = 'play';
    }
});

muteIconContainer.addEventListener('click', () => {
    if(muteState === 'unmute') {
        muteAnimation.playSegments([0, 15], true);
        audio.muted = true;
        muteState = 'mute';
    } else {
        muteAnimation.playSegments([15, 25], true);
        audio.muted = false;
        muteState = 'unmute';
    }
});

const showRangeProgress = (rangeInput) => {
    if(rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
}

seekSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});
volumeSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});

export default {
  name: 'RangeSlider'
}
</script>

<style>
body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  letter-spacing: -0.5px;
}
button {
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    outline: none;
    width: 40px;
    height: 40px;
    float: left;
}
#audio-player-container {
  --seek-before-width: 0%;
    --volume-before-width: 100%;
    --buffered-width: 0%;
    position: relative;
    margin: 100px 2.5% auto 2.5%;
    width: 95%;
    max-width: 500px;
    height: 132px;
    background: #fff;
}
#audio-player-container::before {
    position: absolute;
    content: '';
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    left: -2px;
    top: -2px;
    background: linear-gradient(to left, #007db5, #ff8a00);
    z-index: -1;
}
p {
    position: absolute;
    top: -18px;
    right: 5%;
    padding: 0 5px;
    margin: 0;
    font-size: 28px;
    background: #fff;
}
#play-icon {
    margin: 20px 2.5% 10px 2.5%;
}
path {
    stroke: #007db5;
}
.time {
    display: inline-block;
    width: 37px;
    text-align: center;
    font-size: 20px;
    margin: 28.5px 0 18.5px 0;
    float: left;
}
output {
    display: inline-block;
    width: 32px;
    text-align: center;
    font-size: 20px;
    margin: 10px 2.5% 0 5%;
    float: left;
    clear: left;
}
#volume-slider {
    margin: 10px 2.5%;
    width: 58%;
}
#volume-slider::-webkit-slider-runnable-track {
    background: rgba(0, 125, 181, 0.6);
}
#volume-slider::-moz-range-track {
    background: rgba(0, 125, 181, 0.6);
}
#volume-slider::-ms-fill-upper {
    background: rgba(0, 125, 181, 0.6);
}
#volume-slider::before {
    width: var(--volume-before-width);
}
#mute-icon {
    margin: 0 2.5%;
}
input[type="range"] {
    position: relative;
    -webkit-appearance: none;
    width: 48%;
    margin: 0;
    padding: 0;
    height: 19px;
    margin: 30px 2.5% 20px 2.5%;
    float: left;
    outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: linear-gradient(to right, rgba(0, 125, 181, 0.6) var(--buffered-width), rgba(0, 125, 181, 0.2) var(--buffered-width));
}
input[type="range"]::before {
    position: absolute;
    content: "";
    top: 8px;
    left: 0;
    width: var(--seek-before-width);
    height: 3px;
    background-color: #007db5;
    cursor: pointer;
}
input[type="range"]::-webkit-slider-thumb {
    position: relative;
    -webkit-appearance: none;
    box-sizing: content-box;
    border: 1px solid #007db5;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    margin: -7px 0 0 0;
}
input[type="range"]:active::-webkit-slider-thumb {
    transform: scale(1.2);
    background: #007db5;
}
input[type="range"]::-moz-range-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: linear-gradient(to right, rgba(0, 125, 181, 0.6) var(--buffered-width), rgba(0, 125, 181, 0.2) var(--buffered-width));
}
input[type="range"]::-moz-range-progress {
    background-color: #007db5;
}
input[type="range"]::-moz-focus-outer {
    border: 0;
}
input[type="range"]::-moz-range-thumb {
    box-sizing: content-box;
    border: 1px solid #007db5;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
}
input[type="range"]:active::-moz-range-thumb {
    transform: scale(1.2);
    background: #007db5;
}
input[type="range"]::-ms-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: transparent;
    border: solid transparent;
    color: transparent;
}
input[type="range"]::-ms-fill-lower {
    background-color: #007db5;
}
input[type="range"]::-ms-fill-upper {
    background: linear-gradient(to right, rgba(0, 125, 181, 0.6) var(--buffered-width), rgba(0, 125, 181, 0.2) var(--buffered-width));
}
input[type="range"]::-ms-thumb {
    box-sizing: content-box;
    border: 1px solid #007db5;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
}
input[type="range"]:active::-ms-thumb {
    transform: scale(1.2);
    background: #007db5;
}
</style>