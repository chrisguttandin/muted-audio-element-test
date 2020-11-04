const audioContext = new AudioContext();
const $audio = document.getElementById('audio');
const $toggleAudioElementButton = document.getElementById('toggle-audio-element-button');
const $toggleBothButton = document.getElementById('toggle-both-button');
const $toggleWebAudioButton = document.getElementById('toggle-web-audio-button');

let isPlaying = false;
let mediaStreamAudioSourceNode = null;

const stop = () => {
    $audio.pause();
    $audio.currentTime = 0;
    $audio.muted = false;

    if (mediaStreamAudioSourceNode !== null) {
        mediaStreamAudioSourceNode.disconnect();
        mediaStreamAudioSourceNode = null;
    }
}

$toggleAudioElementButton.addEventListener('click', () => {
    stop();

    isPlaying = !isPlaying;

    $toggleBothButton.disabled = isPlaying;
    $toggleWebAudioButton.disabled = isPlaying;

    if (isPlaying) {
        $audio.play();
    }
});

$toggleBothButton.addEventListener('click', () => {
    stop();

    isPlaying = !isPlaying;

    $toggleAudioElementButton.disabled = isPlaying;
    $toggleWebAudioButton.disabled = isPlaying;

    if (isPlaying) {
        audioContext.resume();

        $audio.play();

        mediaStreamAudioSourceNode = new MediaStreamAudioSourceNode(
            audioContext,
            { mediaStream: $audio.captureStream() }
        );

        mediaStreamAudioSourceNode.connect(audioContext.destination);
    }
});

$toggleWebAudioButton.addEventListener('click', () => {
    stop();

    isPlaying = !isPlaying;

    $toggleAudioElementButton.disabled = isPlaying;
    $toggleBothButton.disabled = isPlaying;

    if (isPlaying) {
        audioContext.resume();

        $audio.muted = true;
        $audio.play();

        mediaStreamAudioSourceNode = new MediaStreamAudioSourceNode(
            audioContext,
            { mediaStream: $audio.captureStream() }
        );

        mediaStreamAudioSourceNode.connect(audioContext.destination);
    }
});
